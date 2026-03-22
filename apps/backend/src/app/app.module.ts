import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChefController } from '../controllers/chef.controller';
import { DishController } from '../controllers/dish.controller';
import { RestaurantController } from '../controllers/restaurant.controller';
import { TagController } from '../controllers/tag.controller';
import { ChefService } from '../services/chef.service';
import { DishService } from '../services/dish.service';
import { RestaurantService } from '../services/restaurant.service';
import { TagService } from '../services/tag.service';
import { StrapiHttpService } from '../services/strapi-http.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/backend/.env'],
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const cmsUrl = config
          .get<string>('CMS_URL', 'http://localhost:1337')
          .replace(/\/$/, '');
        const token = config.get<string>('STRAPI_API_TOKEN')?.trim();
        const baseURL = `${cmsUrl}/api`;
        if (process.env.STRAPI_HTTP_DEBUG === 'true') {
          // Never log the token — only whether one is configured.
          console.log('[Strapi HttpModule]', {
            baseURL,
            hasToken: Boolean(token),
            tokenLength: token?.length ?? 0,
          });
        }
        return {
          baseURL,
          ...(token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {}),
          timeout: 15_000,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [
    DishController,
    RestaurantController,
    ChefController,
    TagController,
  ],
  providers: [
    StrapiHttpService,
    DishService,
    RestaurantService,
    ChefService,
    TagService,
  ],
})
/**
 * Root module: a thin backend-for-frontend over Strapi’s REST API.
 *
 * - `ConfigModule` loads `apps/backend/.env` (see `.env.example`).
 * - `CMS_URL` – Strapi origin without a trailing slash; HTTP client base URL is `{CMS_URL}/api`.
 * - `STRAPI_API_TOKEN` – Optional bearer token for authenticated Strapi requests (omit for public-only APIs).
 * - `STRAPI_HTTP_DEBUG` – Set to `true` to log base URL and token presence (never logs the secret).
 */
export class AppModule {}
