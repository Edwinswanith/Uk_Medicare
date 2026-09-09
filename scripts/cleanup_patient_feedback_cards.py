from __future__ import annotations

import csv
import hashlib
import json
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path
from shutil import copyfile
from typing import Any

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ARCHIVE = Path(r"C:\Users\bizzz\Downloads\Patient feedback")
RAW_MANIFEST = ROOT / "artifacts/patient-feedback-raw-manifest.json"
GENERATED_CARDS = ROOT / "src/data/patientFeedbackCards.generated.json"
CLEAN_JSON = ROOT / "src/data/patientFeedbackCards.cleaned.generated.json"
PUBLIC_SOURCE_DIR = ROOT / "public/patient-feedback"
PUBLIC_CLEAN_DIR = ROOT / "public/patient-feedback-clean"
DOCS_DIR = ROOT / "docs"
ARTIFACT_DIR = ROOT / "artifacts/feedback-card-cleanup"
BEFORE_DIR = ARTIFACT_DIR / "before"
AFTER_DIR = ARTIFACT_DIR / "after"

TODAY = date.today().isoformat()

# Rotation values describe the action needed to make the display derivative upright.
ROTATE_COUNTERCLOCKWISE = {13, 15, 16, 17, 22, 74}
ROTATE_CLOCKWISE = {117, 119, 121}
ROTATE_180: set[int] = set()

COVER_OR_DESIGN = {
    1, 4, 12, 14, 18, 23, 25, 26, 27, 33, 35, 38, 39, 41,
    75, 77, 78, 81, 85, 87, 89, 91, 93, 94, 97, 99,
    102, 104, 106, 115, 118, 120, 122, 123, 129, 130, 133,
    136, 137, 139, 141, 143,
}

NON_CONTENT = {124, 128, 131}

MANUAL_REVIEW = {
    100: (
        "Mixed source label: NHS staff and patient",
        "Confirm whether this is patient feedback or staff recognition before publishing.",
    ),
    116: (
        "Very faint / unclear content",
        "Review original scan to confirm whether it contains a meaningful patient message.",
    ),
}

DUPLICATE_OF = {
    10: (1, "Exact duplicate decorative cover"),
    11: (2, "Visual duplicate of retained message page"),
    16: (8, "Visual duplicate of retained message page"),
    17: (9, "Visual duplicate of retained message page"),
    21: (20, "Exact duplicate scan"),
    24: (2, "Visual duplicate of retained message page"),
    82: (9, "Visual duplicate of retained message page"),
    83: (8, "Visual duplicate of retained message page"),
    88: (36, "Visual duplicate of retained message page"),
    90: (40, "Visual duplicate of retained message page"),
    96: (42, "Visual duplicate of retained message page"),
    101: (22, "Visual duplicate of retained message page"),
    103: (13, "Visual duplicate of retained normalised message page"),
    151: (148, "Exact duplicate page exported from alternate source PDF"),
    152: (149, "Exact duplicate page exported from alternate source PDF"),
    153: (150, "Near-identical duplicate page exported from alternate source PDF"),
}

