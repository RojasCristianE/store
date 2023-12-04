import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BrandService } from './brand.service';
import { BrandDto } from './dto';

@UseGuards( JwtGuard )
@Controller('brands')
export class BrandController {
    constructor( private brandService: BrandService ) {}

    @Post()
    createBrand( @Body() dto: BrandDto ) {
        return this.brandService.createBrand( dto );
    }
}
