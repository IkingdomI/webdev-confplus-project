import path from "path";
import { promises as fs } from "fs";

import { PrismaClient } from "@prisma/client";

const dataPath = path.join(process.cwd(), "../data/times.json");

const prisma = new PrismaClient();

export async function readTimes() {
	try {
		const times = await prisma.time.findMany();
		
		return { error: 0, payload: times };
	}
	catch (e)
	{
		console.error(e.message);

		return { error: 1, message: "Internal Server Error" }
	}
}

/*
 async readTimes()
{
	const timesRes = await fs.readFile(path);
	const times = await JSON.parse(timesRes);

	return times;
}
*/



