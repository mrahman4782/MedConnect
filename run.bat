@echo off
cd /d "%~dp0"

rem Start the express server in the backend directory in a new terminal
cd backend
start cmd /k "node server.js"

rem Ensure we return to the script's directory before navigating to the frontend
cd /d "%~dp0"

rem Open a new terminal and start the expo project for the frontend
cd frontend
start cmd /k "npx expo start"
pause
