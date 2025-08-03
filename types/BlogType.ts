export type BlogType= {
  id:number,
  title:string,
  subtitle:string,
  thumbnail:string,
  description:string,
  author:{
    id: string,
    name:string,
    image:string
  },
  category:string,
  createdAt: Date,
}