//import path from "path";
//import { promises as fs } from "fs";
import { PrismaClient } from "@prisma/client";

let prisma = null;

if (!prisma)
{
	prisma = new PrismaClient();
}

//const dataPath = path.join(process.cwd(), "../data/locations.json");

export async function readLocations()
{
	const locations= await prisma.location.findMany();
	return locations;
}