
/**
 * based on the assumption that an Array with 'n' number of 'buckets' shuld be initialized, 
 * the function 'buckets' range is shuld be provided
 */
interface HashFucntion{
    range : number,
    hash : (key:string) => number
}

/**
 * input - two elements of the same type
 * output - a boolean, true for equal elements, false for none equal
 */
type Comperator<T = any> = (a:T , b:T) => boolean;


/**
 * key is always string;
 * null will indicate 
 */
interface HashDataStracture <ValueType = any>{
    add(key: string, value: ValueType): ValueType | null, //returns replaced value for same key if existed
    contains(key: string) : boolean,
    get(key: string): ValueType | null,
    remove(key : string): ValueType | null, //returns replaced value for same key if existed
}


type keyValuePair<T = any>={
    key: string,
    value: T
}


export {HashDataStracture, HashFucntion, Comperator, keyValuePair}
