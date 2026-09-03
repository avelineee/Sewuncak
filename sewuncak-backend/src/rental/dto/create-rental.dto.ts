import {
  IsInt,
  IsPositive,
  IsDateString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class RentalItemInputDto {
  @IsInt()
  @IsPositive()
  outfit_id: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}

export class CreateRentalDto {
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsDateString()
  rental_date: string;

  @IsDateString()
  return_date: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RentalItemInputDto)
  items: RentalItemInputDto[];
}