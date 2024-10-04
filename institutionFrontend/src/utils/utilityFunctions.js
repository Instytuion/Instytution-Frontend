export const getInitials = (email) => {
  if (!email) return "";
  return email.charAt(0).toUpperCase();
};

export const convert24T012Hour = (time) => {
  const [hour, minute, second] = time.split(':');
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${ampm}`;
};