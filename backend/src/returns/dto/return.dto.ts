import { IsString, IsArray, IsDate, IsOptional, IsEnum } from 'class-validator';

export type ReturnStatus = 'IN_ATTESA' | 'APPROVATO' | 'RIFIUTATO' | 'COMPLETATO';

export class CreateReturnDto {
  @IsString()
  event: string;

  @IsString()
  orderNumber: string;

  @IsDate()
  confirmDate: Date;

  @IsString()
  customerName: string;

  @IsArray()
  @IsString({ each: true })
  skuList: string[];

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateReturnDto {
  @IsOptional()
  @IsString()
  event?: string;

  @IsOptional()
  @IsString()
  orderNumber?: string;

  @IsOptional()
  @IsDate()
  confirmDate?: Date;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skuList?: string[];

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(['IN_ATTESA', 'APPROVATO', 'RIFIUTATO', 'COMPLETATO'])
  status?: ReturnStatus;
} 