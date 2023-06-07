import * as repo from './repository.js'

export async function GET(request)
{
	const res = await repo.readDates();

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
		/* try{
			const  dates= await repo.readDates();
			return Response.json(dates,{status:200});
		}catch(error){
			console.log(error.message);
	
			return Response.json({message: "Internal Server Error."},{status:500});
		} */
}