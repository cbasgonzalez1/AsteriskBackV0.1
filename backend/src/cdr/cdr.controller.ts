import { Controller, Get, Query } from '@nestjs/common';
import { CdrService } from './cdr.service';

@Controller('api/cdr')
export class CdrController {
  constructor(private readonly service: CdrService) {}

  @Get()
  async getCdr(@Query('limit') limit?: string) {
    const n = Math.min(Math.max(Number(limit ?? 50), 1), 500);
    return this.service.list(n);
  }
}
