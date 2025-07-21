import { NextRequest, NextResponse } from "next/server";


export default async function POST(req: NextRequest){
    try{

       const formData = await req.json()
       const {name, email, password} = formData;

       //find uniqu email
       const existEmail = db.User.findUnique({
        where : {email : email}
       })
       if(existEmail){
        return NextResponse.json({user : null, message: "Email already exist"})
       }

       const existName = db.User.findUnique({
        where : {name: name}
       })
       if(existName){
        return NextResponse.json({User : null, message: "name already esixt"})
        
       }
       const addNewuser = db.User.create({
       data : {
             name, email, password
       }
       })


         return NextResponse.json({user:addNewuser , message: "User add ssful"})

    } catch(error){

    }
}