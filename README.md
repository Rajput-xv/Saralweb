# Merge Discontinuous Time Ranges (Node.js)

A tiny CommonJS module that merges time ranges while treating small gaps as continuous.

- Input: array of `[start, end]` time ranges (UNIX ms). Ranges may be unsorted, overlapping, or touching.
- Rule: gaps `<= threshold` (ms) are merged as if continuous.
- Output: sorted, non-overlapping `[start, end)` ranges (end is excluded).

## Quick start

Run the examples/tests:

```powershell
node test.js
```

## Project structure

- `my-module.js` – implementation (exports `mergeTimeRanges`).
- `test.js` – simple tests / examples.
- `package.json` – CommonJS module config and test script.

## License

MIT
