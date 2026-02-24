import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: 'Tarjeta principal' })
  @IsString()
  alias!: string;

  @ApiProperty({ example: 'HSBC' })
  @IsString()
  bank!: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  @Length(4, 4)
  last4!: string;

  @ApiProperty({ example: 25 })
  @IsInt()
  @Min(1)
  @Max(31)
  closingDay!: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  @Max(31)
  dueDay!: number;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @Min(0)
  creditLimit!: number;
}
