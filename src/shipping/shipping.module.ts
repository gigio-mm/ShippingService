import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [ShippingController],
  providers: [ShippingService, PrismaService],
})
export class ShippingModule {}
