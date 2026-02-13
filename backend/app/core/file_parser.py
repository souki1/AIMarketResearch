"""Parse Excel and CSV files into rows and columns."""
import csv
import io
from pathlib import Path

import openpyxl


def parse_file_to_rows(path: Path, filename: str) -> list[list[str]]:
    """
    Parse Excel or CSV file into list of rows (each row is list of cell values).
    Returns empty list for non-spreadsheet files.
    """
    ext = Path(filename).suffix.lower()
    if ext == ".csv":
        return _parse_csv(path)
    if ext == ".xlsx":
        return _parse_excel(path)
    return []


def _parse_csv(path: Path) -> list[list[str]]:
    rows = []
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        reader = csv.reader(f)
        for row in reader:
            rows.append([str(c) for c in row])
    return rows


def _parse_excel(path: Path) -> list[list[str]]:
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    ws = wb.active
    if not ws:
        return []
    rows = []
    for row in ws.iter_rows(values_only=True):
        rows.append([str(c) if c is not None else "" for c in row])
    wb.close()
    return rows
