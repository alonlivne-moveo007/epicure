/**
 * Strapi core router for the `restaurant` content-type.
 * Maps HTTP routes to the restaurant controller.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::restaurant.restaurant');
