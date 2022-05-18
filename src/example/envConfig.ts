import {z, sources, initializeEnv, loaders} from '../2stuff/pipe'

const proccesEnv = loaders.fromProcces

const userWritenEnvSchema = z.object({
    /** in case of local db, just leave empy */
    dbUrl : z.string().default(sources(['a','b','c'])),
    /** if no pussword needed set defalt to '' */
    dbPass : z.string().default(sources(['a','b','c'], '')),
    stripe : z.object({
        userID : z.number(sources([1,2,3])),
        dbPass : z.string(sources(['a','b','c'],''))
    })
})
// console.log(a)



// const env = doIt(envSchema)
// env.dbPass