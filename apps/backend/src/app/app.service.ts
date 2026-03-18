import { ApiResponse } from '@epicure/backend-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): ApiResponse<{ message: string }> {
    return { data: { message: 'Hello API' } };
  }
}
