'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  Brain,
  TrendingUp,
  RotateCw,
  ArrowLeftRight,
  Zap,
  Target,
  CheckCircle,
  Play,
  Pause,
  SkipForward,
  RefreshCw
} from 'lucide-react';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import PseudocodeBlock from '@/components/PseudocodeBlock';

// Two Pointer Technique Visualization
const TwoPointerDemo = () => {
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [target, setTarget] = useState(10);
  const [leftPointer, setLeftPointer] = useState(0);
  const [rightPointer, setRightPointer] = useState(8);
  const [isRunning, setIsRunning] = useState(false);
  const [found, setFound] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);

  const runTwoPointer = async () => {
    setIsRunning(true);
    setFound(false);
    setSteps([]);
    let left = 0;
    let right = array.length - 1;
    let stepCount = 0;
    const newSteps: string[] = [];

    while (left < right && stepCount < 10) {
      setLeftPointer(left);
      setRightPointer(right);
      
      const sum = array[left] + array[right];
      const step = `Step ${stepCount + 1}: arr[${left}] + arr[${right}] = ${array[left]} + ${array[right]} = ${sum}`;
      newSteps.push(step);
      setSteps([...newSteps]);

      if (sum === target) {
        newSteps.push(`✅ Found pair: (${array[left]}, ${array[right]}) at indices (${left}, ${right})`);
        setSteps([...newSteps]);
        setFound(true);
        break;
      } else if (sum < target) {
        newSteps.push(`Sum < target, move left pointer right`);
        left++;
      } else {
        newSteps.push(`Sum > target, move right pointer left`);
        right--;
      }
      setSteps([...newSteps]);
      stepCount++;
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (!found && stepCount >= 10) {
      newSteps.push(`❌ No pair found that sums to ${target}`);
      setSteps([...newSteps]);
    }

    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <ArrowLeftRight className="w-6 h-6 mr-2 text-blue-600" />
        Two Pointer Technique: Find Pair with Sum
      </h3>
      
      {/* Controls */}
      <div className="mb-4 flex items-center space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Sum:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
            className="border rounded px-3 py-1 w-20"
            disabled={isRunning}
          />
        </div>
        <button
          onClick={runTwoPointer}
          disabled={isRunning}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isRunning ? 'Running...' : 'Find Pair'}
        </button>
      </div>

      {/* Array Visualization */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          {array.map((value, index) => (
            <div
              key={index}
              className={`w-12 h-12 border-2 rounded flex items-center justify-center font-mono text-sm ${
                index === leftPointer ? 'bg-blue-200 border-blue-400' :
                index === rightPointer ? 'bg-red-200 border-red-400' :
                'bg-gray-100 border-gray-300'
              }`}
            >
              {value}
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-200 border border-blue-400 mr-2"></div>
            <span>Left Pointer: {leftPointer}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-200 border border-red-400 mr-2"></div>
            <span>Right Pointer: {rightPointer}</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      {steps.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
          <h4 className="font-semibold text-gray-800 mb-2">Steps:</h4>
          <div className="space-y-1">
            {steps.map((step, index) => (
              <div key={index} className="text-sm text-gray-700 font-mono">
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Sliding Window Visualization
const SlidingWindowDemo = () => {
  const [array, setArray] = useState([2, 1, 5, 1, 3, 2]);
  const [windowSize, setWindowSize] = useState(3);
  const [currentStart, setCurrentStart] = useState(0);
  const [maxSum, setMaxSum] = useState(0);
  const [maxWindow, setMaxWindow] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);

  const runSlidingWindow = async () => {
    setIsRunning(true);
    setSteps([]);
    setMaxSum(0);
    setMaxWindow([]);
    
    let currentSum = 0;
    let maxSumFound = 0;
    let maxWindowFound: number[] = [];
    const newSteps: string[] = [];

    // Calculate initial window sum
    for (let i = 0; i < windowSize; i++) {
      currentSum += array[i];
    }
    maxSumFound = currentSum;
    maxWindowFound = array.slice(0, windowSize);
    
    newSteps.push(`Initial window [0-${windowSize-1}]: sum = ${currentSum}`);
    setSteps([...newSteps]);
    setMaxSum(maxSumFound);
    setMaxWindow([...maxWindowFound]);
    setCurrentStart(0);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Slide the window
    for (let i = windowSize; i < array.length; i++) {
      const windowStart = i - windowSize + 1;
      setCurrentStart(windowStart);
      
      // Remove leftmost element and add rightmost element
      currentSum = currentSum - array[i - windowSize] + array[i];
      const currentWindow = array.slice(windowStart, i + 1);
      
      const step = `Window [${windowStart}-${i}]: remove ${array[i - windowSize]}, add ${array[i]}, sum = ${currentSum}`;
      newSteps.push(step);
      setSteps([...newSteps]);

      if (currentSum > maxSumFound) {
        maxSumFound = currentSum;
        maxWindowFound = [...currentWindow];
        setMaxSum(maxSumFound);
        setMaxWindow([...maxWindowFound]);
        newSteps.push(`New maximum sum found: ${maxSumFound}`);
        setSteps([...newSteps]);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    newSteps.push(`✅ Maximum sum subarray: [${maxWindowFound.join(', ')}] = ${maxSumFound}`);
    setSteps([...newSteps]);
    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
        Sliding Window: Maximum Sum Subarray
      </h3>
      
      {/* Controls */}
      <div className="mb-4 flex items-center space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Window Size:</label>
          <input
            type="number"
            value={windowSize}
            onChange={(e) => setWindowSize(Math.max(1, parseInt(e.target.value) || 1))}
            className="border rounded px-3 py-1 w-20"
            disabled={isRunning}
            min="1"
            max={array.length}
          />
        </div>
        <button
          onClick={runSlidingWindow}
          disabled={isRunning || windowSize > array.length}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {isRunning ? 'Running...' : 'Find Max Sum'}
        </button>
      </div>

      {/* Array Visualization */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          {array.map((value, index) => {
            const isInCurrentWindow = index >= currentStart && index < currentStart + windowSize;
            const isInMaxWindow = maxWindow.length > 0 && 
              index >= array.indexOf(maxWindow[0]) && 
              index <= array.indexOf(maxWindow[maxWindow.length - 1]) &&
              !isRunning;
            
            return (
              <div
                key={index}
                className={`w-12 h-12 border-2 rounded flex items-center justify-center font-mono text-sm transition-colors ${
                  isInCurrentWindow ? 'bg-green-200 border-green-400' :
                  isInMaxWindow ? 'bg-yellow-200 border-yellow-400' :
                  'bg-gray-100 border-gray-300'
                }`}
              >
                {value}
              </div>
            );
          })}
        </div>
        
        <div className="text-sm text-gray-600">
          Current window sum: {array.slice(currentStart, currentStart + windowSize).reduce((a, b) => a + b, 0)} | 
          Maximum sum found: {maxSum}
        </div>
      </div>

      {/* Steps */}
      {steps.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
          <h4 className="font-semibold text-gray-800 mb-2">Steps:</h4>
          <div className="space-y-1">
            {steps.map((step, index) => (
              <div key={index} className="text-sm text-gray-700 font-mono">
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function ArrayAlgorithmsPage() {
  const [activeTab, setActiveTab] = useState<'two-pointer' | 'sliding-window' | 'prefix-sum' | 'rotation'>('two-pointer');

  const algorithmInfo = {
    'two-pointer': {
      title: 'Two Pointer Technique',
      description: 'Use two pointers moving towards each other or in the same direction',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      useCases: ['Finding pairs with target sum', 'Palindrome checking', 'Removing duplicates', 'Merging sorted arrays']
    },
    'sliding-window': {
      title: 'Sliding Window Pattern',
      description: 'Maintain a window of elements and slide it across the array',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      useCases: ['Maximum/minimum sum subarray', 'Longest substring problems', 'Fixed-size window problems']
    },
    'prefix-sum': {
      title: 'Prefix Sum Technique',
      description: 'Precompute cumulative sums for fast range sum queries',
      timeComplexity: 'O(1) query, O(n) preprocessing',
      spaceComplexity: 'O(n)',
      useCases: ['Range sum queries', 'Subarray sum problems', '2D matrix sum queries']
    },
    'rotation': {
      title: 'Array Rotation',
      description: 'Rotate array elements left or right by k positions',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) for in-place',
      useCases: ['Rotating arrays', 'Cyclic sorting', 'String rotation problems']
    }
  };

  const pseudocodes = {
    'two-pointer': `ALGORITHM: Two Pointer Sum
INPUT: sorted_array[], target_sum
OUTPUT: pair indices or -1

BEGIN
1. left = 0
2. right = array.length - 1
3. 
4. WHILE left < right DO
5.     sum = array[left] + array[right]
6.     IF sum == target_sum THEN
7.         RETURN (left, right)
8.     ELSE IF sum < target_sum THEN
9.         left = left + 1
10.    ELSE
11.        right = right - 1
12.    END IF
13. END WHILE
14. 
15. RETURN -1  // No pair found
END`,

    'sliding-window': `ALGORITHM: Sliding Window Max Sum
INPUT: array[], window_size
OUTPUT: maximum sum of any subarray of size window_size

BEGIN
1. max_sum = 0
2. window_sum = 0
3. 
4. // Calculate sum of first window
5. FOR i = 0 TO window_size - 1 DO
6.     window_sum += array[i]
7. END FOR
8. max_sum = window_sum
9. 
10. // Slide the window
11. FOR i = window_size TO array.length - 1 DO
12.     window_sum = window_sum - array[i - window_size] + array[i]
13.     max_sum = MAX(max_sum, window_sum)
14. END FOR
15. 
16. RETURN max_sum
END`,

    'prefix-sum': `ALGORITHM: Prefix Sum Array
INPUT: array[]
OUTPUT: prefix_sum[] for range queries

BEGIN
1. prefix_sum[0] = array[0]
2. 
3. FOR i = 1 TO array.length - 1 DO
4.     prefix_sum[i] = prefix_sum[i-1] + array[i]
5. END FOR
6. 
7. // Range sum query from index l to r
8. FUNCTION rangeSum(l, r):
9.     IF l == 0 THEN
10.        RETURN prefix_sum[r]
11.    ELSE
12.        RETURN prefix_sum[r] - prefix_sum[l-1]
13.    END IF
END`,

    'rotation': `ALGORITHM: Array Rotation (Right by k positions)
INPUT: array[], k
OUTPUT: rotated array[]

BEGIN
1. n = array.length
2. k = k % n  // Handle k > n
3. 
4. // Method 1: Using extra space
5. temp[] = new array[n]
6. FOR i = 0 TO n - 1 DO
7.     temp[(i + k) % n] = array[i]
8. END FOR
9. 
10. // Method 2: In-place (3 reversals)
11. REVERSE(array, 0, n - 1)        // Reverse entire array
12. REVERSE(array, 0, k - 1)        // Reverse first k elements
13. REVERSE(array, k, n - 1)        // Reverse remaining elements
END`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/learning-path/module-2" className="text-white hover:text-blue-200">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold mb-2">Array Algorithms</h1>
              <p className="text-blue-100">Master essential array problem-solving patterns and techniques</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Interactive Demos */}
        <div className="grid md:grid-cols-2 gap-8">
          <TwoPointerDemo />
          <SlidingWindowDemo />
        </div>

        {/* Algorithm Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-blue-600" />
            Essential Array Algorithms
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-6 border-b overflow-x-auto">
            {Object.keys(algorithmInfo).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {algorithmInfo[tab as keyof typeof algorithmInfo].title}
              </button>
            ))}
          </div>

          {/* Algorithm Info */}
          <div className="mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {algorithmInfo[activeTab].title}
                </h3>
                <p className="text-gray-600 mb-4">{algorithmInfo[activeTab].description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-32">Time Complexity:</span>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {algorithmInfo[activeTab].timeComplexity}
                    </code>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-32">Space Complexity:</span>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {algorithmInfo[activeTab].spaceComplexity}
                    </code>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Common Use Cases:</h4>
                <ul className="space-y-2">
                  {algorithmInfo[activeTab].useCases.map((useCase, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pseudocode */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Algorithm Pseudocode:</h4>
              <PseudocodeBlock code={pseudocodes[activeTab]} />
            </div>

            {/* C++ Implementation */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">C++ Implementation:</h4>
              <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                {activeTab === 'two-pointer' && `// Two Pointer Sum in C++
vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {-1, -1}; // Not found
}`}
                
                {activeTab === 'sliding-window' && `// Sliding Window Maximum Sum in C++
int maxSumSubarray(vector<int>& arr, int k) {
    int n = arr.size();
    int maxSum = 0, windowSum = 0;
    
    // First window
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window
    for (int i = k; i < n; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}`}
                
                {activeTab === 'prefix-sum' && `// Prefix Sum in C++
class PrefixSum {
    vector<long long> prefixSum;
public:
    PrefixSum(vector<int>& arr) {
        int n = arr.size();
        prefixSum.resize(n);
        prefixSum[0] = arr[0];
        
        for (int i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i-1] + arr[i];
        }
    }
    
    long long rangeSum(int l, int r) {
        if (l == 0) return prefixSum[r];
        return prefixSum[r] - prefixSum[l-1];
    }
};`}
                
                {activeTab === 'rotation' && `// Array Rotation in C++
void rotateRight(vector<int>& nums, int k) {
    int n = nums.size();
    k = k % n;
    
    // Method: 3 reversals
    reverse(nums.begin(), nums.end());
    reverse(nums.begin(), nums.begin() + k);
    reverse(nums.begin() + k, nums.end());
}

void reverse(vector<int>::iterator start, 
             vector<int>::iterator end) {
    while (start < end) {
        swap(*start++, *--end);
    }
}`}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Practice Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-8 h-8 mr-3 text-green-600" />
            Practice Problems
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Beginner Problems</h3>
              <div className="space-y-3">
                <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                  <div className="font-medium text-green-800">Two Sum (Sorted Array)</div>
                  <div className="text-sm text-green-600">Find two numbers that add up to target</div>
                </div>
                <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                  <div className="font-medium text-green-800">Maximum Sum Subarray (Size K)</div>
                  <div className="text-sm text-green-600">Find maximum sum of any subarray of size K</div>
                </div>
                <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                  <div className="font-medium text-green-800">Range Sum Queries</div>
                  <div className="text-sm text-green-600">Answer multiple range sum queries efficiently</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Intermediate Problems</h3>
              <div className="space-y-3">
                <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="font-medium text-yellow-800">3Sum Problem</div>
                  <div className="text-sm text-yellow-600">Find all unique triplets that sum to zero</div>
                </div>
                <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="font-medium text-yellow-800">Longest Substring (No Repeats)</div>
                  <div className="text-sm text-yellow-600">Find longest substring with unique characters</div>
                </div>
                <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="font-medium text-yellow-800">Subarray Sum Equals K</div>
                  <div className="text-sm text-yellow-600">Count subarrays with sum equal to K</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center"
        >
          <Link
            href="/learning-path/module-2/operations"
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous: Basic Operations
          </Link>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                <span className="font-semibold text-lg">Arrays Module Complete!</span>
              </div>
              <p className="text-green-100 text-sm mt-1">Ready for searching & sorting algorithms</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}