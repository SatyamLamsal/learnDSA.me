import { colors } from "./src/theme/pixe.js";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: { colors },
  },
  plugins: [],
};
