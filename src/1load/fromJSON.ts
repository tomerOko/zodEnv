import * as fs from 'fs'
import * as path from 'path'

export const fromJSON = (filePath:string) => {
    filePath = filePath[0]=='/' ? filePath.slice(1) : filePath
    const address = path.resolve(filePath)
    const rawData = fs.readFileSync(address)
    const asString = rawData.toString('utf-8')
    return JSON.parse(asString)
}

