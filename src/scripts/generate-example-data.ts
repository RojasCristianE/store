import { NestFactory } from '@nestjs/core';
import { ExampleDataService } from '../example-data/example-data.service';
import { AppModule } from '../app.module';

async function generateExampleData() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const exampleDataService = app.get(ExampleDataService);

    await exampleDataService.createExampleData();

    await app.close();
}

generateExampleData();
