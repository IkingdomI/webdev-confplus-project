//import path from "path";
//import { promises as fs } from "fs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//const dataPath = path.join(process.cwd(), "../data/institutions.json");

export async function readInstitutions()
{
	try
	{
		const institutions = await prisma.institution.findMany();

		return { error: 0, payload: institutions };
	}
	catch (e)
	{
		console.error(e.message);

		return {
			error: 1,
			message: "Internal Server Error"
		};
	}
}
