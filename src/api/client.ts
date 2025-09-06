import axios from "axios";

export const api = axios.create({
  baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1",
  headers: { Accept: "application/json" },
});
