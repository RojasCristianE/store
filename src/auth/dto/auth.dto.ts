import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    nickName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}