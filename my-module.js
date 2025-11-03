/**
 * Merges discontinuous time ranges within a given threshold.
 *
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */
const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges)) {
    throw new TypeError('ranges must be an array of [start, end] pairs')
  }

  const t = Number(threshold) || 0
  if (Number.isNaN(t) || t < 0) {
    throw new TypeError('threshold must be a non-negative number')
  }

  // Normalize and filter invalid/empty ranges
  const cleaned = ranges
    .map(r => {
      if (!Array.isArray(r) || r.length < 2) return null
      const s = Number(r[0])
      const e = Number(r[1])
      if (!Number.isFinite(s) || !Number.isFinite(e)) return null
      return [s, e]
    })
    .filter(Boolean)
    // remove empty ranges where start >= end (since ranges are [start, end) )
    .filter(([s, e]) => s < e)

  if (cleaned.length === 0) return []

  // Sort by start ascending, then by end ascending
  cleaned.sort((a, b) => a[0] - b[0] || a[1] - b[1])

  const result = []
  let [curS, curE] = cleaned[0]

  for (let i = 1; i < cleaned.length; i++) {
    const [s, e] = cleaned[i]

    if (s <= curE) {
      // overlapping or touching (touching when s === curE) — merge
      if (e > curE) curE = e
      continue
    }

    const gap = s - curE
    if (gap <= t) {
      // Gap small enough to merge
      if (e > curE) curE = e
      continue
    }

    // gap too big -> push current and move to next
    result.push([curS, curE])
    curS = s
    curE = e
  }

  result.push([curS, curE])
  return result
}

module.exports = {
  mergeTimeRanges
}
