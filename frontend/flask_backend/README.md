# Learnexus Flask Backend

This is the Flask backend API for the Learnexus learning dashboard application.

## Features

- RESTful API endpoints for student data
- File upload handling for images and audio
- Chat message management
- CORS enabled for frontend integration
- Error handling and validation

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask application:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Student Profile
- `GET /api/student/profile` - Get student profile information
- `POST /api/student/mood` - Update student mood

### Learning Progress
- `GET /api/student/progress` - Get learning progress data
- `GET /api/student/insights` - Get learning insights

### Chat System
- `GET /api/chat/messages` - Get chat message history
- `POST /api/chat/send` - Send a new message and get AI response

### File Uploads
- `POST /api/upload/image` - Upload image files
- `POST /api/upload/audio` - Upload audio files
- `GET /uploads/<filename>` - Serve uploaded files

### Environment Variables

Create a `.env` file in the flask_backend directory:

```
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
```

## Frontend Integration

To connect the React frontend to this Flask backend, update the API base URL in your React app:

```javascript
const API_BASE_URL = 'http://localhost:5000';
```

## Production Deployment

For production deployment:

1. Set `FLASK_ENV=production`
2. Use a production WSGI server like Gunicorn
3. Set up proper database connections
4. Configure file storage (AWS S3, etc.)
5. Set up proper authentication and authorization