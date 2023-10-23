import { client } from '../utils/httpClient';
import { Comment } from '../types/Comment';

export const getComments = (feedId: number) => {
  return client.get<Comment[]>(`/comments?postId=${feedId}`);
};
