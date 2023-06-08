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

	const avgAuthorperPaper = await prisma.paper.aggregate({
		
			_count:{
				authors: {
					email: true,
					paperId: true
				}
			}
		
	});
	// return (avgAuthor);
	console.log(avgAuthorperPaper);

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