import { APIResponse, LearningProgress, StudentProfile, ChatMessage } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class APIService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        data: {} as T,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async getStudentProfile(): Promise<APIResponse<StudentProfile>> {
    return this.request<StudentProfile>('/api/student/profile');
  }

  async getLearningProgress(): Promise<APIResponse<LearningProgress[]>> {
    return this.request<LearningProgress[]>('/api/student/progress');
  }

  async getChatMessages(): Promise<APIResponse<ChatMessage[]>> {
    return this.request<ChatMessage[]>('/api/chat/messages');
  }

  async sendMessage(message: string): Promise<APIResponse<ChatMessage>> {
    return this.request<ChatMessage>('/api/chat/send', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async uploadImage(file: File): Promise<APIResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('image', file);

    return this.request<{ url: string }>('/api/upload/image', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set multipart headers
    });
  }

  async uploadAudio(file: File): Promise<APIResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('audio', file);

    return this.request<{ url: string }>('/api/upload/audio', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set multipart headers
    });
  }

  async updateMood(mood: string): Promise<APIResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>('/api/student/mood', {
      method: 'POST',
      body: JSON.stringify({ mood }),
    });
  }

  async getInsights(): Promise<APIResponse<any>> {
    return this.request<any>('/api/student/insights');
  }
}

export const apiService = new APIService();