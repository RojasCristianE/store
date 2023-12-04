import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards( JwtGuard )
@Controller( 'categories' )
export class CategoryController {
    constructor ( private categoryService: CategoryService ) { }

    @Post()
    createCategory( @Body() dto: CategoryDto ) {
        return this.categoryService.createCategory( dto );
    }
}
