import { Injectable, Logger } from '@nestjs/common';
import { TraceService } from 'nestjs-otel';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly traceService: TraceService) {}

  getHello(): string {
    this.logger.log('hello was accessed');
    return 'Hello World!';
  }
}
