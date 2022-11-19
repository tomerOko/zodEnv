# welcome to ZodEnv!
##



endvantage of this 
* you can import key-value pares of config from
    - js/ts object
    - .env file
    - JSON file
    - anything that has been loaded to the OS/container environment variable (procces.env)
* you can give priorities
* you can validate
* the validation is a self-documenting code, so no need for the 'example.env'/'config/example.json' file
* you can document with /**\<comment>*/ above every property/sub-object
* you can get a TypedSafe object at the end
* the object is created on the first time any other module will import it (so no problem if an early server initialization stage is dependent on it)

future: 
    * you can lock(freeze) parts of the final env object
    * you

    // "prepare": "npm run build",
