"""
Batch OCR for scanned exam PDFs.

Usage:
    python scripts/ocr_extract.py --out data/ocr_output --dpi 180 --max-pages 0

Notes:
    - Requires: easyocr, pymupdf, pdf2image, torch (already installed in this env).
    - Add PDF paths below or pass via --files.
    - Set --max-pages to limit pages per file (0 = all).
    - Output:
        out_dir/raw/<name>.txt      : plain OCR text per file
        out_dir/combined.txt        : concatenated corpus
        out_dir/summary.json        : page counts, time cost
"""

import argparse
import json
import time
from pathlib import Path

import fitz  # pymupdf
import easyocr


def ocr_pdf(path: Path, reader, dpi: int = 180, max_pages: int = 0, start: int = 0) -> str:
    doc = fitz.open(path)
    n = len(doc)
    start_idx = max(start, 0)
    end_idx = n if not max_pages or max_pages <= 0 else min(n, start_idx + max_pages)
    n = max(0, end_idx - start_idx)
    texts = []
    for i in range(start_idx, start_idx + n):
        page = doc.load_page(i)
        pix = page.get_pixmap(dpi=dpi)
        text_chunks = reader.readtext(pix.tobytes("png"), detail=0)
        texts.append("\n".join(text_chunks))
    return "\n".join(texts)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--files", nargs="*", help="PDF files to OCR")
    parser.add_argument("--out", default="data/ocr_output", help="output directory")
    parser.add_argument("--dpi", type=int, default=180, help="render DPI")
    parser.add_argument("--max-pages", type=int, default=0, help="limit pages per file (0=all)")
    parser.add_argument("--start-page", type=int, default=0, help="start page index (0-based)")
    args = parser.parse_args()

    default_files = [
        r"C:\Users\wjh19\Desktop\试题.pdf",
        r"C:\Users\wjh19\Desktop\答案解析.pdf",
        r"C:\Users\wjh19\Desktop\2026肖八\26肖秀荣《8套卷》.pdf",
        r"C:\Users\wjh19\Desktop\2026肖八\26肖秀荣《8套卷》答案解析.pdf",
    ]
    files = [Path(f) for f in (args.files or default_files)]

    out_dir = Path(args.out)
    raw_dir = out_dir / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    summary = []

    reader = easyocr.Reader(["ch_sim", "en"], gpu=False, verbose=False)

    for f in files:
        if not f.exists():
            summary.append({"file": str(f), "status": "missing"})
            continue
        t0 = time.time()
        try:
            text = ocr_pdf(f, reader, dpi=args.dpi, max_pages=args.max_pages, start=args.start_page)
            (raw_dir / (f.stem + ".txt")).write_text(text, encoding="utf-8")
            summary.append(
                {
                    "file": str(f),
                    "pages": len(fitz.open(f)),
                    "used_pages": len(text.splitlines()),
                    "seconds": round(time.time() - t0, 2),
                    "status": "ok",
                }
            )
        except Exception as e:
            summary.append({"file": str(f), "error": str(e)})

    # combined corpus
    combined = []
    for txt in raw_dir.glob("*.txt"):
        combined.append(txt.read_text(encoding="utf-8"))
    (out_dir / "combined.txt").write_text("\n".join(combined), encoding="utf-8")
    (out_dir / "summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")

    print("Done. Summary ->", out_dir / "summary.json")


if __name__ == "__main__":
    main()
