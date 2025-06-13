@echo off
echo Starting Human Behavior Decoder Server...
echo.
cd /d "C:\Users\user\Desktop\HumanBehaviorDecoder"
call venv\Scripts\activate.bat
echo ✅ Virtual Environment Activated!
echo.
cd backend
echo Starting FastAPI server...
echo Server will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
python main.py
pause