import { api } from "./client";
import type { PositionsResponse } from "../types/api";

export const fetchPositions = async () => {
  const { data } = await api.get<PositionsResponse>("/positions");
  return data;
};
