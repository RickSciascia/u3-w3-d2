export interface Articles {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

export interface Result {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: unknown[];
  events: unknown[];
}

export interface Author {
  name: string;
  socials: null;
}
