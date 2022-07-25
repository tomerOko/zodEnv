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
export interface keyValuePairs {
    [name: string]: string;
  }
export const fromENV = (filePath:string): keyValuePairs => {
    filePath = removeLeadingSlash(filePath)
    const address = path.resolve(filePath)
    const rawData = readFileSync(address)
    const parsedData:keyValuePairs = dotenv.parse(rawData)
    return parsedData
}

const removeLeadingSlash = (filePath:string):string => filePath = filePath[0]=='/' ? filePath.slice(1) : filePath
