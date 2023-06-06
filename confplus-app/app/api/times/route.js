import * as repo from "./repository.js";

export async function GET(request)
{
	const res = await repo.readTimes();

	if (res.error === 0)
		return Response.json(
			res.payload,
			{
				status: 200
			}
		);
	else
		return Response.json(
			{
				message: res.message
			},
			{
				status: 500
			}
		);
}