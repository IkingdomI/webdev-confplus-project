import * as repo from './repository.js';

export async function GET(request)
{
	const { searchParams } = new URL(request.url);
	//console.log(searchParams);
	const role = searchParams.get("role")?.toLowerCase();

	const res = await (await repo.readUsers(role));

	if (res.error === 0)
	{
		return Response.json(
			res,
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