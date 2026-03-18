import type { ApiResponse } from '@epicure/backend-types';

export async function GET() {
  const body: ApiResponse<{ message: string }> = {
    data: { message: 'Hello, from API!' },
  };
  return Response.json(body);
}
