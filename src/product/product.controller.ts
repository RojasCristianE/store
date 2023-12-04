import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ProductService } from './product.service';
import { ProductDto } from './dto';

@UseGuards( JwtGuard)
@Controller('products')
export class ProductController {
    constructor( private productService: ProductService ) {}

    @Post()
    createProduct( @Body() dto: ProductDto ) {
        return this.productService.createProduct( dto );
    }
}
