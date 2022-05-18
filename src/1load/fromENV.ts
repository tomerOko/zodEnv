import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";

export const fromENV = (filePath:string) => {
    filePath = filePath[0]=='/' ? filePath.slice(1) : filePath
    const address = path.resolve(filePath)
    const rawData = readFileSync(address)
    return dotenv.parse(rawData) // will return an object
}