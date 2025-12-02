"""
Batch runner for full OCR on multiple PDFs, using ocr_extract.py per chunk.

Usage:
  python scripts/ocr_run_all.py --batch-pages 8 --dpi 100 --out data/ocr_output

Notes:
  - Relies on scripts/ocr_extract.py (already in repo) which accepts start-page/max-pages.
  - Runs CPU easyocr; runtime may be long on large PDFs.
  - Produces summary_all.json and combined.txt under --out.
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path
import time

DEFAULT_FILES = [
    r"C:\Users\wjh19\Desktop\试题.pdf",
    r"C:\Users\wjh19\Desktop\答案解析.pdf",
    r"C:\Users\wjh19\Desktop\2026肖八\26肖秀荣《8套卷》.pdf",
    r"C:\Users\wjh19\Desktop\2026肖八\26肖秀荣《8套卷》答案解析.pdf",
]


def run_chunk(pdf, start, batch, dpi, out):
    cmd = [
        sys.executable,
        "scripts/ocr_extract.py",
        "--files",
        pdf,
        "--start-page",
        str(start),
        "--max-pages",
        str(batch),
        "--dpi",
        str(dpi),
        "--out",
        str(out),
    ]
    t0 = time.time()
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=600)
        return {"status": "ok", "seconds": round(time.time() - t0, 2)}
    except subprocess.CalledProcessError as e:
        return {"status": "error", "code": e.returncode, "stderr": e.stderr.decode(errors="ignore")}
    except subprocess.TimeoutExpired:
        return {"status": "timeout", "seconds": 600}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--files", nargs="*", help="PDF list; default uses desktop paths")
    ap.add_argument("--batch-pages", type=int, default=8)
    ap.add_argument("--dpi", type=int, default=100)
    ap.add_argument("--out", default="data/ocr_output")
    args = ap.parse_args()

    files = args.files or DEFAULT_FILES
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)
    summary_all = []

    import fitz

    for pdf in files:
        p = Path(pdf)
        if not p.exists():
            summary_all.append({"file": pdf, "status": "missing"})
            continue
        pages = len(fitz.open(pdf))
        file_sum = {"file": pdf, "pages": pages, "batch": args.batch_pages, "dpi": args.dpi, "chunks": []}
        for start in range(0, pages, args.batch_pages):
            res = run_chunk(pdf, start, args.batch_pages, args.dpi, out_dir)
            res["start_page"] = start
            file_sum["chunks"].append(res)
        summary_all.append(file_sum)

    # merge combined.txt
    raw_dir = out_dir / "raw"
    combined = []
    if raw_dir.exists():
        for txt in raw_dir.glob("*.txt"):
            combined.append(txt.read_text(encoding="utf-8"))
        (out_dir / "combined.txt").write_text("\n".join(combined), encoding="utf-8")

    (out_dir / "summary_all.json").write_text(json.dumps(summary_all, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Done. summary_all.json generated.")


if __name__ == "__main__":
    main()
