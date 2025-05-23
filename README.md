# WildlifeTracker Frontend

This is the React frontend for the WildlifeTracker system, a tool used by rangers to visualize wildlife data and record field observations.

## Features

- **Interactive Map Views** using Mapbox:
  - Track family movement over time
  - View all families in a herd by location
  - Find nearby events and observations based on radius and date range
- **Family Stats Dashboard**:
  - Line graphs for family size and health over time
- **Ranger Portal**:
  - Submit new herds, families, observations, and events via user-friendly forms

## Tech Stack

- React (Create React App)
- Apollo Client (GraphQL integration)
- Mapbox GL JS
- Recharts
- React Router

## Setup

1. **Clone the repo** and navigate to the frontend directory:
   ```bash
   cd wildlife-tracker-map

2. **Install dependencies:** 
   ```bash
   npm install

3. **Set up environment variables:** Create a .env file with your Mapbox access token:
   ```bash  
   REACT_APP_MAPBOX_TOKEN=your_mapbox_token

4. **Start the app:**
   ```bash
   npm start

The app will be available at http://localhost:3000.

## Folder Structure
- components/ – Map views, forms, shared UI
- graphql/ – Queries and mutations
- pages/ – Route-level components (Home, RangerPortal, etc.)
- App.js – Main router and layout
- index.js – Apollo client and root rendering
   

## Notes
- The app assumes the backend GraphQL API is running on http://localhost:8000/graphql
- This project was scaffolded with Windsurf