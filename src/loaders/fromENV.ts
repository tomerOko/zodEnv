import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";

/**
 * this method is eaquvilent to 
 * @example import * as <some_name> from '<path>/.env'
 * **usage**
 * @example
 * const <some_name> = fromJSON('/src/<path to file from src>/.env')
 */
export const fromENV = (filePath:string) => {
    filePath = removeLeadingSlash(filePath)
    const address = path.resolve(filePath)
    const rawData = readFileSync(address)
    return dotenv.parse(rawData) // will return an object
}

const removeLeadingSlash = (filePath:string):string => filePath = filePath[0]=='/' ? filePath.slice(1) : filePath
