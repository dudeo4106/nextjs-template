'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { getItem } from '@/libs/apis/items';

const ItemDetail = () => {
  const params = useParams();
  const itemId = params['id'];

  useEffect(() => {
    if (!itemId || typeof itemId !== 'string') {
      return;
    }

    const fetchItem = async () => {
      try {
        const item = await getItem(itemId);
        console.log('success:', item);
      } catch (error) {
        console.error('fail: ', error);
      }
    };

    fetchItem();
  }, [itemId]);

  return (
    <div>
      <h1>Item {itemId}</h1>
    </div>
  );
};

export default ItemDetail;
