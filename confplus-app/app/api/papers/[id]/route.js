import * as repo from '../repository.js'

export async function GET(request, {params}) {
	const { id } = params;

	if (isNaN(Number(id)))
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

	const res = await repo.readPaper(id);

	if (res.error === 0)
	{
		return Response.json(
			res.payload,
			{
				status: 200
			}
		);
	}
	else if (res.error === 1)
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