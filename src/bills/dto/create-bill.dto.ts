import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class CreateBillDto {
  @ApiProperty({ example: 'Renta' })
  @IsString()
  title!: string;

  @ApiProperty({ example: '2026-03-05T00:00:00.000Z' })
  @IsDateString()
  dueDate!: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isPaid!: boolean;
}
