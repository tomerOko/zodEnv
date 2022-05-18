import fs from "fs";
import z, { TypeOf } from 'zod'

import { loaders } from "../1load";
export{ loaders,z }

export const sources = (sourcesArray: Array<any>, defaultValue?:any):any => {
    sourcesArray.forEach(value => { if(![null, undefined, NaN].includes(value)) return value } )
    return defaultValue ? defaultValue : null
}

export const initializeEnv = <T extends z.ZodType<any, any, any>>(zodScheme:T):z.infer<typeof zodScheme>=> {
    const parsed = zodScheme.safeParse({})
    const [data, error] = parsed.success ?[parsed.data, null] : [null,parsed.error]
    if(error) {
        console.log(error)
        throw new Error("environment variables didnt passed validations")
    }
    return data
}




