export type UserBlogType = {
  id: number;
  title: string;
  subtitle: string;
  thumbnail: string;
  description: string;
  category: string;
  createdAt: Date;
  author: {
    name: string | null;
    image: string | null;
  };
};
