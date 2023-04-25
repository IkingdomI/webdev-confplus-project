import * as repo from '../repository.js'

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