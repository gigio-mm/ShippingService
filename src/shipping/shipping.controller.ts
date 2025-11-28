import { Controller, Post, Body } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { Shipping } from './entities/shipping.entity';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  create(@Body() createShippingDto: CreateShippingDto): Promise<Shipping> {
    return this.shippingService.calculateShipping(createShippingDto);
  }
}
