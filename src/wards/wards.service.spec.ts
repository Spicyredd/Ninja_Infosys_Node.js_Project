import { Test, TestingModule } from '@nestjs/testing';
import { WardsService } from './wards.service';
import { PrismaService } from '../prisma/prisma.service';
import { createMock } from '@golevelup/ts-jest';

describe('WardsService', () => {
  let service: WardsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WardsService,
        { provide: PrismaService, useValue: createMock<PrismaService>() },
      ]
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);

    service = module.get<WardsService>(WardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
