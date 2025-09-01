import { database } from './firebase';
import { ref, push, set, get, remove, onValue, off, DatabaseReference } from 'firebase/database';

// Priority levels with ClickUp colors
export type Priority = 'urgent' | 'high' | 'normal' | 'low';

export interface TodoTask {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  userId: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: number;
  updatedAt?: number;
  userId: string;
  userName: string;
}

// Priority colors (ClickUp style)
export const PRIORITY_COLORS = {
  urgent: {
    bg: 'bg-red-100',
    border: 'border-red-500',
    text: 'text-red-700',
    badge: 'bg-red-500',
    hover: 'hover:bg-red-200'
  },
  high: {
    bg: 'bg-orange-100', 
    border: 'border-orange-500',
    text: 'text-orange-700',
    badge: 'bg-orange-500',
    hover: 'hover:bg-orange-200'
  },
  normal: {
    bg: 'bg-blue-100',
    border: 'border-blue-500', 
    text: 'text-blue-700',
    badge: 'bg-blue-500',
    hover: 'hover:bg-blue-200'
  },
  low: {
    bg: 'bg-gray-100',
    border: 'border-gray-500',
    text: 'text-gray-700', 
    badge: 'bg-gray-500',
    hover: 'hover:bg-gray-200'
  }
};

export const PRIORITY_LABELS = {
  urgent: 'Urgent',
  high: 'High',
  normal: 'Normal', 
  low: 'Low'
};

// Create a new task
export const createTask = async (userId: string, title: string, description: string, priority: Priority): Promise<string | null> => {
  if (typeof window === 'undefined' || !database) {
    console.warn('Firebase not available or not initialized');
    return null;
  }
  
  try {
    const tasksRef = ref(database, `tasks/${userId}`);
    const newTaskRef = push(tasksRef);
    
    const task: Omit<TodoTask, 'id'> = {
      title,
      description,
      priority,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId,
      comments: []
    };
    
    await set(newTaskRef, task);
    console.log('Task created successfully');
    return newTaskRef.key;
  } catch (error) {
    console.error('Error creating task:', error);
    return null;
  }
};

// Get all tasks for a user
export const getUserTasks = async (userId: string): Promise<TodoTask[]> => {
  if (typeof window === 'undefined' || !database) {
    console.warn('Firebase not available or not initialized');
    return [];
  }
  
  try {
    const tasksRef = ref(database, `tasks/${userId}`);
    const snapshot = await get(tasksRef);
    
    if (snapshot.exists()) {
      const tasksData = snapshot.val();
      return Object.keys(tasksData).map(key => ({
        id: key,
        ...tasksData[key]
      }));
    }
    return [];
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
};

// Update a task
export const updateTask = async (userId: string, taskId: string, updates: Partial<TodoTask>): Promise<boolean> => {
  if (typeof window === 'undefined' || !database) {
    console.warn('Firebase not available or not initialized');
    return false;
  }
  
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    await set(taskRef, {
      ...updates,
      updatedAt: Date.now()
    });
    console.log('Task updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating task:', error);
    return false;
  }
};

// Delete a task
export const deleteTask = async (userId: string, taskId: string): Promise<boolean> => {
  if (typeof window === 'undefined' || !database) {
    console.warn('Firebase not available or not initialized');
    return false;
  }
  
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    await remove(taskRef);
    console.log('Task deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};

// Toggle task completion
export const toggleTaskCompletion = async (userId: string, taskId: string, completed: boolean): Promise<boolean> => {
  if (typeof window === 'undefined' || !database) {
    console.warn('Firebase not available or not initialized');
    return false;
  }
  
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    const snapshot = await get(taskRef);
    
    if (snapshot.exists()) {
      const task = snapshot.val();
      await set(taskRef, {
        ...task,
        completed,
        updatedAt: Date.now()
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error toggling task completion:', error);
    return false;
  }
};

// Add comment to task
export const addComment = async (userId: string, taskId: string, text: string, userName: string): Promise<boolean> => {
  if (typeof window === 'undefined' || !database) {
    console.warn('Firebase not available or not initialized');
    return false;
  }
  
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    const snapshot = await get(taskRef);
    
    if (snapshot.exists()) {
      const task = snapshot.val();
      const newComment: Comment = {
        id: Date.now().toString(),
        text,
        createdAt: Date.now(),
        userId,
        userName
      };
      
      const updatedComments = [...(task.comments || []), newComment];
      
      await set(taskRef, {
        ...task,
        comments: updatedComments,
        updatedAt: Date.now()
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding comment:', error);
    return false;
  }
};

// Listen to real-time task updates
export const listenToUserTasks = (userId: string, callback: (tasks: TodoTask[]) => void) => {
  if (typeof window === 'undefined' || !database) {
    console.warn('Firebase not available or not initialized');
    return null;
  }
  
  const tasksRef = ref(database, `tasks/${userId}`);
  onValue(tasksRef, (snapshot) => {
    if (snapshot.exists()) {
      const tasksData = snapshot.val();
      const tasks = Object.keys(tasksData).map(key => ({
        id: key,
        ...tasksData[key]
      }));
      callback(tasks);
    } else {
      callback([]);
    }
  });
  return tasksRef;
};

// Stop listening to task updates
export const stopListeningToTasks = (tasksRef: DatabaseReference | null) => {
  if (tasksRef) {
    off(tasksRef);
  }
};

// Edit task details (title, description, priority)
export const editTask = async (
  userId: string, 
  taskId: string, 
  title: string, 
  description: string, 
  priority: Priority
): Promise<boolean> => {
  if (typeof window === 'undefined' || !database) {
    console.warn('Firebase not available or not initialized');
    return false;
  }
  
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    const snapshot = await get(taskRef);
    
    if (snapshot.exists()) {
      const task = snapshot.val();
      await set(taskRef, {
        ...task,
        title,
        description,
        priority,
        updatedAt: Date.now()
      });
      console.log('Task edited successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error editing task:', error);
    return false;
  }
};

// Edit comment
export const editComment = async (
  userId: string, 
  taskId: string, 
  commentId: string, 
  newText: string
): Promise<boolean> => {
  if (typeof window === 'undefined' || !database) {
    console.warn('Firebase not available or not initialized');
    return false;
  }
  
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    const snapshot = await get(taskRef);
    
    if (snapshot.exists()) {
      const task = snapshot.val();
      const comments = task.comments || [];
      
      const updatedComments = comments.map((comment: Comment) => 
        comment.id === commentId 
          ? { ...comment, text: newText, updatedAt: Date.now() }
          : comment
      );
      
      await set(taskRef, {
        ...task,
        comments: updatedComments,
        updatedAt: Date.now()
      });
      console.log('Comment edited successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error editing comment:', error);
    return false;
  }
};

// Delete comment
export const deleteComment = async (
  userId: string, 
  taskId: string, 
  commentId: string
): Promise<boolean> => {
  if (typeof window === 'undefined' || !database) {
    console.warn('Firebase not available or not initialized');
    return false;
  }
  
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    const snapshot = await get(taskRef);
    
    if (snapshot.exists()) {
      const task = snapshot.val();
      const comments = task.comments || [];
      
      const updatedComments = comments.filter((comment: Comment) => comment.id !== commentId);
      
      await set(taskRef, {
        ...task,
        comments: updatedComments,
        updatedAt: Date.now()
      });
      console.log('Comment deleted successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting comment:', error);
    return false;
  }
};
