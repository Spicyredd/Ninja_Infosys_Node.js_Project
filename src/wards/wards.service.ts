import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Ward } from '@prisma/client';
@Injectable()
export class WardsService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<Ward[] | null> {
    /**
     * @returns All a list containing all the ward objects if available else return null
     */
    return this.prisma.ward.findMany();
  }
}