// // import { fromENV } from "./1load/fromENV";
// // import { fromJSON } from "./1load/fromJSON";
// // import { fromProcces } from "./1load/fromProcces.env";
// // import env from './1load/test/env'
// // const dataFromENV = fromENV('src/1load/test/.env')
// // const dataFromProccess = fromProcces()
// // const dataFromJS = env
// // const dataFromJson = fromJSON('/src/1load/test/env.json')
// // console.log(dataFromENV)
// // console.log(dataFromProccess)
// // console.log(dataFromJS)
// // console.log(dataFromENV)

// import { object, z, ZodArray, ZodBoolean, ZodDefault, ZodObject, ZodRawShape, ZodString, ZodType, ZodTypeAny } from "zod";
// import fs from "fs";


// const envSchema = z.object({
//     /**test */
//     godDefault: z.string().min(5).default("hallow world"),
//     badDefault: z.string().min(5).default("ha"),
//     godDoubleDefault: z.string().min(5).default("hallow world").default("hallow world2"),
//     // badDoubleDefault: z.string().min(5).default("ha").default("ha2"),
//     godDefaultOptional: z.string().min(5).default("hallow world").optional(),
//     // badDefaultOptional: z.string().min(5).default("ha").optional(),
//     node_env: z.number().min(100).default(202),
//     db: z.object({
//         dbName: z.string(),
//         job: z.string(),
//     }).default({dbName:"hallow", job:"world"})
   
// });
  