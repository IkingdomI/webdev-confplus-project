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
		// console.log(paperObj);

		const newPaper = await prisma.paper.create({
			data: {
				title: paperObj.title,
				abstract: paperObj.abstract,
				authorId: Number(paperObj.authorId),
				presenter: Number(paperObj.presenter),
				
			}
		});

		console.log("newPaper", newPaper);

		const reviewers = await prisma.user.findMany({
			select: {
				id: true
			},
			where: {
				role: "reviewer"
			}
		});

		let i = 2;

		while (i)
		{
			const reviewerID = reviewers.splice(Math.floor(Math.random()*reviewers.length), 1)[0].id;

			await prisma.review.create({
				data: {
					reviewerID,
					paperId: newPaper.id,
					strength: "",
					weakness: ""
				}
			});

			i--;
		}

		const authors = paperObj.PaperAuthors;
		console.log("authors", authors);
		authors.forEach(async (element) => {
			await prisma.PaperAuthor.create({
				data:{
				fname: element.fname,
				lname: element.lname, 
				email: element.email, 
				affilId: Number(element.affilId),
				paperId: Number(newPaper.id)
				}
			})
		});
		
		await prisma.pDF.create({
			data: {
				name: fileName, 
				content,
				paperId: Number(newPaper.id)
			}
		});
	}catch(e){
		console.log(e.message);
		return {error: e.message};
	}

}


export async function readPapers(reviewerID, status){
	try
	{
		const where = (!isNaN(Number(reviewerID)))?
			{
				reviews: {
					some: {
						reviewerID: Number(reviewerID)
					}
				}
			}: {};

		if (status === "approved" || status === "rejected" || status === "not approved")
			where.status == status;

		const papers = await prisma.paper.findMany({
			select: {
				...query
			},
			where
		});

		return { error: 0, payload: papers }
	}
	catch (e)
	{
		console.error(e.message);

		return { error: 1, message: "Internal Server Error" };
	}
}

export async function readPaper(id)
{
	try
	{
		const paper = await prisma.paper.findUnique({
			where: {
				id: Number(id)
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

export async function updatePaper(id, modPaper)
{
	try
	{	
		const paper = await prisma.paper.update({
			
		});
	}
	catch (e)
	{
		console.error(e.message);
	}

	/* const data = await fs.readFile("data/papers.json");
	let papers = JSON.parse(data);

	let index = papers.findIndex((p) => p.title.toLowerCase()===title.toLowerCase());

	if(index !== -1){
		papers[index] = {...papers[index], ...modPaper};
		console.log(papers[index]);


		await fs.writeFile("data/papers.json", JSON.stringify(papers));
		return papers[index];
	}
	
	return null; */	
}
