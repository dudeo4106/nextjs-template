import { HttpResponse, http } from 'msw';

import { users } from '../data/user.data';

export const userHandlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(users);
  }),

  http.get('/api/users/:id', ({ params }) => {
    const user = users.find((u) => u.id === Number(params['id']));
    if (!user) {
      return new HttpResponse('User not found', { status: 404 });
    }
    return HttpResponse.json(user);
  }),
];
