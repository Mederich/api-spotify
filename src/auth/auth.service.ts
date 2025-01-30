import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      // Vérification supplémentaire si l'utilisateur n'existe pas
      throw new UnauthorizedException('Error: Invalid username or password');
    }

    // Comparaison du mot de passe haché avec bcrypt
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Error: Invalid username or password');
    }

    const payload = {
      sub: user.userId,
      username: user.username,
      userId: user.userId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtSecret(),
      }),
    };
  }
  async register(
    username: string,
    password: string,
  ): Promise<{ message: string }> {
    // Vérifier si un utilisateur existe déjà avec ce username
    const existingUser = await this.usersService.findOneByUsername(username);

    if (existingUser) {
      throw new UnauthorizedException('Username doesn t respect the rules');
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur dans le UsersService
    await this.usersService.createUser({ username, password: hashedPassword });

    return { message: 'User registered successfully' };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret(),
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      return payload;
    } catch (e) {
      console.log('got error decoding the token:', e);
      throw new UnauthorizedException();
    }
  }

  async extractToken(authHeader: string): Promise<string> {
    const [type, token] = authHeader.split(' ') ?? [];
    console.log('type, token', type, token);
    return type === 'Bearer' ? token : undefined;
  }
}
