import { auth } from "@/app/auth";
import { notFound } from "next/navigation";
import {prisma} from '../../../../../lib/prisma'
import { NextRequest, NextResponse } from "next/server";

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