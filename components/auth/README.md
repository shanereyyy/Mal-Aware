# Authentication Functions

This folder contains reusable Firebase authentication functions that have been separated from the UI components for better maintainability and reusability.

## Functions

### `signIn(email: string, password: string)`

Signs in a user with email and password.

- **Returns**: `Promise<{ success: boolean; user?: User; error?: string }>`
- **Usage**: Used in login forms

### `signUp(email: string, password: string)`

Creates a new user account with email and password.

- **Returns**: `Promise<{ success: boolean; user?: User; error?: string }>`
- **Usage**: Used in registration forms

### `signOutUser()`

Signs out the current user.

- **Returns**: `Promise<{ success: boolean; error?: string }>`
- **Usage**: Used in logout functionality

### `setupAuthStateListener(onUserChange, onLoadingChange, onError?)`

Sets up Firebase auth state listener.

- **Parameters**:
  - `onUserChange`: Callback when user state changes
  - `onLoadingChange`: Callback when loading state changes
  - `onError`: Optional error callback
- **Returns**: Unsubscribe function
- **Usage**: Used in the `useAuth` hook

### `getCurrentUser()`

Gets the currently authenticated user.

- **Returns**: `User | null`
- **Usage**: Quick access to current user

### `isAuthenticated()`

Checks if a user is currently authenticated.

- **Returns**: `boolean`
- **Usage**: Quick authentication check

## Error Handling

All functions include comprehensive error handling with user-friendly error messages for common Firebase authentication errors:

- Invalid email/password
- User not found
- Email already in use
- Weak password
- Too many failed attempts
- Network errors

## Usage Example

```typescript
import { signIn, signUp, signOutUser } from "@/components/auth";

// Sign in
const result = await signIn(email, password);
if (result.success) {
  // Navigate to main app
} else {
  // Show error message
  Alert.alert("Error", result.error);
}

// Sign up
const result = await signUp(email, password);
if (result.success) {
  // Navigate to main app
} else {
  // Show error message
  Alert.alert("Error", result.error);
}

// Sign out
const result = await signOutUser();
if (!result.success) {
  Alert.alert("Error", result.error);
}
```

## Benefits of This Structure

1. **Separation of Concerns**: Authentication logic is separated from UI components
2. **Reusability**: Functions can be used across different components
3. **Maintainability**: Centralized authentication logic is easier to maintain
4. **Error Handling**: Consistent error handling across the app
5. **Testing**: Authentication functions can be easily unit tested
6. **Type Safety**: Full TypeScript support with proper return types
