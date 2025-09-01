# Firebase Authentication Setup

## Enable Authentication in Firebase Console

1. Go to your Firebase Console: https://console.firebase.google.com/
2. Select your project (muizznwali)
3. Click on **"Authentication"** in the left sidebar
4. Click **"Get started"**
5. Go to the **"Sign-in method"** tab
6. Click on **"Email/Password"**
7. **Enable** the first toggle (Email/Password)
8. Click **"Save"**

## Update Database Security Rules (Important!)

Your Realtime Database is currently in test mode. You need to update the security rules:

1. Go to **"Realtime Database"** in the left sidebar
2. Click on the **"Rules"** tab
3. Replace the existing rules with:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "tasks": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

4. Click **"Publish"**

These rules ensure:
- Only authenticated users can access the database
- Users can only access their own data
- No user can see another user's tasks or profile

## Test Your Setup

After completing the above:

1. Visit: http://localhost:3001/todo
2. Create a new account
3. Create some tasks with different priorities
4. Test comments, task completion, and deletion
5. Sign out and sign back in to verify persistence

Your todo app is now secure and ready to use!
