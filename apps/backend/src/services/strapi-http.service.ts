import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

type StrapiQueryParams = Record<
  string,
  string | number | boolean | string[] | undefined
>;

/**
 * Thin wrapper around Nest’s `HttpService` for paths relative to Strapi’s `/api` base URL.
 * Maps Axios failures to `HttpException` using the upstream status code and JSON body when present.
 */
@Injectable()
export class StrapiHttpService {
  constructor(private readonly http: HttpService) {}

  /** Converts an Axios error into a Nest HTTP exception (502 if no response status). */
  private static throwFromAxios(error: AxiosError): never {
    const status = error.response?.status ?? HttpStatus.BAD_GATEWAY;
    const body = error.response?.data;
    throw new HttpException(
      typeof body === 'object' && body !== null
        ? body
        : { message: error.message },
      status,
    );
  }

  async get<T>(path: string, params?: StrapiQueryParams): Promise<T> {
    return firstValueFrom(
      this.http.get<T>(path, { params }).pipe(
        catchError((error: AxiosError) => {
          StrapiHttpService.throwFromAxios(error);
        }),
      ),
    ).then((res) => res.data);
  }

  async post<T>(
    path: string,
    body: unknown,
    params?: StrapiQueryParams,
  ): Promise<T> {
    return firstValueFrom(
      this.http.post<T>(path, body, { params }).pipe(
        catchError((error: AxiosError) => {
          StrapiHttpService.throwFromAxios(error);
        }),
      ),
    ).then((res) => res.data);
  }

  async put<T>(
    path: string,
    body: unknown,
    params?: StrapiQueryParams,
  ): Promise<T> {
    return firstValueFrom(
      this.http.put<T>(path, body, { params }).pipe(
        catchError((error: AxiosError) => {
          StrapiHttpService.throwFromAxios(error);
        }),
      ),
    ).then((res) => res.data);
  }

  async delete<T>(path: string, params?: StrapiQueryParams): Promise<T> {
    return firstValueFrom(
      this.http.delete<T>(path, { params }).pipe(
        catchError((error: AxiosError) => {
          StrapiHttpService.throwFromAxios(error);
        }),
      ),
    ).then((res) => res.data);
  }
}
