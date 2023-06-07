//import path from "path";
//import { promises as fs } from "fs";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//const dataPath = path.join(process.cwd(), "../data/conference-dates.json");


export async function readDates()
{
	try
	{
		const dates = await prisma.condates.findMany();

		return {
			error: 0,
			payload: dates
		};
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


