import { PrismaClient } from '@prisma/client';
import {promises as fs} from 'fs';
const prisma = new PrismaClient();


export async function NoOfPapers(){
	const submittedPapers = await prisma.Paper.aggregate({
		_count:{
			id: true,
		},
	});

	console.log("Total Number of submitted papers: "+submittedPapers._count.id)
    

	const acceptedPapers = await prisma.Paper.aggregate({
		_count:{
			id: true,
		},
		where :{
			status: 'accepted'
		},
	});

	console.log("Number of accepted papers: "+acceptedPapers._count.id);

	const rejectedPapers = await prisma.Paper.aggregate({
		_count:{
			id: true,
		},
		where :{
			status: 'rejected'
		},
	});

	console.log("Number of rejected papers: "+rejectedPapers._count.id)
    return ({
        submitted: submittedPapers._count.id,
        accepted: acceptedPapers._count.id,
        rejected: rejectedPapers._count.id
    });
}






export async function NoOfConfereneSessions(){
	const sessions = await prisma.Session.aggregate({
		_count:{
			id: true,
		},
	});
}