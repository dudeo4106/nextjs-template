'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const ItemDetail = () => {
  const params = useParams();
  const itemId = params['id'];

  useEffect(() => {
    fetch(`/api/item/${itemId}`)
      .then((data) => {
        if (!data.ok) {
          console.error('not fount items');
          return;
        }
        console.log('success: ', data);
      })
      .catch((error) => {
        console.error('fail: ', error);
      });
  }, []);

  return (
    <div>
      <h1>Item {itemId}</h1>
    </div>
  );
};

export default ItemDetail;
