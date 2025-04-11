import { UUID } from 'crypto';

export class AuthToken {
  exp: number;
  iat: number;
  userId: UUID;
}
