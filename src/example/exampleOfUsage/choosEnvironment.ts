// environment variables from diffrent sources was loaded here
import * as environmentsENVs from './loadENVsFromAllSources'

// for readability lets add all environment variables to one object
const allEnvironmentsConfigs = {
    prod: environmentsENVs.prodENVs,
    dev: environmentsENVs.devENVs,
    local: environmentsENVs.localENVs,
    staging: environmentsENVs.stagingENVs,
    test: environmentsENVs.testENVs,
}

// what invironment configs we want to run, MAKE SURE THE VALUE IS ONE EQUAL TO ONE OF THE KEYS IN 'allEnvironmentsConfigs'
const invironment = (process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'local') as keyof typeof allEnvironmentsConfigs
// choose configs by environment
const invironmentConfigs = allEnvironmentsConfigs[invironment]

export{invironmentConfigs, allEnvironmentsConfigs}
