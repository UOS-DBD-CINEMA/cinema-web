type Discount = {
  id: number;
  discountType: string;
  discountRate: number;
  discountAmount: number;
};

export type Payment = {
  id: number;
  ticketId: number;
  paymentType: string;
  paymentDate: string;
  paymentStatus: string;
  paymentPoint: number;
  price: number;
  approvalId: string;
  discounts: Discount[];
};
