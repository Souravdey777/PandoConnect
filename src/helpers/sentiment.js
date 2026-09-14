/**
 * Resolve an optional sentiment signal on a blog into a display badge.
 *
 * The product roadmap adds an ML sentiment score per post. This helper reads
 * whatever the document happens to carry and maps it to the gentle sentiment
 * scale from DESIGN_REVAMP_PLAN.md §3.1. It returns `null` when the post has
 * no sentiment data, so the UI never shows a fabricated score.
 *
 * Accepted shapes (any one):
 *   link.sentimentLabel: "very positive" | "positive" | "neutral" | "mixed"
 *   link.sentiment:      string label (as above) OR number
 *   link.sentimentScore: number
 *
 * Numeric scores are normalized whether they are in 0..1 or -1..1.
 */
export function resolveSentiment(link) {
  if (!link) return null;

  const rawLabel =
    typeof link.sentimentLabel === "string"
      ? link.sentimentLabel
      : typeof link.sentiment === "string"
      ? link.sentiment
      : null;

  if (rawLabel) return labelToBadge(rawLabel);

  const rawScore =
    typeof link.sentimentScore === "number"
      ? link.sentimentScore
      : typeof link.sentiment === "number"
      ? link.sentiment
      : null;

  if (rawScore === null || Number.isNaN(rawScore)) return null;

  // Normalize -1..1 into 0..1; leave an already-0..1 value alone.
  const score = rawScore < 0 ? (rawScore + 1) / 2 : rawScore > 1 ? 1 : rawScore;

  if (score >= 0.75) return badge("is-very-positive", "Very positive");
  if (score >= 0.5) return badge("is-positive", "Positive");
  if (score >= 0.3) return badge("is-neutral", "Neutral");
  return badge("is-mixed", "Mixed");
}

function labelToBadge(label) {
  const key = label.trim().toLowerCase();
  switch (key) {
    case "very positive":
    case "very-positive":
      return badge("is-very-positive", "Very positive");
    case "positive":
      return badge("is-positive", "Positive");
    case "neutral":
      return badge("is-neutral", "Neutral");
    case "mixed":
    case "negative":
      return badge("is-mixed", "Mixed");
    default:
      return badge("is-positive", capitalize(label));
  }
}

function badge(cls, displayLabel) {
  return { cls, label: displayLabel };
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
