import { PrismaClient } from '@prisma/client';
import {promises as fs} from 'fs';
const prisma = new PrismaClient();


export async function NoOfPapers(){
	
	const NumberOfPapers = await prisma.paper.groupBy({
		by:['status'],
		_count:{
			id: true,
		}
	});

	console.log(NumberOfPapers);
    return (NumberOfPapers);
}




export async function AverageAuthorsPerPaper(){
	// const avgAuthor = await prisma.paper.findMany({
	// 	include: {
	// 	  _count: {
	// 		select: { authors: true },
	// 	  },
	// 	},
	//   });
	// console.log(avgAuthor[0]._count);
	// return (avgAuthor);

	// const avgAuthor = await prisma.paper.findMany({
	// 	select:{
	// 		_count:{
	// 			select: {authors: true},
	// 		},
	// 	}
	// });
	// const authorCounts = [];
	// avgAuthor.forEach(el => authorCounts.push(el._count.authors));
	// console.log(authorCounts);

	try
	{
		const papers = await prisma.paper.findMany({
			select: {
				id: true,
				authors: true
			}
		});
		
		// return (avgAuthor);
		//console.log(papers);

		const counts = papers.map((p) => p.authors.length);
		const avg = counts.reduce((acc, p) => acc + p, 0) / counts.length;
		
		return { avg };
	}
	catch (e)
	{
		console.error(e.message);
		throw e;
	}

	// const authorCount = await prisma.paper.count({
	// 	select:{
	// 		authors: true,
	// 	}
	// });
	// console.log(authorCount);
	// return (authorCount);
}

export async function NoOfConfereneSessions(){
	const sessions = await prisma.Session.aggregate({
		_count:{
			id: true,
		},
	});
}