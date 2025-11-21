export interface Car {
  id: number;
  brand: string;
  model: string;
  type: 'SUV' | 'Sedan' | 'Hatchback' | 'Luxury' | 'Sport' | 'Pickup';
  transmission: 'Otomatik' | 'Manuel';
  fuel: 'Benzin' | 'Dizel' | 'Hibrit' | 'Elektrik';
  price: number;
  image: string;
  seats: number;
  features: string[];
  isAvailable: boolean;
}