import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { Shipping } from './entities/shipping.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ShippingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  private getRegionPricing(state: string): { cost: number; days: number } {
    // Regra Local - Ceará
    if (state === 'CE') {
      return { cost: 0.0, days: 3 };
    }

    // Nordeste
    if (['AL', 'BA', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'].includes(state)) {
      return { cost: 20.0, days: 5 };
    }

    // Sudeste
    if (['ES', 'MG', 'RJ', 'SP'].includes(state)) {
      return { cost: 35.0, days: 7 };
    }

    // Sul
    if (['PR', 'RS', 'SC'].includes(state)) {
      return { cost: 45.0, days: 9 };
    }

    // Centro-Oeste
    if (['DF', 'GO', 'MT', 'MS'].includes(state)) {
      return { cost: 40.0, days: 8 };
    }

    // Norte
    if (['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'].includes(state)) {
      return { cost: 60.0, days: 12 };
    }

    // Fallback
    return { cost: 50.0, days: 10 };
  }

  async calculateShipping(dto: CreateShippingDto): Promise<Shipping> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://brasilapi.com.br/api/cep/v1/${dto.cep}`),
      );

      const { state } = response.data;

      const { cost, days } = this.getRegionPricing(state);

      await this.prisma.shippingLog.create({
        data: {
          cep: dto.cep,
          state,
          shippingCost: cost,
          deliveryDays: days,
        },
      });

      return new Shipping(dto.cep, state, cost, days, dto.product);
    } catch (error) {
      throw new BadRequestException(
        'CEP inválido ou não encontrado',
      );
    }
  }

  async getHistory() {
    return this.prisma.shippingLog.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
