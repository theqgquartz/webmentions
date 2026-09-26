export interface Webmention {
  source: string;
  verified: boolean;
  verified_date: string;
  id: number;
  private: boolean;

  data: {
    author: {
      name: string;
      url: string;
      photo: string;
    };
    url: string;
    name: string | null;
    content: string | null;
    published: string | null;
    published_ts: string | null;
  };

  activity: {
    type: string;
  };

  target: string;
}
