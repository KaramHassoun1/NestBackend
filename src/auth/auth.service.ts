import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
  async login(AuthLoginDto: AuthLoginDto) {
    const user = await this.validateUser(AuthLoginDto);
    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
  async validateUser(AuthLoginDto: AuthLoginDto) {
    const user = await this.usersService.findByEmail(AuthLoginDto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await user.validatePassword(AuthLoginDto.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}
