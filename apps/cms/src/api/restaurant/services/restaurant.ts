/**
 * Strapi core service for the `restaurant` content-type.
 * Handles persistence and lifecycle hooks for restaurant entities.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::restaurant.restaurant');
