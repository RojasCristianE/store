import {
    ForbiddenException,
    Injectable
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto: AuthDto) {
        try {
            const
                { nickName, password } = dto,
                passHash = await argon.hash(password),
                newUser = await this.prisma.user.create({ data: { nickName, passHash } });

            return this.signToken( newUser.id, newUser.nickName );
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new ForbiddenException("Email already exists");
            }

            throw error;
        }
    }

    async login(dto: AuthDto) {
        const
            { nickName, password } = dto,

            user = await this.prisma.user.findUnique( { where: { nickName } } ),

            { passHash, id } = user ?? { passHash: "", id: 0 },

            passValid = user && await argon.verify( passHash, password );

        if ( !user ?? !passValid ) throw new ForbiddenException( "Bad credentials" );

        return this.signToken( id, nickName );
    }

    async signToken( id: number, nickName: string ): Promise<{ token: String }> {
        const
            secret = this.config.get( "JWT_SECRET" ),
            payload = { id, nickName },
            token = await this.jwt.signAsync( payload, { secret } );

        return { token };
    }
}