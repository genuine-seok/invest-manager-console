import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};
