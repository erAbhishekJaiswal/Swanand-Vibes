// authService.js
export function loginUser(data) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("userId", data.user.id);
  localStorage.setItem("login_time", Date.now()); // 🔐 Store login time
}

export function logoutUser() {
  localStorage.clear();
}

export function getUserRole() {
  return localStorage.getItem("role");
}

// export function isAuthenticated() {
//   return !!localStorage.getItem("accessToken");
// }

export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  const loginTime = localStorage.getItem("login_time");

  if (!token || !loginTime) return false;

  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  // 🔐 Expire session after 1 day
  if (now - loginTime > ONE_DAY) {
    logoutUser();
    return false;
  }

  return true;
};

export function getUserId() {
  return localStorage.getItem("userId");
}