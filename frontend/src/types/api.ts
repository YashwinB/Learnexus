export interface LearningProgress {
  subject: string;
  progress: number;
  description: string;
  completed_tasks: number;
  total_tasks: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar_url: string;
  current_mood: 'motivated' | 'focused' | 'challenged' | 'excited';
  career_goal: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  has_audio?: boolean;
  has_image?: boolean;
  image_url?: string;
  audio_url?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Flask API endpoints structure
export const API_ENDPOINTS = {
  STUDENT_PROFILE: '/api/student/profile',
  LEARNING_PROGRESS: '/api/student/progress',
  CHAT_MESSAGES: '/api/chat/messages',
  SEND_MESSAGE: '/api/chat/send',
  UPLOAD_IMAGE: '/api/upload/image',
  UPLOAD_AUDIO: '/api/upload/audio',
  INSIGHTS: '/api/student/insights',
  MOOD_UPDATE: '/api/student/mood',
} as const;