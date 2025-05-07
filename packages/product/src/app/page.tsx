'use client';

import { useState } from 'react';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello world</h1>
      <h2>count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>button</button>
    </div>
  );
};

export default Home;
