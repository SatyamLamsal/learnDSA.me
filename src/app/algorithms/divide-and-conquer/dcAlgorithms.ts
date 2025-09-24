export type DCAlgorithm = {
  slug: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  space: string;
  recurrence?: string;
  pattern: string;
  applications: string[];
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  pseudocode: string[];
};

export const dcAlgorithms: DCAlgorithm[] = [
  {
    slug: 'merge-sort',
    name: 'Merge Sort',
    description: 'Stable divide-and-conquer sorting algorithm that merges sorted halves.',
    category: 'Sorting',
    difficulty: 'Beginner',
    time: 'O(n log n)',
    space: 'O(n)',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    pattern: 'Divide-Sort-Merge',
    applications: ['Stable sorting', 'External sorting', 'Linked list sorting'],
    advantages: ['Stable', 'Predictable O(n log n) performance', 'Good for linked lists'],
    disadvantages: ['Extra memory usage', 'Not in-place (array)', 'Cache locality weaker than quicksort'],
    useCases: ['Large datasets needing stability', 'Sorting linked structures', 'Multi-way merges'],
    pseudocode: [
      'function mergeSort(arr):',
      '  if length(arr) <= 1: return arr',
      '  mid = length(arr) // 2',
      '  left = mergeSort(arr[0:mid])',
      '  right = mergeSort(arr[mid:])',
      '  return merge(left, right)'
    ]
  },
  {
    slug: 'quick-sort',
    name: 'Quick Sort',
    description: 'In-place partition-based recursive sorting algorithm.',
    category: 'Sorting',
    difficulty: 'Intermediate',
    time: 'O(n log n) avg, O(n^2) worst',
    space: 'O(log n)',
    recurrence: 'T(n) = T(k) + T(n-k-1) + O(n)',
    pattern: 'Partition-Recurse',
    applications: ['General purpose sorting', 'Systems libraries', 'Large in-memory arrays'],
    advantages: ['In-place', 'Excellent cache performance', 'Average O(n log n)'],
    disadvantages: ['Unstable', 'Worst-case O(n^2)', 'Sensitive to pivot choice'],
    useCases: ['General arrays', 'Randomized pivot variants', 'Dual-pivot optimizations'],
    pseudocode: [
      'function quickSort(arr, lo, hi):',
      '  if lo >= hi: return',
      '  p = partition(arr, lo, hi)',
      '  quickSort(arr, lo, p-1)',
      '  quickSort(arr, p+1, hi)'
    ]
  },
  {
    slug: 'binary-search',
    name: 'Binary Search',
    description: 'Efficiently finds target in sorted array by halving search space.',
    category: 'Searching',
    difficulty: 'Beginner',
    time: 'O(log n)',
    space: 'O(1) iterative',
    recurrence: 'T(n) = T(n/2) + O(1)',
    pattern: 'Divide-Search',
    applications: ['Lookup tables', 'Boundary finding', 'Optimization search'],
    advantages: ['Fast on large sorted data', 'Simple iterative form', 'Low memory'],
    disadvantages: ['Needs sorted data', 'Random access requirement', 'Edge cases off-by-one'],
    useCases: ['Lower/upper bounds', 'Square root / monotonic predicate', 'Parametric search'],
    pseudocode: [
      'function binarySearch(arr, target):',
      '  lo = 0; hi = length(arr) - 1',
      '  while lo <= hi:',
      '    mid = (lo + hi) // 2',
      '    if arr[mid] == target: return mid',
      '    if arr[mid] < target: lo = mid + 1 else hi = mid - 1',
      '  return -1'
    ]
  },
  {
    slug: 'max-subarray',
    name: 'Maximum Subarray (D&C)',
    description: 'Finds contiguous subarray with maximum sum using recursive splits.',
    category: 'Optimization',
    difficulty: 'Intermediate',
    time: 'O(n log n)',
    space: 'O(log n)',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    pattern: 'Divide-Max-Combine',
    applications: ['Finance (maximum profit span)', 'Signal analysis', 'Array segment scoring'],
    advantages: ['Demonstrates recursion + combine logic', 'Good teaching tool'],
    disadvantages: ['Slower than Kadane O(n)', 'More memory (stack)'],
    useCases: ['Educational recursion example', 'Baseline vs linear DP'],
    pseudocode: [
      'function maxSubarray(arr):',
      '  if length(arr) == 1: return arr[0]',
      '  mid = length(arr)//2',
      '  leftBest = maxSubarray(arr[0:mid])',
      '  rightBest = maxSubarray(arr[mid:])',
      '  crossBest = bestCrossing(arr, mid)',
      '  return max(leftBest, rightBest, crossBest)'
    ]
  },
  {
    slug: 'closest-pair',
    name: 'Closest Pair of Points',
    description: 'Finds closest two points in plane faster than O(n^2).',
    category: 'Geometry',
    difficulty: 'Advanced',
    time: 'O(n log n)',
    space: 'O(n)',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    pattern: 'Geometric Divide-Conquer',
    applications: ['Computational geometry', 'Collision detection', 'GIS'],
    advantages: ['Asymptotically optimal', 'Teaches plane sweep refinement'],
    disadvantages: ['Complex implementation details', 'Edge sorting steps'],
    useCases: ['Spatial clustering', 'Game development proximity checks'],
    pseudocode: [
      'function closestPair(points):',
      '  sort points by x',
      '  return recursive(points)',
      'function recursive(P):',
      '  if |P| <= 3: return bruteForce(P)',
      '  mid = |P|/2; L = P[0:mid]; R = P[mid:]',
      '  d = min(recursive(L), recursive(R))',
      '  strip = points within d of mid line',
      '  return min(d, stripClosest(strip, d))'
    ]
  },
  {
    slug: 'strassen',
    name: "Strassen's Matrix Multiplication",
    description: 'Matrix multiplication using 7 multiplications instead of 8.',
    category: 'Math',
    difficulty: 'Advanced',
    time: 'O(n^2.807)',
    space: 'O(n^2)',
    recurrence: 'T(n) = 7T(n/2) + O(n^2)',
    pattern: 'Block Divide-Conquer',
    applications: ['Large dense matrices', 'Scientific computing'],
    advantages: ['Faster than naive for large n'],
    disadvantages: ['High constant factors', 'Numerical stability issues'],
    useCases: ['Very large matrix ops', 'Algorithmic research'],
    pseudocode: [
      'function strassen(A, B):',
      '  if n == 1: return A*B',
      '  partition A,B into 4 submatrices',
      '  compute 7 products P1..P7',
      '  combine into result matrix C',
      '  return C'
    ]
  },
  {
    slug: 'fft',
    name: 'Fast Fourier Transform (FFT)',
    description: 'Radix-2 Cooley–Tukey transform splitting even/odd indices.',
    category: 'Math',
    difficulty: 'Advanced',
    time: 'O(n log n)',
    space: 'O(n)',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    pattern: 'Recursive Even/Odd',
    applications: ['Signal processing', 'Polynomial multiplication'],
    advantages: ['Massive performance win over DFT', 'Widely applicable'],
    disadvantages: ['Requires n power of 2 (basic form)', 'Complex twiddle factors'],
    useCases: ['Audio analysis', 'Convolution speeding'],
    pseudocode: [
      'function fft(a):',
      '  n = length(a)',
      '  if n == 1: return a',
      '  even = fft(a[0::2])',
      '  odd  = fft(a[1::2])',
      '  combine using roots of unity',
      '  return result'
    ]
  },
  {
    slug: 'karatsuba',
    name: 'Karatsuba Multiplication',
    description: 'Faster large integer multiplication using three recursive products.',
    category: 'Math',
    difficulty: 'Intermediate',
    time: 'O(n^1.585)',
    space: 'O(n)',
    recurrence: 'T(n) = 3T(n/2) + O(n)',
    pattern: 'Split-Recombine',
    applications: ['Cryptography', 'Big integer libraries'],
    advantages: ['Better than O(n^2) for big n'],
    disadvantages: ['Slower for small n', 'Implementation overhead'],
    useCases: ['Arbitrary precision arithmetic'],
    pseudocode: [
      'function karatsuba(x, y):',
      '  if small(x,y): return x*y',
      '  split x = x1*B + x0; y = y1*B + y0',
      '  z0 = karatsuba(x0, y0)',
      '  z1 = karatsuba((x0+x1),(y0+y1))',
      '  z2 = karatsuba(x1, y1)',
      '  return (z2*B^2) + ((z1 - z2 - z0)*B) + z0'
    ]
  },
  {
    slug: 'median-of-medians',
    name: 'Median of Medians',
    description: 'Selection algorithm yielding good pivot guaranteeing linear time.',
    category: 'Selection',
    difficulty: 'Advanced',
    time: 'O(n)',
    space: 'O(1)',
    recurrence: 'T(n) <= T(n/5) + T(7n/10) + O(n)',
    pattern: 'Pivot Selection',
    applications: ['Deterministic selection', 'Robust quicksort pivot'],
    advantages: ['Worst-case linear time', 'Deterministic'],
    disadvantages: ['Large constant factors', 'Rarely fastest in practice'],
    useCases: ['Theoretical guarantees', 'Embedded deterministic needs'],
    pseudocode: [
      'function select(arr, k):',
      '  if small(arr): return sort(arr)[k]',
      '  partition arr into groups of 5',
      '  medians = [median(g) for g in groups]',
      '  pivot = select(medians, len(medians)//2)',
      '  L, E, G = partition(arr, pivot)',
      '  recurse into appropriate partition'
    ]
  }
];

export const dcAlgorithmOrder = dcAlgorithms.map(a => a.slug);

export function getAlgorithm(slug: string) {
  return dcAlgorithms.find(a => a.slug === slug);
}

export function getPrevNext(slug: string) {
  const idx = dcAlgorithmOrder.indexOf(slug);
  return {
    prev: idx > 0 ? dcAlgorithms[idx - 1] : null,
    next: idx < dcAlgorithmOrder.length - 1 ? dcAlgorithms[idx + 1] : null
  };
}
