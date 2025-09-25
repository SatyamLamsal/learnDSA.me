const fs = require('fs');
const path = require('path');

// Fix unescaped apostrophes by replacing with &apos;
function fixApostrophes(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Replace unescaped single quotes with &apos; in JSX content
        content = content.replace(/([>])([^<]*)'([^<]*?)(<)/g, '$1$2&apos;$3$4');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`Fixed apostrophes in: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

// Remove unused imports
function removeUnusedImports(filePath, unusedImports) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        unusedImports.forEach(importName => {
            // Remove from import statement
            const importRegex = new RegExp(`\\b${importName}\\b,?\\s*`, 'g');
            content = content.replace(importRegex, '');
            
            // Clean up empty commas
            content = content.replace(/,\s*,/g, ',');
            content = content.replace(/,\s*}/g, ' }');
            content = content.replace(/{\s*,/g, '{ ');
        });
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`Fixed unused imports in: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

// Remove unused variables 
function removeUnusedVariables(filePath, variables) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        variables.forEach(variable => {
            if (variable.type === 'const' || variable.type === 'let') {
                // Comment out unused const/let declarations
                const regex = new RegExp(`^(\\s*)(const|let)\\s+${variable.name}\\s*=.*?;`, 'gm');
                content = content.replace(regex, '$1// $2 $3 = ...; // Unused variable commented out');
            }
        });
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`Fixed unused variables in: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

// Files with critical unescaped entities errors
const criticalFiles = [
    'src/app/algorithms/graph/bellman-ford/page.tsx',
    'src/app/algorithms/graph/bellman-ford/theory/page.tsx',
    'src/app/algorithms/graph/dijkstra-shortest-path/page.tsx',
    'src/app/algorithms/graph/dijkstra-shortest-path/theory/page.tsx',
    'src/app/algorithms/graph/floyd-warshall/simulation/page.tsx',
    'src/app/algorithms/graph/kruskal/page.tsx',
    'src/app/algorithms/graph/kruskal/theory/page.tsx',
    'src/app/algorithms/graph/prim/page.tsx',
    'src/app/algorithms/graph/prim/theory/page.tsx',
    'src/app/algorithms/graph/topological-sort/page.tsx'
];

console.log('Fixing critical unescaped entities errors...');
criticalFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        fixApostrophes(fullPath);
    }
});

console.log('Done!');