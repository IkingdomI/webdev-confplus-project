import { PrismaClient } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function readReviews(reviewerID, status)
{
	// console.log(reviewerID, status);
	try
	{
		const where = {
			reviewerID
		};

		if (status === "pending" || status === "rated" || status === "rejected")
		{
			where.status = status
		}

		const reviews = await prisma.review.findMany({
			where,
			// include: {
			// 	paper: {
			// 		pdf: true
			// 	}
			// }
			include: {
				paper: {
					include: {
						authors: true,
					}
				}
			}
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



// export async function readReviews(paperId, reviewerID, status)
// {
// 	try
// 	{
// 		const where = {
// 			paperId,
// 			reviewerID
// 		};

// 		if (status === "pending" || status === "rated" || status === "rejected")
// 		{
// 			where.status = status
// 		}

// 		const reviews = await prisma.review.findMany({
// 			where,
// 			include: {
// 				paper: {
// 					pdf: true
// 				}
// 			}
// 		});

// 		return {
// 			error: 0,
// 			payload: reviews
// 		};
// 	}
// 	catch (e)
// 	{
// 		console.error(e.message);

// 		return {
// 			error: 1,
// 			message: "Internal Server Error"
// 		};
// 	}
// }



export async function updateReview(paperId, reviewerID, obj, reviewId)
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

		let review = await prisma.review.update({
			where: {
				id: reviewId
			},
			data: {
				...reviewObj
			}
		});

		const { reviews } = await prisma.paper.findUnique({
			where: {
				id: paperId
			},
			include: {
				reviews: true
			}
		});

		const totEval = reviews.filter(r => r.evaluation !== null).map(r => r.evaluation)
						.reduce((acc, r) => acc + r);

		console.error(totEval)

		if (reviews.filter(r => r.evaluation !== null).length === 2)
		{
			if (totEval >= 2)
			{
				await prisma.paper.update({
					where: {
						id: paperId
					},
					data: {
						status: "approved"
					}
				});
			}
			else
			{
				await prisma.paper.update({
					where: {
						id: paperId
					},
					data: {
						status: "rejected"
					}
				});

				review = await prisma.review.update({
					where: {
						id: reviewId
					},
					data: {
						status: "rejected"
					}
				});
			}
		}

		return { error: 0, payload: review };
	}
	catch (e)
	{
		console.error(e.message);

		if (e instanceof PrismaClientKnownRequestError)
		{
			if (e.code === "P2025")
			{
				return { error: 2, message: "Review to update not found" };
			}
		}

		return { error: 1, message: "Internal Server Error" };
	}
}