PAIR_IDS = {
    1: "feedback-001", 2: "feedback-001",
    3: "feedback-003", 4: "feedback-003",
    5: "feedback-005",
    6: "feedback-006", 7: "feedback-006",
    8: "feedback-008", 9: "feedback-008",
    10: "feedback-001-duplicate", 11: "feedback-001-duplicate",
    12: "feedback-013", 13: "feedback-013",
    14: "feedback-015", 15: "feedback-015",
    16: "feedback-016", 17: "feedback-016",
    18: "feedback-019", 19: "feedback-019",
    20: "feedback-020", 21: "feedback-020-duplicate",
    22: "feedback-022", 23: "feedback-022",
    24: "feedback-001-duplicate-2", 25: "feedback-001-duplicate-2",
    26: "feedback-026", 27: "feedback-026",
    31: "feedback-031", 32: "feedback-032",
    33: "feedback-034", 34: "feedback-034",
    35: "feedback-036", 36: "feedback-036",
    37: "feedback-037", 38: "feedback-037",
    39: "feedback-040", 40: "feedback-040",
    41: "feedback-042", 42: "feedback-042",
    43: "feedback-043", 44: "feedback-043",
    74: "feedback-074", 75: "feedback-074",
    76: "feedback-076", 77: "feedback-076",
    78: "feedback-079", 79: "feedback-079",
    80: "feedback-080", 81: "feedback-080",
    82: "feedback-008-duplicate", 83: "feedback-008-duplicate",
    84: "feedback-084", 85: "feedback-084",
    86: "feedback-086", 87: "feedback-086",
    88: "feedback-036-duplicate", 89: "feedback-036-duplicate",
    90: "feedback-040-duplicate", 91: "feedback-040-duplicate",
    92: "feedback-092", 93: "feedback-092",
    94: "feedback-095", 95: "feedback-095",
    96: "feedback-042-duplicate", 97: "feedback-042-duplicate",
    98: "feedback-098", 99: "feedback-098",
    100: "feedback-100-review",
    101: "feedback-101", 102: "feedback-101",
    103: "feedback-013-duplicate", 104: "feedback-013-duplicate",
    105: "feedback-105", 106: "feedback-105",
    114: "feedback-114",
    115: "feedback-116-review", 116: "feedback-116-review",
    117: "feedback-117", 118: "feedback-117",
    119: "feedback-119", 120: "feedback-119",
    121: "feedback-121", 122: "feedback-121",
    123: "feedback-123", 124: "feedback-123",
    125: "feedback-125", 126: "feedback-125",
    127: "feedback-127",
    128: "feedback-128", 129: "feedback-128",
    130: "feedback-130", 131: "feedback-130",
    132: "feedback-132", 133: "feedback-132",
    134: "feedback-134",
    135: "feedback-135", 136: "feedback-135",
    137: "feedback-138", 138: "feedback-138",
    139: "feedback-140", 140: "feedback-140",
    141: "feedback-142", 142: "feedback-142",
    143: "feedback-144", 144: "feedback-144",
    148: "feedback-148", 149: "feedback-148", 150: "feedback-148",
    151: "feedback-148-duplicate", 152: "feedback-148-duplicate", 153: "feedback-148-duplicate",
}

CONTINUATION_PAGES = {7, 9, 17, 44, 126, 149, 150}


def load_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def public_url_to_path(url: str) -> Path:
    return ROOT / "public" / url.lstrip("/")


def source_archive_extension_counts() -> dict[str, int]:
    if not SOURCE_ARCHIVE.exists():
        return {}
    counts = Counter(p.suffix.lower() or "(none)" for p in SOURCE_ARCHIVE.rglob("*") if p.is_file())
    return dict(sorted(counts.items()))


def rotation_for(seq: int) -> tuple[str, str]:
    if seq in ROTATE_COUNTERCLOCKWISE:
        return "rotate-90-counterclockwise", "rotate-90-counterclockwise"
    if seq in ROTATE_CLOCKWISE:
        return "rotate-90-clockwise", "rotate-90-clockwise"
    if seq in ROTATE_180:
        return "rotate-180", "rotate-180"
    return "upright", "none"


def apply_rotation(image: Image.Image, rotation_required: str) -> Image.Image:
    if rotation_required == "rotate-90-counterclockwise":
        return image.rotate(90, expand=True)
    if rotation_required == "rotate-90-clockwise":
        return image.rotate(-90, expand=True)
    if rotation_required == "rotate-180":
        return image.rotate(180, expand=True)
    return image.copy()


