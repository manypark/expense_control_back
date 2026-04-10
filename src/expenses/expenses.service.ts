import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { FindExpensesQueryDto } from './dto/find-expenses-query.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query: FindExpensesQueryDto) {
    const where = this.buildWhere(userId, query);
    const hasPagination = query.limit != null || query.offset != null;

    if (!hasPagination) {
      return this.prisma.expense.findMany({
        where,
        orderBy: { incurredAt: 'desc' },
      });
    }

    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;
    const [items, total] = await this.prisma.$transaction([
      this.prisma.expense.findMany({
        where,
        orderBy: { incurredAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.expense.count({ where }),
    ]);

    return {
      items,
      total,
      limit,
      offset,
      hasMore: offset + items.length < total,
    };
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

  private buildWhere(
    userId: string,
    query: FindExpensesQueryDto,
  ): Prisma.ExpenseWhereInput {
    const where: Prisma.ExpenseWhereInput = { userId };

    if (query.category) {
      where.category = query.category;
    }

    if (query.from || query.to) {
      where.incurredAt = {
        gte: query.from ? new Date(query.from) : undefined,
        lte: query.to ? this.endOfDay(query.to) : undefined,
      };
    }

    return where;
  }

  private endOfDay(value: string) {
    const date = new Date(value);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  private async ensureExists(userId: string, id: string) {
    const item = await this.prisma.expense.findFirst({ where: { id, userId } });
    if (!item) {
      throw new NotFoundException('Gasto no encontrado');
    }
    return item;
  }
}
