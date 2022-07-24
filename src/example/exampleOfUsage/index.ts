import {z, findFirstNoneEmpty, initializeEnv} from '../../index'
// have a look at the file to understand how the environment variables are loaded and the current environment is determined
import { invironmentConfigs ,allEnvironmentsConfigs } from "./choosEnvironment";

// אין לי כוח לאנגלית רק כותב נקודות לתרגם מחר
// בגדול זה הקטע המעניין יש כאן שני עניינים
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
    /**some comment about the filed this property */
    dbUrl : z.string().default(invironmentConfigs.DB.service.url),
    /** if no pussword needed set defalt to '' */
    dbPass : z.string().default(findFirstNoneEmpty(['a','b','c'])),
    stripe : z.object({
        userID : z.number().default(findFirstNoneEmpty([null,2,], 7)),
        chargeEndpoint : z.string().default(findFirstNoneEmpty(['a','b','c'],'http://localhost:2702'))
    }).default({})
})


const ENVs = initializeEnv(userWritenEnvSchema)

const hoverOverThisToSeeComment = ENVs.dbUrl

export default ENVs
