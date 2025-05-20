interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
];
