import { promises as fs } from "fs";

const path = "data/schedule.json"

export async function readSessions()
{
    const res = await fs.readFile(path);
    const sessions = await JSON.parse(res);

    return sessions;
}