import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Injectable()
export class BillsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.recurringService.findMany({
      where: { userId },
      orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }],
    });
  }

  create(userId: string, dto: CreateBillDto) {
    return this.prisma.recurringService.create({
      data: {
        title: dto.title,
        dueDate: new Date(dto.dueDate),
        isPaid: dto.isPaid,
        userId,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateBillDto) {
    await this.ensureExists(userId, id);

    return this.prisma.recurringService.update({
      where: { id },
      data: {
        title: dto.title,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        isPaid: dto.isPaid,
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.ensureExists(userId, id);
    await this.prisma.recurringService.delete({ where: { id } });
    return { deleted: true };
  }

  private async ensureExists(userId: string, id: string) {
    const item = await this.prisma.recurringService.findFirst({
      where: { id, userId },
    });

    if (!item) {
      throw new NotFoundException('Servicio no encontrado');
    }

    return item;
  }
}
