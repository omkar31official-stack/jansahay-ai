from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, db
from models import Scheme, UserQuery
from utils.eligibility_checker import check_eligibility
from utils.translator import translate_text
from utils.recommender import recommend_schemes
from dotenv import load_dotenv
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jansahay.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

init_db(app)


@app.route('/')
def home():
    return jsonify({
        "message": "JanSahay AI Backend is Running 🚀",
        "available_endpoints": [
            "/api/chat",
            "/api/check-eligibility",
            "/api/schemes",
            "/api/translate"
        ]
    })


@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '').lower()
        language = data.get('language', 'en')

        with open("scheme_data.json", "r", encoding="utf-8") as file:
            schemes = json.load(file)

        stop_words = {
            "i", "am", "a", "the", "need", "help", "with",
            "for", "to", "of", "and", "is", "me"
        }

        user_words = [word for word in user_message.split() if word not in stop_words]

        synonyms = {
            "medical": "health",
            "doctor": "health",
            "hospital": "health",
            "insurance": "health",
            "house": "housing",
            "home": "housing",
            "loan": "business",
            "farmer": "agriculture",
            "farm": "agriculture",
            "business": "business"
        }

        expanded_words = []

        for word in user_words:
            if word in synonyms:
                expanded_words.append(synonyms[word])
            expanded_words.append(word)

        user_words = expanded_words

        best_match = None
        highest_score = 0

        for scheme in schemes:
            searchable_text = (
                scheme["name"].lower() + " " +
                scheme["description"].lower() + " " +
                scheme["eligibility_criteria"].lower() + " " +
                scheme["category"].lower()
            )

            score = sum(1 for word in user_words if word in searchable_text)

            if score > highest_score:
                highest_score = score
                best_match = scheme

        if best_match and highest_score > 0:
            response_text = "Here is the most relevant scheme:\n\n"
            response_text += f"🔹 {best_match['name']}\n"
            response_text += f"Description: {best_match['description']}\n"
            response_text += f"Eligibility: {best_match['eligibility_criteria']}\n"
            response_text += f"Benefits: {best_match['benefits']}\n"
            response_text += f"Apply here: {best_match['application_link']}\n"
        else:
            response_text = "I couldn't find a matching scheme. Please mention details like farmer, health, housing, business, income, etc."

        if language != 'en':
            response_text = translate_text(response_text, language)

        return jsonify({
            "success": True,
            "response": response_text,
            "language": language
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/check-eligibility', methods=['POST'])
def eligibility():
    try:
        data = request.json
        user_details = data.get('user_details', {})

        eligible_schemes = check_eligibility(user_details)
        recommendations = recommend_schemes(user_details)

        return jsonify({
            'success': True,
            'eligible_schemes': eligible_schemes,
            'recommendations': recommendations
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/schemes', methods=['GET'])
def get_schemes():
    try:
        schemes = Scheme.query.all()

        return jsonify({
            'success': True,
            'schemes': [scheme.to_dict() for scheme in schemes]
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/translate', methods=['POST'])
def translate():
    try:
        data = request.json
        text = data.get('text', '')
        target_language = data.get('target_language', 'en')

        translated = translate_text(text, target_language)

        return jsonify({
            'success': True,
            'translated_text': translated
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
