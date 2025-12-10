import "./App.css";
import { Goals } from "./components/Goals";
import { QuoteDisplay } from "./features/quotes/QuoteDisplay"; // RTK Query component
import { JSX, useEffect, useState } from "react";
import { WeatherWidget } from "./components/WeatherWidget";
import { useAppSelector } from "./app/hooks";
import { selectGoals } from "./features/goals/goalSlice";
import calmingForestBokeh from './images/calmingForestBokeh.png';
import calmingMountainBokeh from './images/calmingMountainBokeh.png';
import calmingLakeBokeh from './images/calmingLakeBokeh.png';
import fetchImages from "./images/unSplashAPIslice";

export const App = (): JSX.Element => {
  const goals = useAppSelector(selectGoals);
  const [backgroundImage, setBackgroundImage] = useState(calmingLakeBokeh);

  // Update background image based on goals length
  useEffect(() => {
    const fallbackImages = [calmingForestBokeh, calmingMountainBokeh, calmingLakeBokeh];
    const index = Math.max(0, (goals.length - 1) % 3);
    const queries = ["forest", "mountain", "lake"];

    async function loadImage() {
      try {
        const data = await fetchImages(queries[index]);
        setBackgroundImage(data.urls.full);
      } catch {
        // Use the correct fallback image based on the current index
        setBackgroundImage(fallbackImages[index]);
      }
    }

    loadImage();
  }, [goals.length]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <header className="App-header">
        <div className="WeatherWidget-container">
          <WeatherWidget />
        </div>
        <h1>Welcome to Inspirational Redux!</h1>
        <p>This is a React-Redux application that provides inspiration.</p>
        <Goals goals={goals} />
        {/* Wrapper to push quotes to bottom */}
      <div className="Quotes-container-wrapper">
        <QuoteDisplay />
      </div>
      </header>

      <footer className="footer">
        Copyright 2025 &copy; Kyle Jaesu Akuya
      </footer>
    </div>
  );
};
