/**
 * Strapi core service for the `tag` content-type.
 * Handles persistence and lifecycle hooks for tag entities.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::tag.tag');
