import { Comperator, HashFucntion, keyValuePair } from "./hashBasedStracutes.types";

interface Stringable{
    toString():string
}


type doneSuccessfuly = true
export interface HashSetInterface <ValueType extends Stringable = Object>{
    add(value: ValueType): ValueType | doneSuccessfuly , //returns replaced value for same key if existed
    contains(value: ValueType) : boolean,
    remove(value: ValueType): ValueType | doneSuccessfuly, //returns replaced value for same key if existed
}

const compareAsStrings : Comperator = (a: Stringable, b: Stringable) => {
    return a.toString() == b.toString()
}

export class HashSet<T extends Stringable = Object> implements HashSetInterface<T> {


    private comperator : Comperator<T>
    private storage: Array<Array<T>>;
    private hashFunction : HashFucntion;

    constructor(hashFunction : HashFucntion, comperator?: Comperator<T>){
        this.hashFunction = hashFunction
        this.storage =  new Array<Array<T>>(hashFunction.range)
        this.comperator = comperator ? comperator : compareAsStrings
    }

    add(value: T): T | doneSuccessfuly{
        const {hashedKey, index} = this.findIndex(value)
        if(index!=null) {
            const overriddenValue = this.storage[hashedKey][index]
            this.storage[hashedKey][index] = value
            return overriddenValue
        }
        if(this.storage[hashedKey] == undefined) this.storage[hashedKey] = []
        this.storage[hashedKey].push(value)
        return true
    }

    contains(value: T): boolean {
        const x = this.findIndex(value)
        const {hashedKey, index} = x
        return index!=null ? true : false
    }

    remove(value: T): T | doneSuccessfuly {
        const {hashedKey, index} = this.findIndex(value)
        if(index!=null){
            const removed = this.storage[hashedKey].splice(index,1)
            return removed[0]
        }
        return true
    }

    private findIndex (value:T) : {hashedKey : number, index: number | null} {
        const hashedKey = this.hashFunction.hash(value.toString());
        const bucket =this.storage[hashedKey]
        let index = bucket ? bucket.findIndex( obj => this.comperator(obj, value) ) : null
        index = index!=null && index > -1 ? index : null
        return {hashedKey:hashedKey, index}
    }

}

