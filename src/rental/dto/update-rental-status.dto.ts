import { IsEnum } from 'class-validator';

export enum RentalStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  RENTED = 'RENTED',
  RETURNED = 'RETURNED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class UpdateRentalStatusDto {
  @IsEnum(RentalStatus)
  status: RentalStatus;
}