import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Custom cursor logic
function setupCustomCursor() {
  try {
    // Check if cursor already exists
    if (document.querySelector('.custom-cursor')) {
      return;
    }

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isVisible = false;

    function animate() {
      if (isVisible) {
        cursor.style.left = mouseX - 18 + 'px';
        cursor.style.top = mouseY - 18 + 'px';
      }
      requestAnimationFrame(animate);
    }
    animate();

    // Show cursor on mouse move
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
      }
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursor.style.opacity = '0';
    });

    // Pulse on hover over interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('button, .cursor-pulse, [role="button"]')) {
        cursor.classList.add('pulse');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('button, .cursor-pulse, [role="button"]')) {
        cursor.classList.remove('pulse');
      }
    });

    // Ripple on click
    document.addEventListener('mousedown', () => {
      cursor.classList.add('ripple');
    });

    document.addEventListener('animationend', (e) => {
      if (e.animationName === 'ripple') {
        cursor.classList.remove('ripple');
      }
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Show default cursor on touch devices
    if ('ontouchstart' in window) {
      document.body.style.cursor = 'auto';
      cursor.style.display = 'none';
    }

  } catch (error) {
    console.warn('Custom cursor setup failed:', error);
  }
}

// Setup cursor after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupCustomCursor);
} else {
  setupCustomCursor();
}
