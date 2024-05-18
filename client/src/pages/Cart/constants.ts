export enum PaymentEnum {
  PayOS = 1,
  Cash = 2,
}

export enum ShippingEnum {
  Standard = 1,
  Express = 2,
}

export const ShippingCost: { [key in ShippingEnum]: number } = {
  [ShippingEnum.Standard]: 15000,
  [ShippingEnum.Express]: 30000,
};

export const fakePaymentLink = 'https://pay.payos.vn/web/14b040a6294a4099bf80493bf3d44015';
