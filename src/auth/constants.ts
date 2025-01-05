import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
    secret: 'jechangeplustard',
  };

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
