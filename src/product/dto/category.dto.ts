import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    categoryId: number;

    @IsInt()
    @IsOptional()
    stock: number;

    @IsNumber()
    @IsOptional()
    purchasePrice?: number;

    @IsNumber()
    @IsOptional()
    sellingPrice?: number;
}