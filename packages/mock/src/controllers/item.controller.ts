import { HttpResponse, http } from 'msw';

import { items } from '../data/item.data';

export const itemController = [
  http.get('/api/items', () => {
    return HttpResponse.json(items);
  }),

  http.get('/api/items/:id', ({ params }) => {
    const item = items.find((i) => i.id === Number(params['id']));
    if (!item) {
      return new HttpResponse('User not found', { status: 404 });
    }
    return HttpResponse.json(item);
  }),

  http.post('/api/items', async () => {
    return HttpResponse.json({ status: 201 });
  }),
];
