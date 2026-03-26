import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_abouts';
  info: {
    displayName: 'about';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionsChef extends Struct.ComponentSchema {
  collectionName: 'components_sections_chefs';
  info: {
    displayName: 'chef';
  };
  attributes: {
    chef: Schema.Attribute.Relation<'oneToOne', 'api::chef.chef'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsDishs extends Struct.ComponentSchema {
  collectionName: 'components_sections_dishs';
  info: {
    displayName: 'dishes';
  };
  attributes: {
    dishes: Schema.Attribute.Relation<'oneToMany', 'api::dish.dish'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    searchPlaceholder: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsRestaurants extends Struct.ComponentSchema {
  collectionName: 'components_sections_restaurants';
  info: {
    displayName: 'restaurants';
  };
  attributes: {
    restaurants: Schema.Attribute.Relation<
      'oneToMany',
      'api::restaurant.restaurant'
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTags extends Struct.ComponentSchema {
  collectionName: 'components_sections_tags';
  info: {
    displayName: 'tags';
  };
  attributes: {
    tags: Schema.Attribute.Relation<'oneToMany', 'api::tag.tag'>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.about': SectionsAbout;
      'sections.chef': SectionsChef;
      'sections.dishs': SectionsDishs;
      'sections.hero': SectionsHero;
      'sections.restaurants': SectionsRestaurants;
      'sections.tags': SectionsTags;
    }
  }
}
