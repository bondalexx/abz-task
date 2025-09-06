import { api } from "./client";
import type { UsersResponse, SingleUserResponse } from "../types/api";

export const fetchUsers = async (page = 1, count = 6) => {
  const { data } = await api.get<UsersResponse>(`/users`, {
    params: { page, count },
  });
  return data;
};

export const fetchUserById = async (id: number) => {
  const { data } = await api.get<SingleUserResponse>(`/users/${id}`);
  return data;
};
