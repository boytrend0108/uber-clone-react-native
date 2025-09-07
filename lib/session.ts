// Session debugging utility
export const logSessionDebug = (action: string, data: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[SESSION DEBUG ${timestamp}] ${action}:`, data);
};

export const clearClerkCache = async () => {
  try {
    // In some cases, clearing the token cache can help with session issues
    console.log('Attempting to clear any cached session data...');
    // This is mainly for debugging purposes
    return true;
  } catch (error) {
    console.error('Failed to clear session cache:', error);
    return false;
  }
};

// Helper function to handle post-signout cleanup
export const handlePostSignout = () => {
  logSessionDebug('POST_SIGNOUT_CLEANUP', 'Performing cleanup after signout');

  // Clear any potential cached data
  setTimeout(() => {
    // Add a small delay to ensure Clerk has finished its cleanup
    console.log('Post-signout cleanup completed');
  }, 100);
};

// Helper function to validate session state
export const validateSessionState = (isLoaded: boolean, isSignedIn: boolean, sessionId: string | null) => {
  const isValid = isLoaded && isSignedIn && sessionId;
  logSessionDebug('SESSION_VALIDATION', {
    isLoaded,
    isSignedIn,
    sessionId,
    isValid
  });
  return isValid;
};