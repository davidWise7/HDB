@echo off
echo Activating Python Virtual Environment...
echo.
cd /d "C:\Users\user\Desktop\HumanBehaviorDecoder"
call venv\Scripts\activate.bat
echo.
echo ✅ Virtual Environment Activated!
echo Current directory: %CD%
echo.
cmd /k