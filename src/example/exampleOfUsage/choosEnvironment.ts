// basicaly the 'import' below importing key value pairs config files
// this object was loaded from diffrent sources (json, .env, js files, or from procces.env)
// it is recomended to have a look at the file
import * as environments from './loadENVsFromAllSources'

// for readability lets add all environment variables to one object
const allEnvironmentsConfigs: Record<string,any> = {
    prod: environments.prodENVs,
    dev: environments.devENVs,
    local: environments.localENVs,
    staging: environments.stagingENVs,
    test: environments.testENVs,
}

// what invironment configs we want to run, MAKE SURE THE VALUE IS ONE EQUAL TO ONE OF THE KEYS IN 'allEnvironmentsConfigs'
const invironment = (environments.proccesENVs.NODE_ENV !== undefined ? process.env.NODE_ENV : 'local') as keyof typeof allEnvironmentsConfigs
// choose configs by environment
const invironmentConfigs = allEnvironmentsConfigs[invironment]

// add the rest of the configs sources (that cant be a 'main invironment') to the allEnvironmentsConfigs object before exporting it
allEnvironmentsConfigs.secrets = environments.secrets
allEnvironmentsConfigs.serviceMesh = environments.serviceMesh
allEnvironmentsConfigs.proccesENVs = environments.proccesENVs

export{invironmentConfigs, allEnvironmentsConfigs}
