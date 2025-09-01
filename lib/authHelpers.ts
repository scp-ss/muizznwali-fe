import { auth, database } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User,
  updateProfile
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  createdAt: number;
}

// Create new user account
export const createAccount = async (email: string, password: string, displayName: string) => {
  try {
    // Create the user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's display name
    await updateProfile(user, { displayName });
    
    // Save user profile to database
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || email,
      displayName,
      createdAt: Date.now()
    };
    
    await set(ref(database, `users/${user.uid}`), userProfile);
    
    console.log('User account created successfully');
    return { success: true, user };
  } catch (error: unknown) {
    console.error('Error creating account:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Sign in existing user
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in successfully');
    return { success: true, user: userCredential.user };
  } catch (error: unknown) {
    console.error('Error signing in:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
    return { success: true };
  } catch (error: unknown) {
    console.error('Error signing out:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Get user profile from database
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const snapshot = await get(ref(database, `users/${uid}`));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Helper to get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
