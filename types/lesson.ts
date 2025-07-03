export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content?: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // in minutes
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LessonCardProps {
  lesson: Lesson;
  onPress?: () => void;
} 