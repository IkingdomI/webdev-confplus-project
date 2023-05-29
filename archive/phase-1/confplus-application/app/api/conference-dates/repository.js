import {promises as fs} from 'fs';

export async function readDates(){
    const data = await fs.readFile('data/conference-dates.json');
    const dates = JSON.parse(data);

    return dates;
}