import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Logger } from 'winston';
import { SignUpDTO } from './dto/signUp.dto';
import { ResponseDTO } from '../helpers/dto/response.dto';
import { ErrorEnum } from 'src/helpers/enums/error.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async login({ userId, password }: any) {
    try {
      const authResponse = await this.authRepository.findOne({
        where: { userId, deletedAt: null },
      });
      if (authResponse) {
        if (!bcrypt.compareSync(password, authResponse.password)) {
          return this.jwtService.sign({
            userId,
            modules: authResponse.modules,
          });
        }
      }
      return { message: 'Logged in' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async signup({ userId, password, modules }: SignUpDTO) {
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);

      const auth = this.authRepository.create({
        userId,
        password: hashedPassword,
        modules,
      });
      await this.authRepository.save(auth);
      return new ResponseDTO({ message: 'Auth Created!' });
    } catch (error) {
      this.logger.error(error);
      return new ResponseDTO(null, false, ErrorEnum.UNEXPECTED_ERROR);
    }
  }
}
