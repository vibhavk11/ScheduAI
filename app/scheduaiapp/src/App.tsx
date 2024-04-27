import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [barColor, setBarColor] = useState('#333'); // Default color

useEffect(() => {
    // Function to calculate the color based on the current time
    const calculateBarColor = () => {
      const currentTime = new Date().getHours();
      let targetColor;
      // Interpolating colors for sunset and sunrise
      if (currentTime >= 6 && currentTime < 9) {
        // Sunrise - interpolate from dark blue to orange
        targetColor = interpolateColor('#2c3e50', '#ff7f0e', currentTime - 6, 3);
      } else if (currentTime >= 9 && currentTime < 18) {
        // Daytime - blue
        targetColor = '#3498db';
      } else if (currentTime >= 18 && currentTime < 21) {
        // Sunset - interpolate from blue to orange
        targetColor = interpolateColor('#3498db', '#ff7f0e', currentTime - 18, 3);
      } else {
        // Nighttime - dark blue
        targetColor = '#2c3e50';
      }

      setBarColor(targetColor);
    };

    // Function to interpolate between two colors
    const interpolateColor = (color1: string, color2: string, step: number, steps: number): string => {
      const hex = (color: string): number => parseInt(color.substring(1), 16);
      const red = hex(color1) + (hex(color2) - hex(color1)) * step / steps;
      const green = hex(color1) + (hex(color2) - hex(color1)) * step / steps;
      const blue = hex(color1) + (hex(color2) - hex(color1)) * step / steps;
      return `rgb(${red}, ${green}, ${blue})`;
    };

    // Call the function initially
    calculateBarColor();

    // Set up interval to update color every minute
    const interval = setInterval(calculateBarColor, 60000); // Update every minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="bar" style={{ backgroundColor: barColor}}>
        <h1>scheduAI</h1>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 2)}>
          login
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
