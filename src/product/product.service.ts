import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor( private prisma: PrismaService ) {}

    async createProduct( data: ProductDto ) {
        const product = await this.prisma.product.create({ data });

        return { product };
    }
}
