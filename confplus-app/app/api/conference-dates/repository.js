import path from "path";
import { promises as fs } from "fs";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const dataPath = path.join(process.cwd(), "../data/conference-dates.json");


export async function readDates(){
   
    const dates= await prisma.condates.findMany();
    return dates;

}


