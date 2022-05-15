import { HashDataStracture, HashFucntion, keyValuePair } from "./hashBasedStracutes.types";


export class HashMap<T = any> implements HashDataStracture<T> {

    private storage: Array<Array<keyValuePair<T>>>;
    private hashFunction : HashFucntion;

    constructor(hashFunction : HashFucntion){
        this.hashFunction = hashFunction
        this.storage = new Array<Array<keyValuePair<T>>>(hashFunction.range)
    }

    public add(key: string, value: T): T | null {
        const {hashedKey, index} = this.findIndex(key)
        if(index!=null) {
            const result = this.storage[hashedKey][index].value;
            this.storage[hashedKey][index].value = value
            return result
        }
        if(this.storage[hashedKey] == undefined) this.storage[hashedKey] = []
        this.storage[hashedKey].push({key, value}) 
        return null
    }

    public contains (key:string) : boolean {
        const {hashedKey, index} = this.findIndex(key)
        return index!==null ? true : false
    }

    public get(key: string): T | null {
        const {hashedKey, index} = this.findIndex(key)
        return index ? this.storage[hashedKey][index].value : null
    }

    public remove(key: string): T | null {
        const {hashedKey, index} = this.findIndex(key)
        if(index!==null){
            const removed = this.storage[hashedKey].splice(index,1)
            return removed[0].value
        }
        return null
    }
    
    private findIndex (key:string) : {hashedKey : number, index: number | null} {
        const hashedKey = this.hashFunction.hash(key);
        const bucket = this.storage[hashedKey]
        const index = bucket ? bucket.findIndex( obj => obj.key==key ) : null
        return {hashedKey:hashedKey, index : (index!==null && index > -1) ? index : null}
    }

}
