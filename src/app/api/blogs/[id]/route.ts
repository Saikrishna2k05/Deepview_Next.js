import { NextRequest, NextResponse } from "next/server";
import {prisma} from '../../../../../lib/prisma'
import { success } from "zod";

export async function GET(req:NextRequest,{params}:{params:{id:string}})
{
    try
    {
          const { id } = await params;
        const res=await prisma.blogs.findUnique({
            where:{id:Number(id)}
        })
        if(!res)
        {
            return NextResponse.json({
                success:false,
                blog:'Blog not found'
            },{status:400})
        }
        return NextResponse.json({
            success:true,
            blog:res
        })
    }   
    catch(err)
    {
        return NextResponse.json({
            success:false,
            error:err
        },{status:400})
    } 
}