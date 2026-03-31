/**
 * Strapi core service for the `dish` content-type.
 * Handles persistence and lifecycle hooks for dish entities.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::dish.dish');
