from uuid import uuid4
import os

MEDIA_PATH = "files"
from pathlib import Path

def upload_blob(file):
    file_extension = Path(file.filename).suffix[1:]
    extension = f".{file_extension}" if file_extension else ""
    filename = f'{str(uuid4().hex)}{extension}'
    complete_path = os.path.join(MEDIA_PATH, filename)
    file = file.save(complete_path)
    return "/" + complete_path
