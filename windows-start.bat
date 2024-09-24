@echo off
if not exist "venv" (
  echo Creating Virtual environment
  python -m venv venv
  call venv\Scripts\activate.bat
  echo Virtual environment created and activated

  python.exe -m pip install --upgrade pip
  pip install -r requirements.txt
  echo Dependencies installed
  
  flask db migrate
  flask db upgrade
  mkdir files
  
) else (
  call venv\Scripts\activate.bat
)

python wsgi.py
