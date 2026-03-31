/**
 * Strapi core router for the `chef` content-type.
 * Maps HTTP routes to the chef controller.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::chef.chef');
