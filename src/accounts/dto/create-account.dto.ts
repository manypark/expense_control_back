import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ example: 'hsbc_bank' })
  @IsString()
  code!: string;

  @ApiProperty({ example: 'HSBC' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 12000.5 })
  @IsNumber()
  @Min(0)
  balance!: number;
}
