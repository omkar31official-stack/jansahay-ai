from database import db
from datetime import datetime

class Scheme(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    eligibility_criteria = db.Column(db.Text, nullable=False)
    benefits = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100))
    application_link = db.Column(db.String(500))
    languages = db.Column(db.String(500), default='["en", "hi"]')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'eligibility_criteria': self.eligibility_criteria,
            'benefits': self.benefits,
            'category': self.category,
            'application_link': self.application_link,
            'languages': eval(self.languages)
        }

class UserQuery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.Text)
    ai_response = db.Column(db.Text)
    language = db.Column(db.String(10))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)