// authService.js
export function loginUser(data) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("userId", data.user.id);
}

export function logoutUser() {
  localStorage.clear();
}

export function getUserRole() {
  return localStorage.getItem("role");
}

export function isAuthenticated() {
  return !!localStorage.getItem("accessToken");
}

export function getUserId() {
  return localStorage.getItem("userId");
}