import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(userId: string, dto: CreateAccountDto) {
    return this.prisma.account.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateAccountDto) {
    await this.ensureExists(userId, id);

    return this.prisma.account.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.ensureExists(userId, id);
    await this.prisma.account.delete({ where: { id } });
    return { deleted: true };
  }

  private async ensureExists(userId: string, id: string) {
    const item = await this.prisma.account.findFirst({ where: { id, userId } });
    if (!item) {
      throw new NotFoundException('Cuenta no encontrada');
    }
    return item;
  }
}
