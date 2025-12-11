# Inspirational Homepage App

A beginner-friendly **React + Redux** application that combines daily goal tracking with inspirational content. Think of it as a **productivity dashboard** that tracks your goals while keeping you motivated with weather updates, random quotes, and beautiful images.

---

## Table of Contents

- [Features](#features)  
- [Key Concepts for Redux Learners](#key-concepts-for-redux-learners)  
- [Technologies Used](#technologies-used)  
- [Getting Started](#getting-started)  
- [Available Scripts](#available-scripts)  
- [Project Structure](#project-structure)  
- [Understanding the Code](#understanding-the-code)  
- [Contributing & Forking](#contributing--forking)  
- [Future Improvements](#future-improvements)  

---

## Features

- 🌤 **Current Weather**: Shows your local weather (requests location permission)
- 🖼 **Dynamic Background Images**: Beautiful, inspiring images that change based on your progress
- 💬 **Random Inspirational Quotes**: Fresh quotes displayed each time you visit
- ✅ **Goals Tracker**: Add, edit, delete, and mark goals as complete
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

---

## Key Concepts for Redux Learners

This project is designed to teach fundamental Redux patterns. Here are the core concepts you'll encounter:

### **1. Redux Store** (`src/app/store.ts`)
The **store** is the single source of truth for your entire app's state. Think of it like a database in memory that React components can access.

```typescript
const store = configureStore({
  reducer: {
    goals: goalsReducer,
    [quotesApi.reducerPath]: quotesApi.reducer,
  },
});
```

### **2. Slices** (e.g., `src/features/goals/goalSlice.ts`)
A **slice** is a bundle of Redux logic (state + actions). It combines:
- **State**: What data you're storing
- **Reducers**: Functions that update that state
- **Actions**: Events that trigger reducers

```typescript
export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action) => { /* update state */ },
    removeGoal: (state, action) => { /* update state */ },
  },
});
```

### **3. Reducers**
Reducers are **pure functions** that take the current state and an action, then return a new state. With Redux Toolkit, you can mutate state directly (it uses Immer under the hood).

### **4. Actions & Dispatching**
Actions are objects that describe what happened. You **dispatch** actions to trigger reducers:

```typescript
dispatch(addGoal({ id: "1", goalText: "Learn Redux" }));
```

### **5. Selectors** (Memoization)
**Selectors** are functions that extract data from the store. The `createSelector` function optimizes performance by memoizing results:

```typescript
export const selectGoals = createSelector(
  (state: RootState) => state.goals.goalsArray,
  (goalsArray) => goalsArray.filter(goal => !goal.completed)
);
```

### **6. Hooks**
Redux provides hooks to connect components to the store:
- `useAppSelector()`: Read state from the store
- `useAppDispatch()`: Dispatch actions

```typescript
const goals = useAppSelector(selectGoals);
const dispatch = useAppDispatch();
dispatch(addGoal({ id: "1", goalText: "Stay hydrated" }));
```

### **7. RTK Query** (Bonus: Advanced Topic)
The quotes feature uses **RTK Query**, a data-fetching library built on Redux Toolkit. It handles loading, caching, and refetching API data automatically.

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| **React 19** | Build interactive user interfaces |
| **Redux Toolkit** | State management (createSlice, configureStore) |
| **React-Redux** | Connect React components to Redux (hooks) |
| **TypeScript** | Type safety and better developer experience |
| **Vite** | Fast build tool and development server |
| **CSS Modules** | Scoped, maintainable styling |
| **RTK Query** | Data fetching and caching |
| **Vitest** | Fast unit testing framework |

---

## Getting Started

### Prerequisites

Ensure you have **Node.js 18+** and **npm** installed:

```sh
node --version  # Should be v18 or higher
npm --version
```

### Installation

```sh
# Clone or navigate to the project
cd InspirationalRedux

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser to `http://localhost:5173` (or the URL shown in your terminal).

---

## Available Scripts

Run these commands in the project directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run type-check` | Check for TypeScript errors |
| `npm run lint` | Find code style issues |
| `npm run lint:fix` | Fix code style issues automatically |
| `npm run format` | Format code with Prettier |
| `npm test` | Run unit tests |

---

## Project Structure

```
src/
├── app/
│   ├── store.ts              # Redux store configuration (combines all slices)
│   ├── hooks.ts              # Custom hooks (useAppDispatch, useAppSelector)
│   └── createAppSlice.ts     # Redux Toolkit utilities
│
├── features/
│   ├── goals/
│   │   ├── goalSlice.ts      # Goals slice (state + reducers + actions)
│   │   └── Goal.tsx          # Individual goal component
│   │
│   ├── quotes/
│   │   ├── quotesSlice.ts    # RTK Query setup for quotes API
│   │   ├── QuoteDisplay.tsx  # Quote display component
│   │   └── quotes.json       # Local quotes data
│   │
│   └── weatherWidget/
│       └── weatherWidgetAPI.ts # Weather API integration
│
├── components/
│   ├── Goals.tsx             # Goals container component
│   └── WeatherWidget.tsx     # Weather display component
│
├── images/                   # Static images and API integration
├── utils/                    # Helper functions and test utilities
├── App.tsx                   # Root component
├── App.css                   # Global styles
├── index.css                 # Reset and base styles
└── main.tsx                  # React entry point
```

---

## Understanding the Code

### How Goals Work (Redux in Action)

**1. Read from Store** (`Goals.tsx`):
```typescript
const goals = useAppSelector(selectGoals);
```

**2. Dispatch Action** (`Goal.tsx`):
```typescript
const dispatch = useAppDispatch();
dispatch(completeGoal({ id: goal.id }));
```

**3. Reducer Updates State** (`goalSlice.ts`):
```typescript
completeGoal: (state, action) => {
  const goal = state.goalsArray.find((g) => g.id === action.payload.id);
  if (goal) goal.completed = true;
}
```

**4. Component Re-renders** (automatically when selected state changes):
React detects the state change and re-renders the component.

### Redux Data Flow

```
User Action → Dispatch Action → Reducer Updates State → Selector Memoizes → Component Re-renders
```

### Why Use Selectors?

Selectors prevent unnecessary re-renders. The component only updates when the **selected data** actually changes:

```typescript
// Without selector: component re-renders when ANY state changes
const goals = useAppSelector(state => state.goals.goalsArray);

// With selector: component only re-renders when goalsArray changes
const goals = useAppSelector(selectGoals);
```

---

## Contributing & Forking

### If This Is YOUR Project

If you own this repository, you **don't need to fork**. Simply clone and push directly:

```sh
git clone https://github.com/YOUR-USERNAME/ReactReduxPortfolioProject.git
cd ReactReduxPortfolioProject/InspirationalRedux

# Install dependencies
npm install

# Make changes and push
git add .
git commit -m "Your changes"
git push origin main
```

### If You Want to Contribute to Someone Else's Project

A **fork** is your own copy of the project. Forking is useful when:
- You want to contribute to a project you don't own
- You want to experiment without affecting the original
- You want to submit improvements via pull requests

#### Step 1: Fork the Repository

**1. Go to the GitHub repository** (make sure you're logged into GitHub)

**2. Click the "Fork" button** in the top-right corner

**3. Select where to fork it** (your personal account or organization)

**4. GitHub creates a copy** under `github.com/YOUR-USERNAME/ProjectName`

#### Step 2: Clone Your Fork Locally

```sh
# Replace YOUR-USERNAME with your GitHub username
git clone https://github.com/YOUR-USERNAME/ReactReduxPortfolioProject.git
cd ReactReduxPortfolioProject/InspirationalRedux

# Install dependencies
npm install

# Start developing
npm run dev
```

#### Step 3: Stay Synced with the Original (Optional)

To pull updates from the original project:

```sh
# Add the original repository as "upstream"
git remote add upstream https://github.com/ORIGINAL-OWNER/ReactReduxPortfolioProject.git

# Fetch updates from the original
git fetch upstream

# Merge updates into your local branch
git merge upstream/main
```

#### Step 4: Create a Pull Request

**1. Create a new branch** for your changes:
```sh
git checkout -b feature/my-awesome-feature
```

**2. Make your changes** and commit:
```sh
git add .
git commit -m "Add my awesome feature"
```

**3. Push to your fork**:
```sh
git push origin feature/my-awesome-feature
```

**4. Go to GitHub** and click "Create Pull Request"

**5. Describe your changes** and submit for review

#### Code Guidelines

Before submitting a PR, make sure to:

```sh
npm run type-check  # Check for TypeScript errors
npm run lint        # Check code style
npm run lint:fix    # Fix linting issues
npm run format      # Format code with Prettier
npm test            # Run tests
```

---

## Possible Future Improvements

- **Local Storage Persistence**: Save goals to browser storage
- **Dark Mode**: Toggle between light and dark themes
- **Goal Categories**: Organize goals by type (health, work, personal)
- **Statistics Dashboard**: Track goal completion rates
- **Cloud Sync**: Save goals to a backend database
- **Notifications**: Remind users about their goals
- **Unit Tests**: Expand test coverage for all slices and components
