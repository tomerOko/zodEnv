import fs from "fs";
import z, { TypeOf } from 'zod'

import * as loaders from "./loaders";
export{ loaders,z }

export const sources = (sourcesArray: Array<any>, defaultValue?:any):any => {
    for(let i=0; i<sourcesArray.length; i++){
        if(!([null, undefined, NaN].includes(sourcesArray[i]))) return sourcesArray[i] 
    }
    return defaultValue ? defaultValue : null
}

export const initializeEnv = <T extends z.ZodType<any, any, any>>(zodScheme:T):z.infer<typeof zodScheme>=> {
    const parsed = zodScheme.safeParse({})
    const [data, error] = parsed.success ?[parsed.data, null] : [null,parsed.error]
    if(error) {
        console.log(error)
        throw new Error("environment variables didnt passed validations")
    }
    Object.freeze(data)
    return data
}







