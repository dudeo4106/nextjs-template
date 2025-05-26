'use client';

import { useEffect, useState } from 'react';

export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@packages/mock').then(({ worker }) => {
        worker.start().then(() => setReady(true));
      });
    }
  }, []);

  if (!ready) return <div>Loading mocks...</div>;

  return <>{children}</>;
}
