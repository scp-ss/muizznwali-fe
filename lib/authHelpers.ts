import { auth, database } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User,
  updateProfile,
  sendPasswordResetEmail
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
  if (typeof window === 'undefined' || !auth || !database) {
    return { success: false, error: 'Firebase not available or not properly initialized' };
  }
  
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
  if (typeof window === 'undefined' || !auth) {
    return { success: false, error: 'Firebase not available or not properly initialized' };
  }
  
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
  if (typeof window === 'undefined' || !auth) {
    return { success: false, error: 'Firebase not available or not properly initialized' };
  }
  
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
  if (typeof window === 'undefined' || !database) {
    return null;
  }
  
  try {
    const snapshot = await get(ref(database, `users/${uid}`));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Reset user password
export const resetPassword = async (email: string) => {
  if (typeof window === 'undefined' || !auth) {
    return { success: false, error: 'Firebase not available or not properly initialized' };
  }
  
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent successfully');
    return { success: true };
  } catch (error: unknown) {
    console.error('Error sending password reset email:', error);
    let errorMessage = 'Unknown error';
    
    if (error instanceof Error) {
      // Handle specific Firebase Auth error codes
      if (error.message.includes('auth/user-not-found')) {
        errorMessage = 'No account found with this email address.';
      } else if (error.message.includes('auth/invalid-email')) {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.message.includes('auth/too-many-requests')) {
        errorMessage = 'Too many requests. Please try again later.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return { success: false, error: errorMessage };
  }
};

// Helper to get current user
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined' || !auth) {
    return null;
  }
  return auth.currentUser;
};
