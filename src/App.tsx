import "./App.css";
import { Goals } from "./components/Goals";
import { QuoteDisplay } from "./features/quotes/QuoteDisplay";
import { JSX, useEffect, useRef, useState } from "react";
import { WeatherWidget } from "./components/WeatherWidget";
import { useAppSelector } from "./app/hooks";
import { selectGoals } from "./features/goals/goalSlice";
import calmingForestBokeh from './images/calmingForestBokeh.png';
import calmingMountainBokeh from './images/calmingMountainBokeh.png';
import calmingLakeBokeh from './images/calmingLakeBokeh.png';
import fetchImages from "./images/unSplashAPIslice";
import { useFetchQuote } from "./features/quotes/useFetchQuote";

export const App = (): JSX.Element => {
  const goals = useAppSelector(selectGoals);
  const { fetchQuote } = useFetchQuote();
  const [backgroundImage, setBackgroundImage] = useState(calmingLakeBokeh);
  const isInitialMount = useRef(true);

  // Fetch a random quote on mount and whenever goals change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    fetchQuote();
  }, [goals]);

  // Update background image based on goals length
  useEffect(() => {
    const index = Math.max(0, (goals.length - 1) % 3);
    const queries = ["forest", "mountain", "lake"];

    async function loadImage() {
      try {
        const data = await fetchImages(queries[index]);
        setBackgroundImage(data.urls.full);
      } catch {
        setBackgroundImage(
          calmingMountainBokeh || calmingForestBokeh || calmingLakeBokeh
        );
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
      }}
    >
      <header className="App-header">
        <div className="WeatherWidget-container ">
         <WeatherWidget />
        </div>
        <h1>Welcome to Inspirational Redux!</h1>
        <p>This is a React-Redux application that provides inspiration.</p>
        <Goals goals={goals} />
        <QuoteDisplay />
      </header>
      <footer className="footer">
        Copyright 2025 &copy; Kyle Jaesu Akuya
      </footer>
    </div>
  );
};
