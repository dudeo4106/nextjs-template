import { setupWorker } from 'msw/browser';

import { handlers } from './controllers';

export const worker = setupWorker(...handlers);
