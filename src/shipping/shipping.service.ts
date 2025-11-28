import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateShippingDto } from './dto/create-shipping.dto';

@Injectable()
export class ShippingService {
  constructor(private readonly httpService: HttpService) {}

  async calculateShipping(dto: CreateShippingDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://brasilapi.com.br/api/cep/v1/${dto.cep}`),
      );

      const { state } = response.data;

      const isCeara = state === 'CE';
      const shippingCost = isCeara ? 0.0 : 50.0;
      const deliveryDays = isCeara ? 3 : 10;

      return {
        cep: dto.cep,
        product: dto.product,
        state,
        shippingCost,
        deliveryDays,
      };
    } catch (error) {
      throw new BadRequestException(
        'CEP inválido ou não encontrado',
      );
    }
  }
}
