import { auth } from "@/app/auth";
import { notFound } from "next/navigation";
import {prisma} from '../../../../../lib/prisma'
import { NextRequest, NextResponse } from "next/server";
import { UpdateBlogType } from "types/UpdateBlogType";

export async function DELETE(req:NextRequest, { params }: { params: Promise<{ id: string }> })
{
    try{
    const {id}= await params;
    const numericId = Number(id);
    if (isNaN(numericId)) return notFound();        
    const session=await auth();
    const user=session?.user;
    if(!user) return notFound();
    const blogOwner=await prisma.blogs.findUnique({
        where:{
            id:numericId
        },
        select:{
            authorId:true
        }
    })
    if(user.id!==blogOwner?.authorId) return notFound();
    await prisma.blogs.delete({
        where:{
            id:numericId
        }
    });
    return NextResponse.json({
        success:true,
        message:'Blog deleted successfully'
    }, {status:200});
    }
    catch(err)
    {
        return NextResponse.json({
            success:false,
            error:'An internal server error occurred'
        }, {status:500})
    }
}

export async function GET(req:NextRequest, {params}:{params:Promise<{id:String}>})
{
    try{
    const {id}=await params;
    const numericId = Number(id);
    if (isNaN(numericId)) return notFound();        
    const session=await auth();
    const user=session?.user;
    if(!user) return notFound();
    const blogOwner=await prisma.blogs.findUnique({
        where:{
            id:numericId
        },
        select:{
            authorId:true
        }
    })
    if(user.id!==blogOwner?.authorId) return notFound();
    const res=await prisma.blogs.findUnique({
        where:{
            id:numericId
        },
        include:{
            author:true
        }
    })
    return NextResponse.json({
            success:true,
            blog:res
    },{status:200})
}
catch(err)
{
    return NextResponse.json({
        success:false,
        error:'Something went wrong'
    })
}
}

export async function PUT(req: NextRequest)
{
    try{
    const blog:UpdateBlogType=await req.json();
    const updatedBlog=await prisma.blogs.update({
        where:{id:blog.id},
        data:{
            title: blog.title,
            subtitle: blog.subtitle,
            description: blog.description,
            thumbnail: blog.thumbnail,
            category: blog.category,
        }
    })
    return NextResponse.json({
        success:true,
        updatedBlog
    },{status:200});
    }
    catch(err)
    {
        return NextResponse.json({
            success:false,
            error:err || 'Something went wrong'
        },{status:400})
    }
}