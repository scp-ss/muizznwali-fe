import { database } from './firebase';
import { ref, push, set, get, remove, onValue, off, DatabaseReference } from 'firebase/database';

// Generic function to write data
export const writeData = async (path: string, data: unknown) => {
  if (typeof window === 'undefined') {
    console.warn('Firebase database not available in server environment');
    return false;
  }
  
  try {
    const dbRef = ref(database, path);
    await set(dbRef, data);
    console.log('Data written successfully');
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};

// Generic function to read data once
export const readData = async (path: string) => {
  if (typeof window === 'undefined') {
    console.warn('Firebase database not available in server environment');
    return null;
  }
  
  try {
    const dbRef = ref(database, path);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};

// Generic function to add data (generates unique ID)
export const addData = async (path: string, data: unknown) => {
  if (typeof window === 'undefined') {
    console.warn('Firebase database not available in server environment');
    return null;
  }
  
  try {
    const dbRef = ref(database, path);
    const newRef = push(dbRef);
    await set(newRef, data);
    console.log('Data added with ID:', newRef.key);
    return newRef.key;
  } catch (error) {
    console.error('Error adding data:', error);
    return null;
  }
};

// Generic function to delete data
export const deleteData = async (path: string) => {
  try {
    const dbRef = ref(database, path);
    await remove(dbRef);
    console.log('Data deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting data:', error);
    return false;
  }
};

// Function to listen to data changes in real-time
export const listenToData = (path: string, callback: (data: unknown) => void) => {
  if (typeof window === 'undefined') {
    console.warn('Firebase database not available in server environment');
    return null;
  }
  
  const dbRef = ref(database, path);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
  return dbRef; // Return reference so you can stop listening later
};

// Function to stop listening to data changes
export const stopListening = (dbRef: DatabaseReference) => {
  off(dbRef);
};

// Example functions for common use cases
export const saveUser = async (userId: string, userData: unknown) => {
  return await writeData(`users/${userId}`, userData);
};

export const getUser = async (userId: string) => {
  return await readData(`users/${userId}`);
};

export const addPost = async (postData: Record<string, unknown>) => {
  return await addData('posts', {
    ...postData,
    timestamp: Date.now()
  });
};

export const getPosts = async () => {
  return await readData('posts');
};
