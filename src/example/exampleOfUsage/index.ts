import {z, findFirstNoneEmpty, initializeEnv} from '../../index'
// have a look at the file to understand how the environment variables are loaded and the current environment is determined
import { invironmentConfigs ,allEnvironmentsConfigs } from "./choosEnvironment";
import { secrets } from './loadENVsFromAllSources';


// after we:
//1) loaded all key value pairs of confings, from all sources.
//2) choosed the current environment
// now we will use the main issue here (the zod validation schema) to achive 3 important goals
// 1) create a configuration object that its keys will always be the same (of course not the values) - so from here on there is no need to think of environments while developing
// 2) validate the key value pairs (that they all exist, and that they are of the correct type, length, etc)
// 3) after the validation, our config object values (including nested objects/arrays) will be typed-safe
// 4) add comments so that we and the rest of the developer of the codebase can understand what the key value pairs are for and how to use them 

// 1. בנייה כללית של האובייקט קונפיגורציה הכללי בעזרת הdefault
// 2. שימוש בfindFirstNoneEmpty כדי לחפש ערך קיים ראשון בין כמה אופציות או ברירת מחדל אם לא נמצא ערך תקין
// 3. יצירת סכמה לוידויי של הערכים, שהם קיימים, שהם בטייפ הנכון, שהערך הגיוני וכו
// 4. הערות שאחר כך יופיעו בכל האפליקציה

// לשפר את השימוש
// לא לשים סטרינגים בפונקציית חיפוש כי זה מבלבל, 
// להשתמש במקורות שונים בשביל דברים שהם לא תלויי סביבה או סיקרטים או וואט אבר
// להוסיף עוד תוכן או להסביר שבסוף זה אמור להיות אובייקט ענק

// לוודא שהכל פה עובד
const userWritenEnvSchema = z.object({
    /**all configuration to all db's of this service */
    db: z.object({ 
        cahce: z.object({ 
            provider: z.string().default("redis"),
            saveOnShutDown: z.boolean().default(true),
            servicePath: z.string().default("localhost"),
            serviePort: z.number().default(6379),
            username: z.string().default(""),
            Password: z.string().default(""),

        }).default({}),
        session: z.object({ 
        
        }).default({}),
        main: z.object({ 
        
        }).default({}),    
    }).default({}),

    /**some comment about the filed this property */
    dbUrl : z.string().url().default(invironmentConfigs.DB.service.url),
    /** if no pussword needed set defalt to '' */
    dbPass : z.string().default(findFirstNoneEmpty([invironmentConfigs.DB.service.password , secrets.mongoDBPassword], '')),
    stripe : z.object({
        userID : z.string().min(10).max(30).default(findFirstNoneEmpty([])),
        port : z.number().gte(1000).lte(9999).default(findFirstNoneEmpty([], 8080)),
        chargeEndpoint : z.string().default(findFirstNoneEmpty(['a','b','c'],'http://localhost:2702'))
    }).default({})
})


const ENVs = initializeEnv(userWritenEnvSchema)

const hoverOverThisToSeeComment = ENVs.dbUrl

console.log(ENVs)
export default ENVs
