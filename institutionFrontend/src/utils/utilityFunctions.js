export const getInitials = (email) => {
  if (!email) return "";
  return email.charAt(0).toUpperCase();
};