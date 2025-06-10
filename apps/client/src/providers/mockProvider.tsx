'use client';

import { type ReactNode, useEffect, useState } from 'react';

const MockProvider = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // TODO: Check if being used only for dev env.
    (async () => {
      const { worker } = await import('@packages/mock');
      await worker.start();
      setReady(true);
    })();
  }, []);

  return ready ? <>{children}</> : null;
};

export default MockProvider;
