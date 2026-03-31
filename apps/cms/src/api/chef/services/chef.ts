/**
 * Strapi core service for the `chef` content-type.
 * Handles persistence and lifecycle hooks for chef entities.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::chef.chef');
