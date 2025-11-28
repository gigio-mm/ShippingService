export class Shipping {
  cep: string;
  product?: string;
  state: string;
  shippingCost: number;
  deliveryDays: number;

  constructor(
    cep: string,
    state: string,
    shippingCost: number,
    deliveryDays: number,
    product?: string,
  ) {
    this.cep = cep;
    this.state = state;
    this.shippingCost = shippingCost;
    this.deliveryDays = deliveryDays;
    this.product = product;
  }
}
