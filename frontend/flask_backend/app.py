# Flask Backend for Learnexus Learning Dashboard
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'wav', 'mp3', 'ogg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Sample data (in production, this would come from a database)
student_profile = {
    "id": "student_001",
    "name": "Aarav",
    "avatar_url": "/avatars/aarav.png",
    "current_mood": "motivated",
    "career_goal": "Environmental Scientist"
}

learning_progress = [
    {
        "subject": "Math: Fractions",
        "progress": 75,
        "description": "Solved fraction problems involving addition and subtraction",
        "completed_tasks": 3,
        "total_tasks": 4
    },
    {
        "subject": "Reading Summary",
        "progress": 60,
        "description": "Identified the main themes of the assigned text",
        "completed_tasks": 2,
        "total_tasks": 3
    },
    {
        "subject": "Science Activity",
        "progress": 85,
        "description": "Learned about photosynthesis and plant growth",
        "completed_tasks": 4,
        "total_tasks": 5
    }
]

chat_messages = [
    {
        "id": "1",
        "text": "Hi! I'm your Learnexus AI assistant. How can I help you with your learning today?",
        "sender": "ai",
        "timestamp": datetime.now().isoformat(),
        "has_audio": False,
        "has_image": False
    }
]

@app.route('/api/student/profile', methods=['GET'])
def get_student_profile():
    """Get student profile information"""
    return jsonify({
        "success": True,
        "data": student_profile
    })

@app.route('/api/student/progress', methods=['GET'])
def get_learning_progress():
    """Get student learning progress"""
    return jsonify({
        "success": True,
        "data": learning_progress
    })

@app.route('/api/chat/messages', methods=['GET'])
def get_chat_messages():
    """Get chat message history"""
    return jsonify({
        "success": True,
        "data": chat_messages
    })

@app.route('/api/chat/send', methods=['POST'])
def send_message():
    """Send a new chat message and get AI response"""
    data = request.get_json()
    
    if not data or 'message' not in data:
        return jsonify({
            "success": False,
            "error": "Message content is required"
        }), 400
    
    user_message = {
        "id": str(uuid.uuid4()),
        "text": data['message'],
        "sender": "user",
        "timestamp": datetime.now().isoformat(),
        "has_audio": False,
        "has_image": False
    }
    
    chat_messages.append(user_message)
    
    # Generate AI response (in production, this would call an actual AI service)
    ai_responses = [
        "That's a great question! Let me help you understand that concept better.",
        "I can see you're working hard on this topic. Would you like me to explain it step by step?",
        "Excellent progress! Let's dive deeper into this subject.",
        "I understand what you're asking. Here's how I would approach this problem...",
        "That's an interesting observation! Let me provide some additional context."
    ]
    
    import random
    ai_response = {
        "id": str(uuid.uuid4()),
        "text": random.choice(ai_responses),
        "sender": "ai",
        "timestamp": datetime.now().isoformat(),
        "has_audio": False,
        "has_image": False
    }
    
    chat_messages.append(ai_response)
    
    return jsonify({
        "success": True,
        "data": ai_response
    })

@app.route('/api/upload/image', methods=['POST'])
def upload_image():
    """Upload an image file"""
    if 'image' not in request.files:
        return jsonify({
            "success": False,
            "error": "No image file provided"
        }), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({
            "success": False,
            "error": "No file selected"
        }), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Add timestamp to filename to avoid conflicts
        name, ext = os.path.splitext(filename)
        filename = f"{name}_{int(datetime.now().timestamp())}{ext}"
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        return jsonify({
            "success": True,
            "data": {
                "url": f"/uploads/{filename}"
            }
        })
    
    return jsonify({
        "success": False,
        "error": "Invalid file type"
    }), 400

@app.route('/api/upload/audio', methods=['POST'])
def upload_audio():
    """Upload an audio file"""
    if 'audio' not in request.files:
        return jsonify({
            "success": False,
            "error": "No audio file provided"
        }), 400
    
    file = request.files['audio']
    
    if file.filename == '':
        return jsonify({
            "success": False,
            "error": "No file selected"
        }), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Add timestamp to filename to avoid conflicts
        name, ext = os.path.splitext(filename)
        filename = f"{name}_{int(datetime.now().timestamp())}{ext}"
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        return jsonify({
            "success": True,
            "data": {
                "url": f"/uploads/{filename}"
            }
        })
    
    return jsonify({
        "success": False,
        "error": "Invalid file type"
    }), 400

@app.route('/api/student/mood', methods=['POST'])
def update_mood():
    """Update student mood"""
    data = request.get_json()
    
    if not data or 'mood' not in data:
        return jsonify({
            "success": False,
            "error": "Mood is required"
        }), 400
    
    student_profile['current_mood'] = data['mood']
    
    return jsonify({
        "success": True,
        "data": {"success": True}
    })

@app.route('/api/student/insights', methods=['GET'])
def get_insights():
    """Get student learning insights"""
    insights = {
        "overall_progress": 73,
        "strengths": ["Mathematics", "Science"],
        "areas_for_improvement": ["Reading Comprehension"],
        "study_streak": 7,
        "total_tasks_completed": 25,
        "learning_time_today": 120  # minutes
    }
    
    return jsonify({
        "success": True,
        "data": insights
    })

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve uploaded files"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": "Endpoint not found"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)