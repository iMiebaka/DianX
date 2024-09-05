from src.app import db

class File(db.Model):
    __tablename__ = "file"
    id = db.Column(db.Integer, primary_key=True)
    payload = db.Column(db.Text)
    file_type = db.Column(db.String)
    media_url = db.Column(db.String)
    
__all__ = ["File"]