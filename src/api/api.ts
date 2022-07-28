import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});
export const postsAPI = {
  getUsers() {
    return instance.get<UserType[]>('posts');
  },
};

export type UserType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
