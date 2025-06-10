import type { HttpHandler } from 'msw';

import { itemController } from './item.controller';

export const handlers: HttpHandler[] = [...itemController];
