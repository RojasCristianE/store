import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    brandId: number;
}