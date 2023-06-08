import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function readPdf(id){
    try{
        const pdf = await prisma.pDF.findUnique({
            where: {
                paperId: Number(id)
            }
        });
        return pdf;
    }catch (error){
        console.log(error.message);
        return null;
    }
} 