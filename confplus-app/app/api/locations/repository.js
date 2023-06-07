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
	try
	{
		const locations= await prisma.location.findMany();
		
		return { error: 0, payload: locations };
	}
	catch (e)
	{
		console.error(e.message);
		
		return { error: 1, message: "Internal Server Error" }
	}
}