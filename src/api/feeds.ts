import { client } from '../utils/httpClient';
import { Feed } from '../types/Feed';

export const getFeeds = (userId: number) => {
  return client.get<Feed[]>(`/posts?userId=${userId}`);
};

export const getFeed = (feedId: number) => {
  return client.get<Feed>(`/posts/${feedId}`);
};

export const addFeed = ({ userId, title, body}: Omit<Feed, 'id'>) => {
  return client.post<Feed>('/posts', { userId, title, body});
};

export const deleteFeed = (feedId: number) => {
  return client.delete(`/posts/${feedId}`);
};

