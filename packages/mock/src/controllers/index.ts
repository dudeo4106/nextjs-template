import type { HttpHandler } from 'msw';
import { userHandlers } from './user.controller';

export const handlers: HttpHandler[] = [...userHandlers];
