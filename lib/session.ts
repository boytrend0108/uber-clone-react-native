export const logSessionDebug = (action: string, data: any) => {
  const timestamp = new Date().toISOString();
};

export const clearClerkCache = async () => {
  try {
    return true;
  } catch {
    return false;
  }
};

export const handlePostSignout = () => {
  setTimeout(() => {
    // Cleanup completed
  }, 100);
};

export const validateSessionState = (
  isLoaded: boolean,
  isSignedIn: boolean,
  sessionId: string | null
) => {
  const isValid = isLoaded && isSignedIn && sessionId;
  return isValid;
};

export const diagnoseOAuthIssue = (authResult: any) => {
  if (authResult?.authSessionResult?.type === 'dismiss') {
    return 'dismissed';
  }

  if (
    !authResult?.createdSessionId &&
    !authResult?.signIn?.createdSessionId &&
    !authResult?.signUp?.createdSessionId
  ) {
    return 'no_session';
  }

  if (authResult?.signIn?.status === 'needs_identifier') {
    return 'needs_identifier';
  }

  return 'unknown';
};
