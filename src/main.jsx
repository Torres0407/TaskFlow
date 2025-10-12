import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Put this at the very top of src/main.jsx BEFORE rendering
// const savedTheme = localStorage.getItem("theme");
// if (savedTheme === "dark") {
//   document.documentElement.classList.add("dark");
// } else if (!savedTheme && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
//   document.documentElement.classList.add("dark");
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
