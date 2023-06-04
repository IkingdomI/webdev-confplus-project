import path from "path";
import { promises as fs } from "fs";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const dataPath = path.join(process.cwd(), "../data/institutions.json");

export async function readInstitutions(){

   const institutions= await prisma.institution.findMany();
    return institutions;
}
