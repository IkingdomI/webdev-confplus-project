import {promises as fs} from 'fs';

export async function readLocations(){
    const data = await fs.readFile('data/locations.json');
    const locations = JSON.parse(data);

    return locations;
}