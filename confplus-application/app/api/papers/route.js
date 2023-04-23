import * as repo from './repository.js'

export async function GET(request){
    try{
        const papers = await repo.readPapers();
        console.log(papers);
        if(papers){
            return Response.json(papers, {status: 200});
        }else{
            return Response.json("papers not found", {status: 404});
        }
    }catch(error){
        onsole.log(error.message);
        return Response.json({message: "Internal Server Error"}, {status: 500});
    }
}

export async function POST(request){
    try{
        const body = await request.json();
        if(
            "title" in body &&
            "authors" in body && 
            "abstract" in body
        ){
            const paper = await repo.createPaper({
                title: body.title,
                authors: body.authors,
                abstract: body.abstract,
                presenter: body.presenter,
                reviewer1: body.reviewer1,
                reviewer2: body.reviewer2,
                rating: body.rating

            });
            return Response.json(paper, {status: 201});
        }else{
            return Response.json("Invalid parameters.", {status: 400});
        }
    }catch(error){
        console.log(error.message);
        return Response.json({message: "Internal Server Error."},{status:500});
    }
    
}