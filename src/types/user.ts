export type UserLogin = {
  username: string;
  password: string;
  authToken?: string;
};

export type User = {
  id: number | string;
  name: string;
  authToken?: string;
};
