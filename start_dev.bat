@echo off
echo Starting Human Behavior Decoder Server...
echo.
cd /d "C:\Users\user\Desktop\HumanBehaviorDecoder"

echo 🔧 Activating Virtual Environment...
call venv\Scripts\activate.bat

echo ✅ Virtual Environment Activated!
echo Python location: 
where python
echo Pip location:
where pip
echo.

echo 🔧 Installing/Updating dependencies...
venv\Scripts\pip.exe install fastapi uvicorn tensorflow scikit-learn librosa pydantic-settings numpy
echo.

cd backend
echo 🚀 Starting FastAPI server...
echo Server will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo Press Ctrl+C to stop the server
echo.
venv\Scripts\python.exe main.py
pause
