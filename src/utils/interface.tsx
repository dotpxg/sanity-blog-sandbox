export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: any;
  excerpt: string;
  _id: string;
  headings?: Array<HTMLHeadElement | string>;
  imageUrl: string;
}
