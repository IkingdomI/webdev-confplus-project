import {promises as fs} from 'fs';


export async function readInstitutions(){
    const data = await fs.readFile("data/institutions.json");
    const institutions = JSON.parse(data);
    return institutions;
}