def initial_page_row(card: dict[str, Any], raw: dict[str, Any]) -> dict[str, Any]:
    seq = int(card["sequence"])
    orientation, rotation_required = rotation_for(seq)
    original_asset = card["image"]

    row = {
        "source_file": raw.get("source", original_asset),
        "source_index": seq,
        "source_group": card["category"],
        "pair_id": PAIR_IDS.get(seq, f"feedback-{seq:03d}"),
        "page_number": raw.get("pageIndex", 1),
        "page_role": "message",
        "orientation": orientation,
        "rotation_required": rotation_required,
        "content_type": "patient feedback message",
        "testimonial_type": "patient",
        "staff_recognition": "no",
        "duplicate_group": "",
        "public_candidate": "yes",
        "publication_status": "pending",
        "consent_status": "pending",
        "exclusion_reason": "",
        "original_asset": original_asset,
        "normalised_asset": f"/patient-feedback-clean/feedback-card-{seq:03d}.jpg",
        "notes": "Candidate only; dated publication consent has not been confirmed.",
    }

    category = card["category"]
    if category == "Staff recognition feedback":
        row.update(
            page_role="staff-recognition",
            content_type="staff recognition feedback",
            testimonial_type="staff-recognition",
            staff_recognition="yes",
            public_candidate="no",
            normalised_asset="",
            exclusion_reason="Staff recognition feedback excluded from patient testimonials",
            notes="Retained in source archive for possible future staff recognition use.",
        )
        return row

    if category == "Colleague and trainee feedback":
        row.update(
            page_role="staff-recognition",
            content_type="colleague or trainee feedback",
            testimonial_type="colleague-trainee",
            public_candidate="no",
            normalised_asset="",
            exclusion_reason="Colleague/trainee feedback excluded from patient testimonials",
            notes="Non-patient recognition content retained in the source archive.",
        )
        return row

    if seq in DUPLICATE_OF:
        keep_seq, note = DUPLICATE_OF[seq]
        row.update(
            page_role="duplicate",
            content_type="duplicate scan",
            duplicate_group=f"duplicate-of-feedback-card-{keep_seq:03d}",
            public_candidate="no",
            normalised_asset="",
            exclusion_reason="Duplicate scan",
            notes=note,
        )
        return row

    if seq in COVER_OR_DESIGN:
        row.update(
            page_role="cover",
            content_type="decorative/front page",
            public_candidate="no",
            normalised_asset="",
            exclusion_reason="Decorative/front page of multi-page feedback card",
            notes="Physical card context preserved in manifest; message page is used where present.",
        )
        return row

    if seq in NON_CONTENT:
        row.update(
            page_role="blank",
            content_type="blank/non-content page",
            public_candidate="no",
            normalised_asset="",
            exclusion_reason="Blank or non-content page excluded from patient testimonials",
            notes="No meaningful patient testimonial content visible in the rendered page.",
        )
        return row

    if seq in MANUAL_REVIEW:
        issue, recommendation = MANUAL_REVIEW[seq]
        row.update(
            page_role="unknown",
            content_type="manual review required",
            public_candidate="review",
            normalised_asset="",
            exclusion_reason="Manual review required before public display",
            notes=f"{issue}. {recommendation}",
        )
        return row

    if seq in CONTINUATION_PAGES:
        row["page_role"] = "continuation"
        row["content_type"] = "patient feedback continuation"

    return row


def write_manifest(rows: list[dict[str, Any]]) -> None:
    manifest_path = DOCS_DIR / "patient-feedback-card-manifest.csv"
    fields = [
        "source_file",
        "source_index",
        "source_group",
        "pair_id",
        "page_number",
        "page_role",
        "orientation",
        "rotation_required",
        "content_type",
        "testimonial_type",
        "staff_recognition",
        "duplicate_group",
        "public_candidate",
        "publication_status",
        "consent_status",
        "exclusion_reason",
        "original_asset",
        "normalised_asset",
        "notes",
    ]
    DOCS_DIR.mkdir(exist_ok=True)
    with manifest_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def write_manual_review(rows: list[dict[str, Any]]) -> None:
    review_path = DOCS_DIR / "patient-feedback-manual-review.csv"
    fields = ["source_file", "possible_pair", "issue", "recommended_review", "notes"]
    with review_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for row in rows:
            if row["public_candidate"] != "review":
                continue
            issue, recommendation = MANUAL_REVIEW[int(row["source_index"])]
            writer.writerow(
                {
                    "source_file": row["source_file"],
                    "possible_pair": row["pair_id"],
                    "issue": issue,
                    "recommended_review": recommendation,
                    "notes": row["notes"],
                }
            )


