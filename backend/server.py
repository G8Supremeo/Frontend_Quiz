from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.models import db, User, QuizResult
from dotenv import load_dotenv
import bcrypt
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# --- Auth Routes ---
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'success': False, 'message': 'Email already registered'}), 400

    hashed = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
    user = User(name=data['name'], email=data['email'], password_hash=hashed.decode())
    db.session.add(user)
    db.session.commit()
    return jsonify({'success': True, 'user': {'name': user.name, 'email': user.email}})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.checkpw(data['password'].encode(), user.password_hash.encode()):
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    return jsonify({'success': True, 'user': {'name': user.name, 'email': user.email}})

# --- Quiz Routes ---
@app.route('/api/results', methods=['POST'])
def save_result():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    result = QuizResult(
        user_id=user.id,
        score=data['score'],
        category=data['category'],
        total_questions=data['totalQuestions'],
        correct_answers=data['correctAnswers']
    )
    db.session.add(result)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    top = QuizResult.query.order_by(QuizResult.score.desc()).limit(10).all()
    return jsonify([{
        'name': r.user.name,
        'score': r.score,
        'category': r.category,
        'date': r.date.strftime('%Y-%m-%d')
    } for r in top])

if __name__ == '__main__':
    app.run(debug=True, port=5000)