import { Body, Controller, Inject, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Logger } from 'winston';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('winston') private logger: Logger,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() data: SignUpDTO) {
    return this.authService.login(data);
  }
  @Post('sign-up')
  async signup(@Body() data) {
    return this.authService.signup(data);
  }
  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data) {
    console.log(new Date().getTime());
    try {
      if (!data.jwt) {
        return false;
      }
      this.logger.info(JSON.stringify(data));
      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
