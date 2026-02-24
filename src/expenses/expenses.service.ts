import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.expense.findMany({
      where: { userId },
      orderBy: { incurredAt: 'desc' },
    });
  }

  create(userId: string, dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        ...dto,
        incurredAt: new Date(dto.incurredAt),
        userId,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateExpenseDto) {
    await this.ensureExists(userId, id);

    return this.prisma.expense.update({
      where: { id },
      data: {
        ...dto,
        incurredAt: dto.incurredAt ? new Date(dto.incurredAt) : undefined,
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.ensureExists(userId, id);
    await this.prisma.expense.delete({ where: { id } });
    return { deleted: true };
  }

  private async ensureExists(userId: string, id: string) {
    const item = await this.prisma.expense.findFirst({ where: { id, userId } });
    if (!item) {
      throw new NotFoundException('Gasto no encontrado');
    }
    return item;
  }
}
