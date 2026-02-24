import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.creditCard.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(userId: string, dto: CreateCardDto) {
    return this.prisma.creditCard.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateCardDto) {
    await this.ensureExists(userId, id);

    return this.prisma.creditCard.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.ensureExists(userId, id);
    await this.prisma.creditCard.delete({ where: { id } });
    return { deleted: true };
  }

  private async ensureExists(userId: string, id: string) {
    const item = await this.prisma.creditCard.findFirst({
      where: { id, userId },
    });
    if (!item) {
      throw new NotFoundException('Tarjeta no encontrada');
    }
    return item;
  }
}
