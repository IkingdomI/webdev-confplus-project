import * as repo from "../repository.js";

export async function GET(request, {params})
{
    const { id, reviewerID } = params;
    const { searchParams } = new URL(request.url);
	const status = searchParams.get("status")?.toLowerCase();

    // if (isNaN(Number(id)) || isNaN(Number(reviewerID)))
    // {
    //     return Response.json(
	// 		{
	// 			message: "Bad Route"
	// 		},
	// 		{
	// 			status: 400
	// 		}
	// 	);
    // }

	if (isNaN(Number(reviewerID)))
    {
        return Response.json(
			{
				message: "Bad Route"
			},
			{
				status: 400
			}
		);
    }

    // const res = await repo.readReviews(Number(id), Number(reviewerID), status);
    const res = await repo.readReviews(Number(reviewerID), status);


	if (res.error === 0)
	{
		return Response.json(
			res.payload,
			{
				status: 200
			}
		);
	}
	else
	{
		return Response.json(
			{
				message: res.message
			},
			{
				status: 500
			}
		);
	}
}

export async function PUT(request, { params })
{
    const { id, reviewerID } = params;
	const body = await request.json();

	    if (isNaN(Number(id)) || isNaN(Number(reviewerID)))
    {
        return Response.json(
			{
				message: "Bad Route"
			},
			{
				status: 400
			}
		);
    }

	if (
		"evaluation" in body && !isNaN(Number(body.evaluation)) ||
		"contribution" in body && !isNaN(Number(body.contribution)) ||
		"strength" in body ||
		"weakness" in body
		)
	{
		const res = await repo.updateReview(id, reviewerID, body);

		if (res.error === 0)
		{
			return Response.json(
				res.payload,
				{
					status: 200
				}
			);
		}
		else if (res.error === 2)
		{
			return Response.json(
				{
					message: res.message
				},
				{
					status: 404
				}
			);
		}
		else
		{
			return Response.json(
				{
					message: res.message
				},
				{
					status: 500
				}
			);
		}
	}
	else
	{
		return Response.json(
			{
				message: "Invalid Parameters"
			},
			{
				status: 400
			}
		);
	}
}