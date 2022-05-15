import { HashMap } from "./hashMap";
import hashFromStringUnicodes from "./hashFromStringUnicodes";


describe("'add' functionalities",()=>{
    
    const hashMap = new HashMap<Array<string>>(hashFromStringUnicodes)

    const someValue = ["hallow","word"]
    const otherValue = ["jhon","doe"]
    const someKey = "key"
    const theSameKey = someKey
    
    it("add value to new key returns null",()=>{
        expect(hashMap.add(someKey,someValue)).toBe(null)
    })

    it("add value to an existing key returns overidden value",()=>{
        expect(hashMap.add(theSameKey,otherValue)).toEqual(someValue)
    })
})

describe("'remove' functionalities",()=>{

    const hashMap = new HashMap<Array<string>>(hashFromStringUnicodes)
    const someValue = ["hallow","word"]
    const someKey = "key"
    const theSameKey = someKey.toString()
    
    it("remove an non existing key returns null",()=>{
        expect(hashMap.remove(someKey)).toBe(null)
    })

    it("remove an existing key with value return the value",()=>{
        hashMap.add(someKey,someValue)
        expect(hashMap.remove(theSameKey)).toBe(someValue)
    })

    it("remove an existing key with no value return false",()=>{
        hashMap.add(someKey,someValue)
        hashMap.remove(theSameKey)
        expect(hashMap.remove(someKey)).toBe(null)
    })
})


describe("'contains' functionalites",()=>{

    const hashMap = new HashMap<Array<string>>(hashFromStringUnicodes)
    const keyToAdd = "example"
    const keyToCheck = keyToAdd.toString() //use of 'toString' to make sure not same pointer
    const keyToCheck_different = "notExample"

    it("if no values return false",()=>{
        expect(hashMap.contains(keyToCheck)).toEqual(false)
    })

    it("if there is values but not on the same key, return false",()=>{
        hashMap.add(keyToAdd,["some","values"])
        expect(hashMap.contains(keyToCheck_different)).toEqual(false)
    })

    it("if key exist, return true",()=>{
        expect(hashMap.contains(keyToCheck)).toEqual(true)
    })

    it("if value of key removed, return false",()=>{
        hashMap.remove(keyToCheck)
        expect(hashMap.contains(keyToCheck)).toEqual(false)
    })

})

