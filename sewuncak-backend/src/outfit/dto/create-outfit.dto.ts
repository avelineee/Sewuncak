import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  Min,
  IsOptional,
  IsUrl,
  IsEnum,
} from 'class-validator';

export enum OutfitCategory {
  JACKET = 'JACKET',
  PANTS = 'PANTS',
  SHOES = 'SHOES',
  BAG = 'BAG',
  ACCESSORIES = 'ACCESSORIES',
}

export enum OutfitStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  MAINTENANCE = 'MAINTENANCE',
}

export class CreateOutfitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsInt()
  @IsPositive()
  price_per_day: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsEnum(OutfitStatus)
  @IsOptional()
  status?: OutfitStatus;
}
