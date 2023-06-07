import { PrismaClient } from '@prisma/client';
import {promises as fs} from 'fs';

const prisma = new PrismaClient();

export async function createPaper(obj){
	const data = await fs.readFile("data/papers.json");
	let papers = JSON.parse(data);
	
	
	
	papers.push(obj);

	await fs.writeFile("data/papers.json", JSON.stringify(papers));
	return obj;
}

export async function readPapers(){
	try
	{
		const papers = await prisma.paper.findMany({
			include: {
				authors: true,
			}
		});

		return { error: 0, payload: papers }
	}
	catch (e)
	{
		console.error(e.message);

		return { error: 1, message: "Internal Server Error" };
	}
}

export async function readPaper(title)
{
	try
	{
		const paper = await prisma.paper.findMany({
			where: {
				title
			}
		});

		if (paper.length)
		{
			return { error: 0, payload: paper }
		}
		else
		{
			return { error: 1, message: "Paper not found" }
		}
	}
	catch (e)
	{
		console.error(e.message);

		return { error: 2, message: "Internal Server Error" }
	}
}

export async function updatePaper(title, modPaper){
	const data = await fs.readFile("data/papers.json");
	let papers = JSON.parse(data);

	let index = papers.findIndex((p) => p.title.toLowerCase()===title.toLowerCase());

	if(index !== -1){
		papers[index] = {...papers[index], ...modPaper};
		console.log(papers[index]);


		await fs.writeFile("data/papers.json", JSON.stringify(papers));
		return papers[index];
	}
	
	return null;
	
}
