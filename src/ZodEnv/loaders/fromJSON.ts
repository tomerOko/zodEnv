import * as fs from 'fs'
import * as path from 'path'

/**
 * this method is eaquvilent to 
 * @example import * as <some_name> from '<path>/<filename>.json'
 * **usage**
 * @example
 * const <some_name> = fromJSON('/src/<path to file from src>/env.json')
 */
export const fromJSON = (filePath:string) => {
    filePath = removeLeadingSlash(filePath)
    const address = path.resolve(filePath)
    const rawData = fs.readFileSync(address)
    const asString = rawData.toString('utf-8')
    return JSON.parse(asString)
}

const removeLeadingSlash = (filePath:string):string => filePath = filePath[0]=='/' ? filePath.slice(1) : filePath
