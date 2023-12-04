import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor( private prisma: PrismaService ) {}

    async createCategory( data: CategoryDto ) {
        const category = await this.prisma.category.create({ data });

        return { category };
    }
}
