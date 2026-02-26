import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Supermercado' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Despensa semanal' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'Alimentos' })
  @IsString()
  category!: string;

  @ApiProperty({ example: 1200.5 })
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({ example: '2026-02-24T00:00:00.000Z' })
  @IsDateString()
  incurredAt!: string;

  @ApiProperty({ example: 2026 })
  @IsInt()
  statementYear!: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  statementMonth!: number;

  @ApiProperty({ required: false, example: 'uuid-card-id' })
  @IsOptional()
  @IsUUID()
  creditCardId?: string;
}
