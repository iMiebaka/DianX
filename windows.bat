@echo off
if not exist "venv" (
  python -m venv venv
  call venv\Scripts\activate.bat
  echo Virtual environment created and activated

  pip install -r requirements.txt
  echo Dependencies installed
) else (
  call venv\Scripts\activate.bat
)

python wsgi.py
