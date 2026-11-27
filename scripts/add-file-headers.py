from pathlib import Path
import subprocess
import re

AUTHOR = "Pascal Thomasse Mol"
SRC_DIR = Path("src")
EXTENSIONS = {".ts", ".tsx"}

updated = 0
skipped = 0
no_history = 0


def get_creation_date(file_path):
    result = subprocess.run(
        [
            "git",
            "log",
            "--follow",
            "--format=%as",
            "--",
            str(file_path),
        ],
        capture_output=True,
        text=True,
        check=True,
    )

    dates = result.stdout.strip().splitlines()

    return dates[-1] if dates else None


for file_path in sorted(SRC_DIR.rglob("*")):
    if not file_path.is_file():
        continue

    if file_path.suffix not in EXTENSIONS:
        continue

    content = file_path.read_text(encoding="utf-8")

    if re.match(r"\s*/\*\*[\s\S]*?@file\b", content):
        print(f"SKIPPED: {file_path}")
        skipped += 1
        continue

    creation_date = get_creation_date(file_path)

    if not creation_date:
        print(f"NO GIT HISTORY: {file_path}")
        no_history += 1
        continue

    header = (
        "/**\n"
        f" * @file {file_path.name}\n"
        f" * @author {AUTHOR}\n"
        f" * @since {creation_date}\n"
        " */\n\n"
    )

    file_path.write_text(header + content, encoding="utf-8")

    print(f"UPDATED: {file_path} ({creation_date})")
    updated += 1


print("\n--- Summary ---")
print(f"Updated:        {updated}")
print(f"Skipped:        {skipped}")
print(f"No Git history: {no_history}")