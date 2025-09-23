// Example: How to use the custom colors in your components

import { colors, getDataStructureColor, navigation, content } from '@/theme/customColors';

// Example 1: Using colors directly
const MyComponent = () => {
  return (
    <div style={{ backgroundColor: colors.surfaces.background }}>
      <h1 style={{ color: colors.content.title }}>
        Page Title
      </h1>
      <p style={{ color: colors.content.body }}>
        This is body text
      </p>
      <button style={{ 
        backgroundColor: colors.primary[500],
        color: 'white' 
      }}>
        Primary Button
      </button>
    </div>
  );
};

// Example 2: Using with Tailwind (inline styles)
const TailwindExample = () => {
  return (
    <div className="p-4" style={{ backgroundColor: colors.surfaces.card }}>
      <h2 style={{ color: colors.content.subtitle }}>
        Arrays Data Structure
      </h2>
      <div 
        className="p-4 rounded" 
        style={{ backgroundColor: getDataStructureColor('arrays') }}
      >
        Array content
      </div>
    </div>
  );
};

// Example 3: Using destructured colors
const { title, body, muted } = content;
const { background, card } = colors.surfaces;

const CleanExample = () => {
  return (
    <div style={{ backgroundColor: background }}>
      <div className="p-6 rounded-lg" style={{ backgroundColor: card }}>
        <h1 style={{ color: title }}>Clean Component</h1>
        <p style={{ color: body }}>Main content</p>
        <small style={{ color: muted }}>Muted text</small>
      </div>
    </div>
  );
};

// Example 4: Dynamic color selection
const DataStructureCard = ({ type }: { type: keyof typeof colors.dataStructures }) => {
  const bgColor = getDataStructureColor(type);
  
  return (
    <div 
      className="p-4 rounded-lg text-white"
      style={{ backgroundColor: bgColor }}
    >
      <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
      <p>Learn about {type}</p>
    </div>
  );
};

export { MyComponent, TailwindExample, CleanExample, DataStructureCard };