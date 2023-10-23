import { client } from '../utils/httpClient';

export const getUser = (username: string) => {
  return client.get(`/users?username=${username}`);
};