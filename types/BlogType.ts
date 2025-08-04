export type BlogType= {
  id:number,
  title:string,
  subtitle:string,
  thumbnail:string,
  description:string,
  author:{
    id: string,
    name:string | null,
    image:string | null
  },
  category:string,
  createdAt: Date,
}