import {Buffer} from 'buffer'
import hashFromStringUnicodes from './hashBasedStractures/hashFromStringUnicodes'
import { HashSet, HashSetInterface } from './hashBasedStractures/hashSet'

type commandType = "initializeDataStracture" | "add" | "contains" | "remove"
type commandValue = [number] | []
type commandsCollection = [Array<commandType>, Array<commandValue>]


class Main{

    public static hashSet:HashSetInterface<any> | null = null

    public static executable(){
    
        const userCommandTypes: Array<commandType> = ["initializeDataStracture", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
        const userCommandsValues: Array<commandValue|[]> =[[], [1], [2], [1], [3], [2], [2], [2], [2]]
        const userInput: commandsCollection = [ userCommandTypes, userCommandsValues ]
    
        const result = executeCommandsCollection(userInput)
        console.log('result:  ',result)

        const expectedResult = [null, null, null, true, false, null, true, null, false]
        console.log('expected:  ', expectedResult)
        console.log('is the result equeal to expected result',compareArrays(expectedResult, result))
    
    }
}


const executeCommandsCollection = (userCommnds:commandsCollection):Array<boolean|null> => {
    const result : Array<boolean|null> = []
    userCommnds[0].forEach((value,index)=>{
        result.push(executeSingleCommand(value, userCommnds[1][index]))
    })
    return result;
}


const executeSingleCommand = (command : commandType, value: commandValue) : (null | boolean) => {
    switch (command) {
        case 'initializeDataStracture':
            Main.hashSet = new HashSet<[number]>(hashFromStringUnicodes, (a: [number], b:[number])=>a[0]==b[0]) 
            return null
            break;
        case 'add':
            return Main.hashSet?.add(value) ? null : false
        case 'contains':
            return Main.hashSet?.contains(value)
        case 'remove':
            return Main.hashSet?.remove(value) ? null : false
        default:  
            return null
            break;
    }
}

const compareArrays = (array1:Array<any>, array2:Array<any>):boolean => {
    try {
        array1.forEach((value,index)=>{
            if(value!==array2[index]) throw "inequeivalent found"
        })
        return true
    } catch (error) { return false }
}


Main.executable()



/**
 * todo: 
 * 
 * add tests 
 * save tsconfig.json & lucnch.json into template V
 * make it all run V
 */