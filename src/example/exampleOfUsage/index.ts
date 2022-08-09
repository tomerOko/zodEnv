import {z, findFirstNoneEmpty, initializeEnv} from '../../index'
// have a look at the file to understand how the environment variables are loaded and the current environment is determined
import { invironmentConfigs ,allEnvironmentsConfigs } from "./choosEnvironment";
import { secrets } from './loadENVsFromAllSources';

/**
 * 

after we have:

1) loaded all configs (key-value) from all sources.
2) received indication of what environment we are about to run in (local / dev / 
    integration / test / prod)

    
now we will use the main tool, the Zod validation schema, to achieve 5 important goals:

1)  single source of truth and centralization: by creating a single object to contain all the
    program's configurations. 
	    breakdown: no more usage of multiple configuration sources such as 'global variables',
        'procces.env', 'config.json', etc..

2)  abstraction: the keys of that single object will be identical in all environments and 
    differ only by its values. 
	    Breakdown: in many code bases, the environment classification is repetitive and 
        blended with the rest of the code

3)  confidence and safety regarding the configuration values: by validating the single 
    configuration object while creating it. the validation makes sure that all the mandatory
    values are present, and that each value is of the right type, length, positive/negative,
    match regex pattern, in range, etc...
	    Breakdown: config files are not part of the codebase, they are not under the git 
        control, and usually can be changed by different developers/teams/pipelines. Because
        of that, the configuration had always been a weak point in the code that can cause 
        confusion, bags, or incorrect behevior in production. by validating the configuration,
        the developers can gain back full control of their program, and not worry about 
        unexpected behaviors, bad configurations can still be sopplied, but they will be 
        found and presented before the program starts running.

4) static type-support: after the validation, the single configurations object will have static type-support through the rest of the program.
	breakdown: usualy config variables are of type 'any', and it is problematic because typescript can not help us with type safety, it can be confusing while developing, and it encourages bad code. static type support solves these problems for our config object

5) dev-experience: add comments so that we and the rest of the developer of the codebase can understand what the key-value pairs are for and how to use them 

וולידציה על האובייקט שנוצר, וולידציה שהערכים שחייבים להיות קיימים אכן קיימים, שהם מהסוג הנכון ובטווח הנכון של אורך, ערך מספרי וכדומה. בגלל שהקבצי קונפיגורציה הרבה פעמים לא בשליטת המפתח, יכולים להשתנות על ידי אנשים שונים, ולא מתועדים בגיט, יכולות להיווצר הרבה תעויות סביב הנושא. ברגע שיש וולידציה בקוד, זה בעצם מגן על הקוד משינויים בקונפיגורציה, והמפתח יודע שבמקרה שמשהו בקונפיגורציה לא בסדר זה יתגלה עוד לפני שהסרבר יתחיל לרוץ

// 1. בנייה כללית של האובייקט קונפיגורציה הכללי בעזרת הdefault
// 2. שימוש בfindFirstNoneEmpty כדי לחפש ערך קיים ראשון בין כמה אופציות או ברירת מחדל אם לא נמצא ערך תקין
// 4. הערות שאחר כך יופיעו בכל האפליקציה

// לשפר את השימוש
// לא לשים סטרינגים בפונקציית חיפוש כי זה מבלבל, 
// להשתמש במקורות שונים בשביל דברים שהם לא תלויי סביבה או סיקרטים או וואט אבר
// להוסיף עוד תוכן או להסביר שבסוף זה אמור להיות אובייקט ענק
*/

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
