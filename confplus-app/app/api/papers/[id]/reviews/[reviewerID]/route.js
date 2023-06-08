import * as repo from "../repository.js";

export async function GET(request, {params})
{
    const { id, reviewerID } = params;
    const { searchParams } = new URL(request.url);
	const status = searchParams.get("status")?.toLowerCase();

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

    const res = await repo.readPapers(Number(id), Number(reviewerID), status);
}

export async function PUT(request, { params })
{
    
}