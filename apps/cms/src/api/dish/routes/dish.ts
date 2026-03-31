/**
 * Strapi core router for the `dish` content-type.
 * Maps HTTP routes to the dish controller.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::dish.dish');
