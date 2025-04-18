import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReturnDto, UpdateReturnDto } from './dto/return.dto';

@Injectable()
export class ReturnsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page, limit, status, search }: { page: number; limit: number; status?: string; search?: string }) {
    const skip = (page - 1) * limit;
    
    const where = {
      ...(status && { status }),
      ...(search && {
        OR: [
          { orderNumber: { contains: search } },
          { customerName: { contains: search } },
          { skuList: { has: search } },
        ],
      }),
    };

    const [items, total] = await Promise.all([
      this.prisma.return.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.return.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasNextPage: skip + limit < total,
    };
  }

  async create(createReturnDto: CreateReturnDto) {
    return this.prisma.return.create({
      data: {
        ...createReturnDto,
        status: 'IN_ATTESA',
      },
    });
  }

  async update(id: string, updateReturnDto: UpdateReturnDto) {
    return this.prisma.return.update({
      where: { id },
      data: updateReturnDto,
    });
  }

  async remove(id: string) {
    return this.prisma.return.delete({
      where: { id },
    });
  }

  async bulkUpdate(ids: string[], status: string) {
    return this.prisma.return.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        status,
      },
    });
  }
} 