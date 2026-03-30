/**
 * Strapi proxy for the `homepage` single type (read-only GET).
 *
 * Default populate follows Strapi 5 REST: dynamic zones need `populate[sections][on][<uid>][populate]…`
 * (see https://docs.strapi.io/cms/api/rest/populate-select — “precisely defined” dynamic-zone strategy).
 * `populate=*` alone is only one level deep and does not fill relations inside zone components.
 *
 * Incoming query params are merged on top of that default; a client `populate` key replaces the default populate object.
 */

import { Injectable } from '@nestjs/common';
import { StrapiHttpService, StrapiQueryParams } from './strapi-http.service';

/** Matches `apps/cms/.../homepage/schema.json` component UIDs (note: `sections.dishs`, not `dishes`). */
const DEFAULT_HOMEPAGE_QUERY: StrapiQueryParams = {
  populate: {
    sections: {
      on: {
        'sections.hero': {
          populate: { backgroundImage: true },
        },
        'sections.restaurants': {
          populate: {
            restaurants: { populate: '*' },
          },
        },
        'sections.dishs': {
          populate: {
            dishes: {
              populate: {
                image: true,
                tags: { populate: ['image'] },
              },
            },
          },
        },
        'sections.tags': {
          populate: {
            tags: { populate: '*' },
          },
        },
        'sections.chef': {
          populate: {
            chef: {
              populate: {
                image: true,
                restaurants: { populate: { image: true } },
              },
            },
          },
        },
        'sections.about': {
          populate: '*',
        },
      },
    },
  },
};

function mergeStrapiQuery(
  forwarded?: Record<string, unknown>,
): StrapiQueryParams {
  if (
    forwarded === undefined ||
    (typeof forwarded === 'object' && Object.keys(forwarded).length === 0)
  ) {
    return DEFAULT_HOMEPAGE_QUERY;
  }
  return { ...DEFAULT_HOMEPAGE_QUERY, ...forwarded };
}

@Injectable()
export class HomepageService {
  constructor(private readonly strapiHttp: StrapiHttpService) {}

  async getHomepage(query?: Record<string, unknown>): Promise<unknown> {
    return this.strapiHttp.get<unknown>('/homepage', mergeStrapiQuery(query));
  }
}
