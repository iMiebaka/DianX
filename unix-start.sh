
if [ ! -d "venv" ]; then
  python3 -m venv venv
  . venv/bin/activate
  echo "Virtual enviroment created and activated"

  pip install -r requirements.txt
  echo "Dependenies installed"

else
  . venv/bin/activate

fi


python wsgi.py

