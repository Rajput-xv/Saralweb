const { mergeTimeRanges } = require('./my-module.js')

const tests = [
  {
    name: 'Example 1',
    ranges: [
      [1000, 2000],
      [2500, 4000],
      [3900, 4100],
      [8000, 9000],
      [9050, 9500]
    ],
    threshold: 200,
    expected: [
      [1000, 2000],
      [2500, 4100],
      [8000, 9500]
    ]
  },
  {
    name: 'Example 2',
    ranges: [
      [0, 10],
      [15, 20],
      [25, 30]
    ],
    threshold: 4,
    expected: [
      [0, 10],
      [15, 20],
      [25, 30]
    ]
  },
  {
    name: 'Example 3',
    ranges: [
      [0, 10],
      [12, 15],
      [17, 25],
      [27, 35]
    ],
    threshold: 3,
    expected: [
      [0, 35]
    ]
  }
]

let allPassed = true

for (const t of tests) {
  const out = mergeTimeRanges(t.ranges, t.threshold)
  const ok = JSON.stringify(out) === JSON.stringify(t.expected)
  console.log(t.name + ':', ok ? 'PASS' : 'FAIL')
  console.log('  output:  ', JSON.stringify(out))
  console.log('  expected:', JSON.stringify(t.expected))
  if (!ok) allPassed = false
}

if (!allPassed) {
  process.exitCode = 1
}
