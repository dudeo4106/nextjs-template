'use client';

import { useEffect, useState } from 'react';

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/users/1')
      .then((data) => {
        console.log('success: ', data);
      })
      .catch((error) => {
        console.error('fail: ', error);
      });
  }, []);

  return (
    <div>
      <h1>Hello world</h1>
      <h2>count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>button</button>
    </div>
  );
};

export default Home;
