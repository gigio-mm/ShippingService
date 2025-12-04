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

  async calculateShipping(dto: CreateShippingDto): Promise<Shipping> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://brasilapi.com.br/api/cep/v1/${dto.cep}`),
      );

      const { state } = response.data;

      const isCeara = state === 'CE';
      const shippingCost = isCeara ? 0.0 : 50.0;
      const deliveryDays = isCeara ? 3 : 10;

      await this.prisma.shippingLog.create({
        data: {
          cep: dto.cep,
          state,
          shippingCost,
          deliveryDays,
        },
      });

      return new Shipping(dto.cep, state, shippingCost, deliveryDays, dto.product);
    } catch (error) {
      throw new BadRequestException(
        'CEP inválido ou não encontrado',
      );
    }
  }
}
