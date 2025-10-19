export const response = (success, statusCode, message, data = null) => {
  return {
    success,
    statusCode,
    message,
    data,
  };
};