import { api } from "./client";

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string; // +380XXXXXXXXX
  position_id: number;
  photo: File; // jpeg/jpg ≤ 5MB, ≥ 70x70px
};

export const registerUser = async (payload: RegisterPayload, token: string) => {
  const form = new FormData();
  (Object.entries(payload) as [keyof RegisterPayload, any][]).forEach(
    ([k, v]) => {
      form.append(k, v);
    }
  );
  const { data } = await api.post("/users", form, {
    headers: { Token: token, "Content-Type": "multipart/form-data" },
  });
  return data as { success: boolean; user_id?: number; message: string };
};
