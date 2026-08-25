export type Language = 'ar' | 'en';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export enum RaadState {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  TYPING = 'TYPING',
}
