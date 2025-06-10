import { fetchWrapper } from '../fetchWrapper';

interface Item {
  id: number;
  name: string;
  price: number;
}

// TODO: Consider how to strcture generic
const BASE_URL = '/api/items';

export const getItems = async (): Promise<Item[] | null> => {
  try {
    const { data } = await fetchWrapper<null, Item[]>({
      endpoint: `${BASE_URL}`,
      method: 'GET',
      body: null,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getItem = async (id: string): Promise<Item | null> => {
  try {
    const { data } = await fetchWrapper<null, Item>({
      endpoint: `${BASE_URL}/${id}`,
      method: 'GET',
      body: null,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createItem = async (item: {
  name: string;
  price: number;
}): Promise<null> => {
  const { data } = await fetchWrapper<{ name: string; price: number }, null>({
    endpoint: '/api/items',
    method: 'POST',
    body: item,
  });

  return data;
};
