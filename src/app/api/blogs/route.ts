import { NextRequest, NextResponse } from "next/server";
import {prisma} from '../../../../lib/prisma'
import { CreateBlogType } from "types/CreateBlogType";
import { auth } from "@/app/auth";


export async function GET(req: NextRequest)
{
    try
    {
        const  res=await prisma.blogs.findMany({
            orderBy:{
                createdAt:'desc'
            }
            ,
            select:{
                id:true,
                    title: true,
                    subtitle: true,
                    description: true,
                    category: true,
                    thumbnail: true,
                    createdAt: true,
                    updatedAt: true,
                    author:{
                        select:{
                            id:true,
                            image:true,
                            name:true
                        }
                    }
            }
        });
        return NextResponse.json({
            success:true,
            blogs: res
        }, {status:200});
    }
    catch(err)
    {
        return NextResponse.json({
            success:true,
            error: err
        },{status:400})
    }
}

export async function POST(req:NextRequest)
{
    try
    {
    const blog:CreateBlogType=await req.json();
    const session=await auth();
    if (!session?.user?.id) 
    {
    return NextResponse.json({
            success: false,
            message: "Unauthorized: Missing user ID",
        }, { status: 401 });
    }
    const res=await prisma.blogs.create({
        data:{
            ...blog,
            authorId:session.user.id
        },
        include:{
            author:{
                select:{
                    name:true,
                    image:true
                }
            }
        }
    })
    if(!res) 
    {
        return NextResponse.json({
            success:false,
            message:"Couldn't create blog"
        }, {status:400})
    }
    return NextResponse.json({
        success:true,
        blog:res,
        message:"Blog is published successfully"
    }, {status:200});
}
catch(err)
{
    return NextResponse.json({
        success:false,
        message:err
    },{status:400})
}
}

