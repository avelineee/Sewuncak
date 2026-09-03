import { IsString, IsNotEmpty } from 'class-validator';

export enum RentalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  RENTED = 'RENTED',
  RETURNED = 'RETURNED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class UpdateRentalStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}