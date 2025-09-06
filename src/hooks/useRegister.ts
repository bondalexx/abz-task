import { useMutation } from "@tanstack/react-query";
import { registerUser, type RegisterPayload } from "../api/register";
import { fetchToken } from "../api/token";

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const token = await fetchToken();
      return registerUser(payload, token);
    },
  });
}
