import { JwtInterceptor } from "./jwt.interceptor";

export const interceptors = [
  JwtInterceptor
];

export * from './jwt.interceptor';
