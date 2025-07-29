import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import {hash} from 'bcryptjs' 

export async function POST(req:NextRequest)
{
    try{
        const {name, email, password}=await req.json();
        const existingUser=await prisma.user.findUnique({
            where:{email}
        })
        if(existingUser){
            return NextResponse.json(
                {success:'false',message:'User already exists'},
                {status:400}
            );
        }
          const hashedPassword = await hash(password, 10);
          const user=await prisma.user.create({
            data:{
                name, 
                email,
                password:hashedPassword
            }
          })
          
          return NextResponse.json({
            success:true,
            message:'Signup successfull',
            user:{
                id:user.id,
                email:user.email
            }
          },
        {status:200})
        

    }
    catch(err){
        console.log(err);
        
        return NextResponse.json({success:false, message:"Internal server error"},{status:500});
    } 
}