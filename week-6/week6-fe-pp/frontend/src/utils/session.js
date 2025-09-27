// utils/session.js
export const setSessionUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getSessionUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeSessionUser = () => {
  sessionStorage.removeItem("user");
};
