'use client';

import { createItem, getItems } from '@/libs/apis/items';
import { useEffect, useState } from 'react';

const Items = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItems();
        console.log('success: ', items);
      } catch (error) {
        console.error('fail: ', error);
      }
    };

    fetchItems();
  }, []);

  const handleCreate = async () => {
    try {
      const newItem = await createItem({
        name: `item-${Date.now()}`,
        price: 1000 + Math.floor(Math.random() * 1000),
      });
      console.log('POST success: ', newItem);
    } catch (error) {
      console.error('POST fail: ', error);
    }
  };

  return (
    <div>
      <h1>Items Page</h1>
      <h2>count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>button</button>
      <button onClick={handleCreate}>Create Item</button>
    </div>
  );
};

export default Items;
