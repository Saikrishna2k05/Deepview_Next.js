import { NextRequest, NextResponse } from "next/server";
import {prisma} from '../../../../lib/prisma'

export async function GET(req: NextRequest)
{
    try
    {
        const res=await prisma.blogs.findMany({
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