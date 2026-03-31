/**
 * Strapi core controller for the `tag` content-type.
 * Exposes default REST handlers (list, findOne, create, update, delete) per Strapi routing and permissions.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::tag.tag');