def generate_clean_assets(rows: list[dict[str, Any]]) -> None:
    PUBLIC_CLEAN_DIR.mkdir(parents=True, exist_ok=True)
    for stale in PUBLIC_CLEAN_DIR.glob("feedback-card-*.jpg"):
        stale.unlink()
    for row in rows:
        if row["public_candidate"] != "yes":
            continue
        src = public_url_to_path(row["original_asset"])
        dest = public_url_to_path(row["normalised_asset"])
        with Image.open(src) as image:
            normalised = apply_rotation(image.convert("RGB"), row["rotation_required"])
            normalised.save(dest, quality=92, optimize=True)


def testimonial_groups(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for row in rows:
        if row["public_candidate"] == "yes":
            grouped[row["pair_id"]].append(row)

    testimonials: list[dict[str, Any]] = []
    for pair_id in sorted(grouped, key=lambda value: min(int(r["source_index"]) for r in grouped[value])):
        pages = sorted(grouped[pair_id], key=lambda value: int(value["source_index"]))
        categories = list(dict.fromkeys(page["source_group"] for page in pages))
        testimonials.append(
            {
                "id": pair_id,
                "type": "patient",
                "source": "source-feedback-card",
                "category": categories[0],
                "sourceFiles": list(dict.fromkeys(page["source_file"] for page in pages)),
                "publicationStatus": "pending",
                "consentStatus": "pending",
                "publicCandidate": True,
                "pages": [
                    {
                        "id": page["original_asset"].split("/")[-1].replace(".jpg", ""),
                        "src": page["normalised_asset"],
                        "sourceSrc": page["original_asset"],
                        "sourceFile": page["source_file"],
                        "pageRole": page["page_role"],
                        "orientation": "upright",
                        "originalOrientation": page["orientation"],
                        "pageLabel": f"{index + 1} of {len(pages)}",
                    }
                    for index, page in enumerate(pages)
                ],
            }
        )
    return testimonials


def write_clean_json(rows: list[dict[str, Any]], testimonials: list[dict[str, Any]], summary: dict[str, Any]) -> None:
    payload = {
        "generatedAt": TODAY,
        "sourceArchive": str(SOURCE_ARCHIVE),
        "summary": summary,
        "sourcePages": rows,
        "testimonials": testimonials,
    }
    CLEAN_JSON.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def contact_sheet(items: list[dict[str, Any]], out_dir: Path, prefix: str, use_normalised: bool) -> list[str]:
    out_dir.mkdir(parents=True, exist_ok=True)
    for stale in out_dir.glob(f"{prefix}-*.jpg"):
        stale.unlink()
    output_paths: list[str] = []
    cols, rows = 3, 4
    thumb_w, thumb_h = 360, 260
    pad, label_h = 14, 40
    try:
        font = ImageFont.truetype("arial.ttf", 18)
        small = ImageFont.truetype("arial.ttf", 13)
    except OSError:
        font = ImageFont.load_default()
        small = font

    for start in range(0, len(items), cols * rows):
        batch = items[start:start + cols * rows]
        sheet = Image.new("RGB", (cols * (thumb_w + pad) + pad, rows * (thumb_h + label_h + pad) + pad), "white")
        draw = ImageDraw.Draw(sheet)
        for index, item in enumerate(batch):
            src_value = item["normalised_asset"] if use_normalised else item["original_asset"]
            source_path = public_url_to_path(src_value)
            with Image.open(source_path) as image:
                preview = image.convert("RGB")
                preview.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)

            x = pad + (index % cols) * (thumb_w + pad)
            y = pad + (index // cols) * (thumb_h + label_h + pad)
            draw.rectangle([x, y, x + thumb_w, y + label_h + thumb_h], outline=(202, 213, 225), width=1)
            draw.text((x + 8, y + 5), f"card {int(item['source_index']):03d} | {item['page_role']}", fill=(8, 52, 76), font=font)
            draw.text((x + 8, y + 25), item["pair_id"], fill=(71, 85, 105), font=small)
            ix = x + (thumb_w - preview.width) // 2
            iy = y + label_h + (thumb_h - preview.height) // 2
            sheet.paste(preview, (ix, iy))

        first = int(batch[0]["source_index"])
        last = int(batch[-1]["source_index"])
        out_path = out_dir / f"{prefix}-{first:03d}-{last:03d}.jpg"
        sheet.save(out_path, quality=92)
        output_paths.append(str(out_path.relative_to(ROOT)))
    return output_paths


def copy_example_assets(rows: list[dict[str, Any]]) -> dict[str, list[str]]:
    examples = {
        "sideways_before_after": [13, 117],
        "cover_message": [1, 2],
        "message_continuation": [125, 126],
        "staff_absent_source": [45],
        "duplicate_group": [148, 151],
    }
    copied: dict[str, list[str]] = {}
    for key, seqs in examples.items():
        copied[key] = []
        for seq in seqs:
            row = next(item for item in rows if int(item["source_index"]) == seq)
            original = public_url_to_path(row["original_asset"])
            before_dest = BEFORE_DIR / f"{key}-feedback-card-{seq:03d}.jpg"
            before_dest.parent.mkdir(parents=True, exist_ok=True)
            copyfile(original, before_dest)
            copied[key].append(str(before_dest.relative_to(ROOT)))
            if row["normalised_asset"]:
                after_dest = public_url_to_path(row["normalised_asset"])
                copied[key].append(str(after_dest.relative_to(ROOT)))
    return copied


def build_summary(rows: list[dict[str, Any]], testimonials: list[dict[str, Any]]) -> dict[str, Any]:
    source_counts = source_archive_extension_counts()
    candidate_pages = [row for row in rows if row["public_candidate"] == "yes"]
    excluded_rows = [row for row in rows if row["public_candidate"] == "no"]
    duplicate_rows = [row for row in rows if row["page_role"] == "duplicate"]
    cover_rows = [row for row in rows if row["page_role"] == "cover"]
    non_content_rows = [row for row in rows if row["page_role"] == "blank"]
    manual_review_rows = [row for row in rows if row["public_candidate"] == "review"]
    staff_rows = [row for row in rows if row["staff_recognition"] == "yes"]
    colleague_rows = [row for row in rows if row["testimonial_type"] == "colleague-trainee"]
    multi_page_groups = [item for item in testimonials if len(item["pages"]) > 1]
    rotation_counts = Counter(row["rotation_required"] for row in candidate_pages)

    return {
        "generatedAt": TODAY,
        "sourceArchive": str(SOURCE_ARCHIVE),
        "sourceArchiveFiles": sum(source_counts.values()),
        "sourceArchiveExtensionCounts": source_counts,
        "sourcePageCount": len(rows),
        "originalPublicImageCount": len(list(PUBLIC_SOURCE_DIR.glob("feedback-card-*.jpg"))),
        "candidatePageCount": len(candidate_pages),
        "finalTestimonialGroupCount": len(testimonials),
        "finalPublicCandidateCount": len(testimonials),
        "renderablePublicTestimonials": 0,
        "consentApprovedPublicTestimonials": 0,
        "pendingTestimonials": len(testimonials),
        "singlePageTestimonialGroups": len([item for item in testimonials if len(item["pages"]) == 1]),
        "multiPageTestimonialGroups": len(multi_page_groups),
        "staffRecognitionPagesFound": len(staff_rows),
        "staffRecognitionPagesExcluded": len(staff_rows),
        "colleagueTraineePagesExcluded": len(colleague_rows),
        "decorativeCoverPagesExcluded": len(cover_rows),
        "trueDuplicatePagesFound": len(duplicate_rows),
        "duplicatePagesExcluded": len(duplicate_rows),
        "blankNonContentPagesExcluded": len(non_content_rows),
        "manualReviewItems": len(manual_review_rows),
        "totalExcludedFromPublicDisplay": len(excluded_rows),
        "orientationIssuesFound": len([row for row in candidate_pages if row["rotation_required"] != "none"]),
        "cardsRotated90Clockwise": rotation_counts["rotate-90-clockwise"],
        "cardsRotated90Counterclockwise": rotation_counts["rotate-90-counterclockwise"],
        "cardsRotated180": rotation_counts["rotate-180"],
        "originalSourceHashesSample": {
            f"feedback-card-{seq:03d}.jpg": sha256(PUBLIC_SOURCE_DIR / f"feedback-card-{seq:03d}.jpg")
            for seq in [1, 2, 45, 148, 153]
        },
    }


def write_audit(summary: dict[str, Any], contact_sheets: list[str], examples: dict[str, list[str]]) -> None:
    audit = DOCS_DIR / "patient-feedback-card-audit.md"
    lines = [
        "# Patient Feedback Card Audit",
        "",
        f"Generated: {TODAY}",
        "",
        "## Scope",
        "",
        f"- Source archive inspected: `{SOURCE_ARCHIVE}`",
        f"- Rendered source pages in `public/patient-feedback`: {summary['sourcePageCount']}",
        f"- Source archive files counted: {summary['sourceArchiveFiles']} ({summary['sourceArchiveExtensionCounts']})",
        "- Original source files were not deleted, overwritten, or renamed.",
        "",
        "## Current Pipeline Finding",
        "",
        "- The existing app rendered `patientFeedbackCards.generated.json` as a flat page gallery.",
        "- The old data model had no pair, duplicate, orientation, consent, or publication-status metadata.",
        "- Cleaned derivatives now live in `public/patient-feedback-clean/`; originals remain in `public/patient-feedback/`.",
        "- `src/data/patientFeedbackCards.ts` is the selector boundary for public rendering.",
        "",
        "## Cleanup Summary",
        "",
        f"- Candidate pages retained for grouped testimonials: {summary['candidatePageCount']}",
        f"- Final testimonial groups: {summary['finalTestimonialGroupCount']}",
        f"- Single-page testimonial groups: {summary['singlePageTestimonialGroups']}",
        f"- Multi-page testimonial groups: {summary['multiPageTestimonialGroups']}",
        f"- Staff-recognition pages excluded: {summary['staffRecognitionPagesExcluded']}",
        f"- Colleague/trainee pages excluded: {summary['colleagueTraineePagesExcluded']}",
        f"- Decorative/front pages excluded: {summary['decorativeCoverPagesExcluded']}",
        f"- Duplicate pages excluded: {summary['duplicatePagesExcluded']}",
        f"- Blank/non-content pages excluded: {summary['blankNonContentPagesExcluded']}",
        f"- Manual-review items: {summary['manualReviewItems']}",
        "",
        "## Orientation Normalisation",
        "",
        f"- Candidate pages rotated 90 degrees clockwise: {summary['cardsRotated90Clockwise']}",
        f"- Candidate pages rotated 90 degrees counterclockwise: {summary['cardsRotated90Counterclockwise']}",
        f"- Candidate pages rotated 180 degrees: {summary['cardsRotated180']}",
        "",
        "## Consent And Publication Status",
        "",
        "- Asset cleanup does not establish dated consent.",
        f"- Consent-approved public testimonials recorded in this pass: {summary['consentApprovedPublicTestimonials']}",
        f"- Pending testimonial groups retained as candidates: {summary['pendingTestimonials']}",
        "- The strict `getPublicPatientTestimonials` selector remains blocked until publication status is `verified` after review.",
        "- The existing feedback-card gallery uses the cleaned normalised candidate list after explicit content-owner approval; audit status metadata is retained.",
        "",
        "## QA Artifacts",
        "",
        "- Manifest: `docs/patient-feedback-card-manifest.csv`",
        "- Manual review queue: `docs/patient-feedback-manual-review.csv`",
        "- Summary JSON: `artifacts/feedback-card-cleanup/manifest-summary.json`",
        "- Candidate contact sheets:",
        *[f"  - `{path}`" for path in contact_sheets],
        "- Before/after examples:",
        *[f"  - {key}: {', '.join(f'`{path}`' for path in paths)}" for key, paths in examples.items()],
        "",
        "## Remaining Ambiguity",
        "",
        "- `feedback-card-100`: mixed staff/patient source label; needs human confirmation.",
        "- `feedback-card-116`: content is too faint to classify confidently from the rendered page.",
        "",
    ]
    audit.write_text("\n".join(lines), encoding="utf-8")


def validate(rows: list[dict[str, Any]], testimonials: list[dict[str, Any]]) -> None:
    errors: list[str] = []
    included = [row for row in rows if row["public_candidate"] == "yes"]
    excluded = [row for row in rows if row["public_candidate"] == "no"]

    if len(rows) != 153:
        errors.append(f"Expected 153 source pages, found {len(rows)}.")
    if len(list(PUBLIC_SOURCE_DIR.glob("feedback-card-*.jpg"))) != 153:
        errors.append("Original public source image count is not 153.")
    if any(row["orientation"] == "unknown" for row in included):
        errors.append("An included page has unknown orientation.")
    if any(row["staff_recognition"] == "yes" for row in included):
        errors.append("A staff-recognition page entered public candidates.")
    if any(row["page_role"] in {"cover", "design", "duplicate", "blank", "unknown"} for row in included):
        errors.append("A cover/design/duplicate/blank/unknown page entered public candidates.")
    if any(not row["normalised_asset"] for row in included):
        errors.append("An included page is missing a normalised asset path.")
    if any(not public_url_to_path(row["normalised_asset"]).exists() for row in included):
        errors.append("An included page normalised asset does not exist.")
    if any(not row["exclusion_reason"] for row in excluded):
        errors.append("An excluded page is missing an exclusion reason.")

    seen_page_ids: set[str] = set()
    for testimonial in testimonials:
        for page in testimonial["pages"]:
            if page["id"] in seen_page_ids:
                errors.append(f"Page {page['id']} appears in more than one testimonial group.")
            seen_page_ids.add(page["id"])
    if len(seen_page_ids) != len(included):
        errors.append("Included page count and grouped page count do not match.")

    if errors:
        raise SystemExit("\n".join(errors))


def main() -> None:
    cards = load_json(GENERATED_CARDS)
    raw_manifest = {item["seq"]: item for item in load_json(RAW_MANIFEST)}
    rows = [initial_page_row(card, raw_manifest[int(card["sequence"])]) for card in cards]

    generate_clean_assets(rows)
    testimonials = testimonial_groups(rows)
    summary = build_summary(rows, testimonials)

    write_manifest(rows)
    write_manual_review(rows)
    write_clean_json(rows, testimonials, summary)
    validate(rows, testimonials)

    candidate_rows = [row for row in rows if row["public_candidate"] == "yes"]
    contact_sheets = contact_sheet(candidate_rows, AFTER_DIR, "candidate-contact-sheet", use_normalised=True)
    examples = copy_example_assets(rows)
    write_audit(summary, contact_sheets, examples)
    (ARTIFACT_DIR / "manifest-summary.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    (ARTIFACT_DIR / "report.md").write_text((DOCS_DIR / "patient-feedback-card-audit.md").read_text(encoding="utf-8"), encoding="utf-8")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
