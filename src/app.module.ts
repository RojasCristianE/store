import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { SaleModule } from './sale/sale.module';
import { ExampleDataService } from './example-data/example-data.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        UserModule,
        AuthModule,
        PrismaModule,
        CustomerModule,
        BrandModule,
        ProductModule,
        CategoryModule,
        SaleModule,
    ],
    controllers: [],
    providers: [ExampleDataService],
})
export class AppModule { }
