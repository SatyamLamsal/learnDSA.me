# Fix the remaining main issues quickly
$files = @(
    "src\app\algorithms\sorting\bubble-sort\page.tsx",
    "src\app\algorithms\sorting\heap-sort\page.tsx", 
    "src\app\algorithms\sorting\insertion-sort\page.tsx",
    "src\app\algorithms\sorting\quick-sort\page.tsx",
    "src\app\algorithms\sorting\selection-sort\page.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Add useCallback import if missing
        if ($content -notmatch "useCallback") {
            $content = $content -replace "useState, useEffect", "useState, useEffect, useCallback"
        }
        
        # Remove unused imports 
        $content = $content -replace "import \{ motion, AnimatePresence \}", "import { motion }"
        $content = $content -replace "  Clock,\s*", ""
        $content = $content -replace "  Zap,\s*", ""
        $content = $content -replace "  ArrowUpDown,\s*", ""
        $content = $content -replace "  BarChart3,\s*", ""
        $content = $content -replace "  AlertTriangle,\s*", ""
        $content = $content -replace "  ArrowUp,\s*", ""
        
        # Add useCallback to generateRandomArray
        $content = $content -replace "const generateRandomArray = \(size = \d+\) => \{", "const generateRandomArray = useCallback((size = 8) => {"
        
        # Find the end of generateRandomArray and add closing for useCallback
        $lines = $content -split "`n"
        $inGenFunction = $false
        $braceCount = 0
        for ($i = 0; $i -lt $lines.Count; $i++) {
            if ($lines[$i] -match "const generateRandomArray = useCallback") {
                $inGenFunction = $true
                $braceCount = 0
            }
            if ($inGenFunction) {
                $braces = ($lines[$i] | Select-String -Pattern "\{" -AllMatches).Matches.Count
                $braces -= ($lines[$i] | Select-String -Pattern "\}" -AllMatches).Matches.Count
                $braceCount += $braces
                if ($braceCount -eq 0 -and $lines[$i] -match "\};" -and $lines[$i] -notmatch "useCallback") {
                    $lines[$i] = $lines[$i] -replace "\};", "}, []);"
                    $inGenFunction = $false
                    break
                }
            }
        }
        $content = $lines -join "`n"
        
        # Fix hook dependencies
        $content = $content -replace "useEffect\(\(\) => \{\s*generateRandomArray\(\);\s*\}, \[\]\);", "useEffect(() => { generateRandomArray(); }, [generateRandomArray]);"
        
        # Fix map parameters
        $content = $content -replace "\.map\(\(\w+, index\) =>", ".map((item, _) =>"
        
        Set-Content $file $content
        Write-Host "Fixed sorting algorithm: $file"
    }
}

Write-Host "Quick sorting fixes completed"