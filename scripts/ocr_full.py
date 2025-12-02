"""
Single-process OCR runner (faster than chunked subprocess because it loads easyocr model once).

Usage:
  python scripts/ocr_full.py --file "C:\\Users\\wjh19\\Desktop\\试题.pdf" --out data/ocr_output --dpi 100 --max-pages 0

Params:
  --file        PDF path
  --out         output dir (default data/ocr_output)
  --dpi         render dpi (default 100，越高越清晰但越慢)
  --start       start page index (0-based, default 0)
  --max-pages   max pages to process (0=all to end)

Output:
  raw/<stem>.txt       OCR text
  combined.txt         merged (append existing raw files)
  summary_full.json    append/run log
"""

import argparse
import json
import time
from pathlib import Path

import fitz  # pymupdf
import easyocr


def ocr_file(pdf_path: Path, reader, dpi: int, start: int = 0, max_pages: int = 0) -> str:
    doc = fitz.open(pdf_path)
    total = len(doc)
    s = max(start, 0)
    e = total if not max_pages or max_pages <= 0 else min(total, s + max_pages)
    texts = []
    for i in range(s, e):
        page = doc.load_page(i)
        pix = page.get_pixmap(dpi=dpi)
        res = reader.readtext(pix.tobytes("png"), detail=0)
        texts.append("\n".join(res))
    return "\n".join(texts), total, e - s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", required=True)
    ap.add_argument("--out", default="data/ocr_output")
    ap.add_argument("--dpi", type=int, default=100)
    ap.add_argument("--start", type=int, default=0)
    ap.add_argument("--max-pages", type=int, default=0)
    args = ap.parse_args()

    pdf = Path(args.file)
    if not pdf.exists():
        print("missing", pdf)
        return

    out_dir = Path(args.out)
    raw_dir = out_dir / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)

    reader = easyocr.Reader(["ch_sim", "en"], gpu=False, verbose=False)

    t0 = time.time()
    text, total_pages, used = ocr_file(pdf, reader, dpi=args.dpi, start=args.start, max_pages=args.max_pages)
    raw_path = raw_dir / (pdf.stem + ".txt")
    raw_path.write_text(text, encoding="utf-8")

    # merge combined
    combined = "\n".join(p.read_text(encoding="utf-8") for p in raw_dir.glob("*.txt"))
    (out_dir / "combined.txt").write_text(combined, encoding="utf-8")

    summary_path = out_dir / "summary_full.json"
    run_log = []
    if summary_path.exists():
        try:
            run_log = json.loads(summary_path.read_text(encoding="utf-8"))
        except Exception:
            run_log = []
    run_log.append(
        {
            "file": str(pdf),
            "pages_total": total_pages,
            "pages_used": used,
            "dpi": args.dpi,
            "start": args.start,
            "seconds": round(time.time() - t0, 2),
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        }
    )
    summary_path.write_text(json.dumps(run_log, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Done {pdf.name}: {used}/{total_pages} pages, {round(time.time()-t0,2)}s")


if __name__ == "__main__":
    main()
