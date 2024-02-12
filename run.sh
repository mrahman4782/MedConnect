#!/bin/bash

# Navigate to the script's directory
cd "$(dirname "$0")"

# Start the express server in the backend directory in a new terminal
cd backend
osascript -e 'tell app "Terminal"
    do script "cd \"$(pwd)\" && node server.js"
end tell'

# Ensure we return to the script's directory before navigating to the frontend
cd ..

# Open a new terminal and start the expo project for the frontend
cd frontend
osascript -e 'tell app "Terminal"
    do script "cd \"$(pwd)\" && npx expo start"
end tell'
