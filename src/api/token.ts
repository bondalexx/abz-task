import { api } from "./client";

export const fetchToken = async (): Promise<string> => {
  const { data } = await api.post<{ success: boolean; token: string }>(
    "/token"
  );
  return data.token;
};
