import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BrandDto } from './dto';

@Injectable()
export class BrandService {
    constructor( private prisma: PrismaService ) {}

    async createBrand( data: BrandDto ) {
        const brand = await this.prisma.brand.create({ data });

        return { brand };
    }
}
