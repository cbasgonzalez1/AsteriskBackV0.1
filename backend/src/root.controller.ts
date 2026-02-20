import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  root() {
    return {
      ok: true,
      message: 'Nest backend activo',
      endpoints: ['/api/cdr'],
    };
  }
}

