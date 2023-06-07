import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';

const prisma = new PrismaClient();

const query = {
	id: true,
	title: true,
	authorId: true,
	authors: true,
	abstract: true,
	reviews: true,
	presenter: true,
	status: true,
	sessionId: true,
	pdf: true
};

export async function createPaper(paperObj, fileName, content){
	// const data = await fs.readFile("data/papers.json");
	// let papers = JSON.parse(data);
	
	
	
	// papers.push(obj);

	// await fs.writeFile("data/papers.json", JSON.stringify(papers));
	// return obj;
	try{
		console.log(paperObj);

		const paper = await prisma.paper.create({
			data: {
				title: paperObj.title,
				abstract: paperObj.abstract,
				authorId: paperObj.authorId,
				presenter: paperObj.presenter,
				
			}
		});

		const authors = paperObj.PaperAuthors;
		authors.forEach(async (element) => {
			await prisma.PaperAuthor.create({
				data:{
				fname: element.fname,
				lname: element.lname, 
				email: element.email, 
				affilId: element.affilId,
				paperId: paper.id
				}
			})
		});
		
		const pdf = await prisma.pdf.create({
			data: {
				name: fileName, 
				content,
				paperId: paper.id
			}
		});
	}catch(e){
		console.log(e.message);
		return {error: e.message};
	}

}


export async function readPapers(){
	try
	{
		const papers = await prisma.paper.findMany({
			select: {
				...query
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
			},
			select: {
				...query
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
