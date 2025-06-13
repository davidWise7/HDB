@echo off 
echo Starting Human Behavior Decoder development servers... 
 
echo Starting backend server... 
start "Backend Server" cmd /k "cd backend && python main.py" 
 
timeout /t 3 
 
echo Starting frontend server... 
start "Frontend Server" cmd /k "cd frontend && npm start" 
 
echo Both servers starting... 
echo Backend: http://localhost:8000 
echo Frontend: http://localhost:3000 
