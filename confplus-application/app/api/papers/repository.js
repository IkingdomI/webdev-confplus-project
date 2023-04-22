import {promises as fs} from 'fs';

export async function readPapers(){
    const data = await fs.readFile("data/papers.json");
    let papers = JSON.parse(data);
    // if (author){
    //     papers = papers.filter((paper) => paper.author === author);
    // }
    console.log(papers);
    if(papers.length>0)
        return papers;
    return null;
}

export async function createPaper(obj){
    const data = await fs.readFile("data/papers.json");
    let papers = JSON.parse(data);
    
    
    
    papers.push(obj);

    await fs.writeFile("data/papers.json", JSON.stringify(papers));
    return obj;


}
