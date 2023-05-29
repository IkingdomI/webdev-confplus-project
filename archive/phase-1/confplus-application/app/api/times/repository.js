import {promises as fs} from "fs";

const path = "data/times.json"

export async function readTimes()
{
    const timesRes = await fs.readFile(path);
    const times = await JSON.parse(timesRes);

    return times;
}