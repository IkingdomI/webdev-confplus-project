import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function readPapers(paperId, reviewerID, status)
{
	try
	{
		const where = {
			paperId,
			reviewerID
		};

		if (status === "pending" || status === "rated" || status === "rejected")
		{
			where.status = status
		}

		const reviews = await prisma.review.findMany({
			where
		});

		return {
			error: 0,
			payload: reviews
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

export async function updateReview(paperId, reviewerID, obj)
{
	try
	{
		const reviewObj = {
			status: "rated"
		};

		if ("contribution" in obj)
			reviewObj.contribution = obj.contribution;
		if ("evaluation" in obj)
			reviewObj.evaluation = obj.evaluation;
		if ("strength" in obj)
			reviewObj.strength = obj.strength;
		if ("weakness" in obj)
			reviewObj.weakness = obj.weakness;

		const review = await prisma.review.update({
			where: {
				paperId,
				reviewerID
			},
			data: {
				...reviewObj
			}
		});
	}
	catch (e)
	{
		console.error(e.message);

		return { error: 1, message: "Internal Server Error" };
	}
}