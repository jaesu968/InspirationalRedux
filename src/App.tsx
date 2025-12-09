import "./App.css"
import { Goal } from "./features/goals/Goal"
import { Quotes } from "./features/quotes/Quotes"
import logo from "./logo.svg"
import { JSX } from "react"
import { useState, useEffect } from 'react'
import { WeatherWidget } from "./components/WeatherWidget.tsx"

export const App = () => (
  <div className="App">
    <header className="App-header">
      <div className="WeatherWidget">
        <WeatherWidget />
      </div>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Welcome to Inspirational Redux!</h1>
      <p>
        This is a React-Redux application that provides inspiration through
        quotes and helps you track your goals.
      </p>
      <Quotes />
      <Goal />
    </header>
    <footer className="footer">Copyright 2025 &copy; Made by Kyle Jaesu Akuya
      <p>All rights reserved.</p>
      <cite>Images generated via Adobe Firefly.</cite>
    </footer>
  </div>
)
