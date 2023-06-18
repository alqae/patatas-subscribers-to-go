import { HttpErrorInterceptor } from "./http-error.interceptor";
import { JwtInterceptor } from "./jwt.interceptor";

export const interceptors = [
  JwtInterceptor,
  HttpErrorInterceptor,
];

export * from './jwt.interceptor';
export * from './http-error.interceptor';
