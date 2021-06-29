import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('prefixo')
export class AppController {
  //injecao de dependencia 
  constructor(private readonly appService: AppService) {}

  @Get('test') //rota GET /prefixo/test
  getHello(): string {
    return this.appService.getHello();
  }


}

