import * as repo from '../repository.js'

export async function GET(request, {params}) {
	const { title } = params;
	const res = await repo.readPaper(title);

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
	/* try{
		const {title} = params;

		const paper = await repo.readPaperByTitle(title);
		console.log(paper);
		if(paper.length!=0){
			return Response.json(paper, {status: 200});
		}else{
			return Response.json("paper not found", {status: 404});
		}
	}catch(error){
		onsole.log(error.message);
		return Response.json({message: "Internal Server Error"}, {status: 500});
	} */
}

export async function PUT(request, {params}){
	try{
		const {title} = params;
		const body = await request.json();

		const paper = await repo.updatePaper(title, body);
		console.log(paper);
		if(paper){
			return Response.json(paper, {status: 200});
		}else{
			return Response.json("paper not found", {status: 404});
		}
	}catch(error){
		console.log(error.message);
		return Response.json({message: "Internal Server Error"}, {status: 500});
	}
}