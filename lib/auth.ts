/**
 * Authentication utility functions
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;


/**
 * Get the auth token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

/**
 * Save the auth token to localStorage
 */
export function setAuthToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
}

/**
 * Get the current user from localStorage
 */
export function getCurrentUser(): any {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("currentUser");
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

/**
 * Save the current user to localStorage
 */
export function setCurrentUser(user: any): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}

/**
 * Clear all auth data from localStorage
 */
export function clearAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
}

/**
 * Verify if the current token is valid
 */
export async function verifyToken(token?: string): Promise<boolean> {
  const authToken = token || getAuthToken();
  if (!authToken) return false;

  try {
    const response = await fetch(`${API_BASE}/auth/token/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ token: authToken }),
    });

    return response.ok;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

/**
 * Refresh the auth token
 */
export async function refreshToken(token?: string): Promise<string | null> {
  const authToken = token || getAuthToken();
  if (!authToken) return null;

  try {
    const response = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authToken }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const newToken = data.access || data.token || data.access_token;

    if (newToken) {
      setAuthToken(newToken);
      return newToken;
    }

    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

/**
 * Make an authenticated API call
 * Automatically includes the auth token in headers
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  
  // If 401, try to refresh token and retry once
  if (response.status === 401 && token) {
    const newToken = await refreshToken(token);
    if (newToken) {
      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      };
      return fetch(url, {
        ...options,
        headers: retryHeaders,
      });
    } else {
      // Token refresh failed, clear auth
      clearAuth();
    }
  }

  return response;
}
