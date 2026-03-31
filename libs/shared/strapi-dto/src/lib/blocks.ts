export type StrapiBlockChildDto = {
  type?: string;
  text?: string;
  children?: StrapiBlockChildDto[];
};

export type StrapiBlockDto = {
  type?: string;
  children?: StrapiBlockChildDto[];
};

