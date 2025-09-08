export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp?: number;
  photo: string;
};

export type UsersResponse = {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: { next_url: string | null; prev_url: string | null };
  users: User[];
};

export type SingleUserResponse = { success: boolean; user: User };

export type PositionsResponse = {
  success: boolean;
  positions: { id: number; name: string }[];
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File;
};
