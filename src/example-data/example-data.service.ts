import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExampleDataService {
    constructor(private readonly prisma: PrismaService) { }

    async createExampleData() {
        const brandsData = [
            { name: 'Chanel' },
            { name: 'Dior' },
            { name: 'Louis Vuitton' },
            { name: 'Gucci' },
            { name: 'Prada' },
        ];

        await this.prisma.brand.createMany({
            data: brandsData,
            skipDuplicates: true,
        });

        const brands = await this.prisma.brand.findMany();

        const categoriesData = [
            { name: 'Perfume' },
            { name: 'Zapatos' },
            { name: 'Ropa' },
            { name: 'Bolsos' },
            { name: 'Accesorios' },
        ];

        await this.prisma.category.createMany({
            data: categoriesData,
            skipDuplicates: true,
        });

        const categories = await this.prisma.category.findMany();

        const realProducts = [
            'Chanel No. 5', 'Dior Sauvage', 'Louis Vuitton Speedy', 'Gucci Marmont',
            'Prada Nylon Bag', 'Nike Air Force 1', 'Adidas Superstar', 'Christian Louboutin Pigalle',
            'Levi\'s 501 Jeans', 'Burberry Trench Coat', 'Lululemon Align Leggings', 'Ray-Ban Aviator Sunglasses',
        ];

        const productsData = [];
        for (let i = 0; i < 20; i++) {
            const randomBrand = brands[ Math.floor(Math.random() * brands.length)] ;
            const randomCategory = categories[ Math.floor(Math.random() * categories.length) ];
            const randomProductName = realProducts[ Math.floor(Math.random() * realProducts.length) ];

            productsData.push({
                name: randomProductName,
                stock: Math.floor(Math.random() * 100),
                purchasePrice: parseFloat((Math.random() * 100).toFixed(2)),
                sellingPrice: parseFloat((Math.random() * 200).toFixed(2)),
                brandId: randomBrand.id,
                categoryId: randomCategory.id,
            });
        }

        await this.prisma.product.createMany({
            data: productsData,
            skipDuplicates: true,
        });

        const products = await this.prisma.product.findMany();

        const customersData = [
            { name: 'Ana García' },
            { name: 'Carlos Rodríguez' },
            { name: 'Laura Martínez' },
            { name: 'Juan Pérez' },
            { name: 'Sofía López' },
            { name: 'Diego González' },
            { name: 'María Fernández' },
            { name: 'Javier Díaz' },
            { name: 'Elena Ruiz' },
            { name: 'Andrés Sánchez' },
        ];

        await this.prisma.customer.createMany({
            data: customersData,
            skipDuplicates: true,
        });

        const customers = await this.prisma.customer.findMany();

        for (let i = 0; i < 10; i++) {
            const randomCustomer = customers[ Math.floor(Math.random() * customersData.length) ];

            const saleItems = [];
            for (let j = 0; j < 3; j++) {
                const randomProduct = products[ Math.floor(Math.random() * products.length) ];
                const quantity = Math.floor(Math.random() * 5) + 1;
                const unitPrice = randomProduct.sellingPrice || 0;

                const saleItem = {
                    quantity,
                    unitPrice,
                    totalPrice: quantity * unitPrice,
                    productId: randomProduct.id,
                };

                saleItems.push(saleItem);
            }

            await this.prisma.sale.create({
                data: {
                    date: new Date(),
                    customerId: randomCustomer.id,
                    saleItems: {
                        create: saleItems,
                    },
                }
                // skipDuplicates: true,
            });
            // const saleData = {
            //     date: new Date(),
            //     customerId: randomCustomer,
            //     saleItems: {
            //         create: saleItems,
            //     },
            // };

            // salesData.push(saleData);
        }

        // await this.prisma.sale.create({
        //     data: {
        //         date: new Date(),
        //         customerId: 1,
        //         saleItems: { create: [{ quantity: 1, unitPrice: 100, totalPrice: 100, productId: 1 }] }
        //     }
        // });
    }
}
