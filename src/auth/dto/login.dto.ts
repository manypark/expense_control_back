import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'manu@mail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 6, example: '123456' })
  @IsString()
  @MinLength(6)
  password!: string;
}
