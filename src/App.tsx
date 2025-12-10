import "./App.css"
import { Goals } from "./components/Goals"
import { QuoteDisplay } from "./features/quotes/QuoteDisplay"
import { JSX } from "react"
import { useEffect, useState } from 'react'
import { WeatherWidget } from "./components/WeatherWidget.tsx"
import { useAppSelector } from "./app/hooks"
import { selectGoals } from "./features/goals/goalSlice"
import calmingForestBokeh from './images/calmingForestBokeh.png'
import calmingMountainBokeh from './images/calmingMountainBokeh.png'
import calmingLakeBokeh from './images/calmingLakeBokeh.png'

const images = [
  calmingForestBokeh,
  calmingMountainBokeh,
  calmingLakeBokeh,
]

export const App = (): JSX.Element => {
  const goals = useAppSelector(selectGoals)
  const [backgroundImage, setBackgroundImage] = useState(calmingForestBokeh)

  useEffect(() => {
    // Always update the background: use goals.length to pick image, default to first if 0
    const index = Math.max(0, (goals.length - 1) % images.length)
    setBackgroundImage(images[index])
  }, [goals.length])

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <header className="App-header">
        <div className="WeatherWidget">
          <WeatherWidget />
        </div>
        <h1>Welcome to Inspirational Redux!</h1>
        <p>
          This is a React-Redux application that provides inspiration through
          quotes and helps you track your goals.
        </p>
        <Goals goals={goals} />
        <QuoteDisplay />
      </header>
      <footer className="footer">Copyright 2025 &copy; Made by Kyle Jaesu Akuya
        <p>All rights reserved.</p>
        <cite>Images generated via Adobe Firefly.</cite>
      </footer>
    </div>
  )
}
