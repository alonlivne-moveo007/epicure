/**
 * Strapi core router for the `tag` content-type.
 * Maps HTTP routes to the tag controller.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::tag.tag');
