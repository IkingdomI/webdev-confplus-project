import { PrismaClient } from '@prisma/client';
import {promises as fs} from 'fs';



export async function NoOfPapers(){
	const submittedPapers = await prisma.Paper.aggregate({
		_count:{
			id: true,
		},
	});

	console.log("Total Number of submitted papers: "+submittedPapers._count)

	const acceptedPapers = await prisma.Paper.aggregate({
		_count:{
			id: true,
		},
		where :{
			status: 'accepted'
		},
	});

	console.log("Number of accepted papers: "+acceptedPapers._count);

	const rejectedPapers = await prisma.Paper.aggregate({
		_count:{
			id: true,
		},
		where :{
			status: 'rejected'
		},
	});

	console.log("Number of rejected papers: "+rejectedPapers._count)

}


export async function NoOfConfereneSessions(){
	const sessions = await prisma.Session.aggregate({
		_count:{
			id: true,
		},
	});
}