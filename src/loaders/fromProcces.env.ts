import rfdc from 'rfdc'
const clone = rfdc()

interface MapFunciton<from,to> {
    (input: from) :to
}

export interface nestedObject<valueType> extends Record<string, nestedObject<valueType>|valueType > {}

type NestedMapFunctionGeneric =  <from,to>(input: nestedObject<from | to>, mapFunciton:MapFunciton<from,to>) => nestedObject<to>

const isNumeric = (n:any) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const stringToNumberOrBoolean = (input:string) => {
    if(typeof input!=='string') return input
    if(isNumeric(input)) return parseFloat(input)
    if(input==='true' || input === 'TRUE') return true
    if(input==='false' || input === 'FALSE' ) return false
    return input
}

const nestedMap: NestedMapFunctionGeneric = (input, mapFuncion) => {
    type to = ReturnType<typeof mapFuncion>
    type from = Parameters<typeof mapFuncion>[0]
    const keys = Object.keys(input);
    for(let i=0; i< keys.length; i++){
        if(!input.hasOwnProperty(keys[i])) continue;
        if(typeof input[keys[i]] === 'object' && input[keys[i]] !== null){
            nestedMap(input[keys[i]] as nestedObject<from>, mapFuncion)
        }else{ 
            input[keys[i]] = mapFuncion(input[keys[i]] as from)
        }
    }
    return input as unknown as nestedObject<ReturnType< typeof mapFuncion>>
}

export const fromProcces = () => nestedMap(process.env as Record<string, string> , stringToNumberOrBoolean)
