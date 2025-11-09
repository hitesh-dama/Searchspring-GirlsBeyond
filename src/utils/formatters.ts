export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const hasDiscount = (price: number, msrp?: number): boolean => {
  return msrp !== undefined && msrp > price;
};
