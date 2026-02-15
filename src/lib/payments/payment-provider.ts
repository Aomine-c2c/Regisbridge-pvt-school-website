export interface PaymentProvider {
  name: string;
  initiatePayment(amount: number, currency: string, reference: string, payerInfo: any): Promise<PaymentResult>;
  verifyPayment(externalReference: string): Promise<PaymentResult>;
}

export interface PaymentResult {
  success: boolean;
  externalReference?: string;
  message?: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
}

export class PaymentGateway {
  private providers: Map<string, PaymentProvider> = new Map();

  registerProvider(id: string, provider: PaymentProvider) {
    this.providers.set(id, provider);
  }

  async process(providerId: string, amount: number, reference: string, payerInfo: any): Promise<PaymentResult> {
    const provider = this.providers.get(providerId);
    if (!provider) throw new Error(`Provider ${providerId} not found`);
    return provider.initiatePayment(amount, 'USD', reference, payerInfo);
  }
}
