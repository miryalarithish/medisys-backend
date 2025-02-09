import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function server() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

server()
  .then(() => console.log('running server on port 3000...........'))
  .catch(console.error);
