const sanitizeUsername = (username: string): string => {
  // Remove any non-alphanumeric characters
  return username.replace(/[^a-zA-Z0-9]/g, "");
};

const appendRandomNumber = (username: string, length: number = 4): string => {
  const chars = "0123456789";
  let randomNumber = "";
  for (let i = 0; i < length; i++) {
    randomNumber += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return username + randomNumber;
};

export const generateDisplayName = (email: string): string => {
  const usernamePart = email.split("@")[0];
  const sanitizedUsername = sanitizeUsername(usernamePart);
  const capitalizedUsername =
    sanitizedUsername.charAt(0).toUpperCase() + sanitizedUsername.slice(1);

  // Optionally, append a random number to ensure uniqueness
  const uniqueUsername = appendRandomNumber(capitalizedUsername);

  return uniqueUsername;
};

export const generateId = (length: number): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const timestamp = Date.now().toString(36); // Base-36 timestamp to add uniqueness
  let id = timestamp;

  for (let i = 0; i < length - timestamp.length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
};
