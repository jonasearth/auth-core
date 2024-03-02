import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ModulesEnum } from '../enums/modules.enum';

export class SignUpDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  userId: string;

  @IsEnum(ModulesEnum, { each: true })
  modules: ModulesEnum[];
}
