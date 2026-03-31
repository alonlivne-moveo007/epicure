import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import qs from 'qs';
import { catchError, firstValueFrom } from 'rxjs';

/** Query string sent to Strapi; supports nested keys (e.g. populate) after Express parses the URL. */
export type StrapiQueryParams = Record<string, unknown>;

/**
 * Thin wrapper around Nest’s `HttpService` for paths relative to Strapi’s `/api` base URL.
 * Maps Axios failures to `HttpException` using the upstream status code and JSON body when present.
 */
@Injectable()
export class StrapiHttpService {
  constructor(private readonly http: HttpService) {}

  /** Strapi REST expects bracket notation from `qs` with `encodeValuesOnly` (see Strapi populate docs). */
  private static serializeQueryParams(params: StrapiQueryParams): string {
    return qs.stringify(params, { encodeValuesOnly: true });
  }

  private static hasQueryKeys(params?: StrapiQueryParams): boolean {
    return params !== undefined && Object.keys(params).length > 0;
  }

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
    const config = StrapiHttpService.hasQueryKeys(params)
      ? {
          params,
          paramsSerializer: StrapiHttpService.serializeQueryParams,
        }
      : {};
    return firstValueFrom(
      this.http.get<T>(path, config).pipe(
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
    const config = StrapiHttpService.hasQueryKeys(params)
      ? {
          params,
          paramsSerializer: StrapiHttpService.serializeQueryParams,
        }
      : {};
    return firstValueFrom(
      this.http.post<T>(path, body, config).pipe(
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
    const config = StrapiHttpService.hasQueryKeys(params)
      ? {
          params,
          paramsSerializer: StrapiHttpService.serializeQueryParams,
        }
      : {};
    return firstValueFrom(
      this.http.put<T>(path, body, config).pipe(
        catchError((error: AxiosError) => {
          StrapiHttpService.throwFromAxios(error);
        }),
      ),
    ).then((res) => res.data);
  }

  async delete<T>(path: string, params?: StrapiQueryParams): Promise<T> {
    const config = StrapiHttpService.hasQueryKeys(params)
      ? {
          params,
          paramsSerializer: StrapiHttpService.serializeQueryParams,
        }
      : {};
    return firstValueFrom(
      this.http.delete<T>(path, config).pipe(
        catchError((error: AxiosError) => {
          StrapiHttpService.throwFromAxios(error);
        }),
      ),
    ).then((res) => res.data);
  }
}
