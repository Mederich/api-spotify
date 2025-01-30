import { SetMetadata } from '@nestjs/common';

export const jwtSecret = () => {
  return process.env.SECRET_KEY;
};

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
