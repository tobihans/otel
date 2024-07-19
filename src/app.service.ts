import { Injectable, Logger } from '@nestjs/common';
import { TraceService } from 'nestjs-otel';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly traceService: TraceService) {}

  getHello(): string {
    this.logger.log('hello was accessed');
    const currentSpan = this.traceService.getSpan(); // --> retrives current span, comes from http or @Span
    console.log('current span is', currentSpan);
    this.logger.log('current span is', currentSpan);
    currentSpan.addEvent('event 1');
    currentSpan.end(); // current span end

    const span = this.traceService.startSpan('sub_span'); // start new span
    span.setAttributes({ userId: 1 });
    this.logger.log('sub span is', span);
    span.end();
    return 'Hello World!';
  }
}
