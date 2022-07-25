import {z, findFirstNoneEmpty, initializeEnv, loaders} from '../../index'

// import environment variables (key value pairs) from files
import developmentENVsFile from '../keyValuePairsConfigsfiles/environment/dev.json'
import localRunENVsFile from '../keyValuePairsConfigsfiles/environment/localRun.json'
import productionENVsFile from '../keyValuePairsConfigsfiles/environment/production.json'
import stagingENVsFile from '../keyValuePairsConfigsfiles/environment/staging.json'
import testENVsFile from '../keyValuePairsConfigsfiles/environment/testConfigs'
const GCP_SecretsFilePath = './files/GCP/gcpSecrets.json' 
const serviceMeshFilePath = './files/GCP/serviceMesh.json'

//some files need to be loaded (un like json that can be loaded directly)
const secrets = loaders.fromENV('/src/example/keyValuePairsConfigsfiles/GCP/gcpSecrets.env')
const serviceMesh = loaders.fromENV('/src/example/keyValuePairsConfigsfiles/GCP/serviceMesh.env')
// there is also a loader for env's stored on the operating system
const proccesENVs:loaders.nestedObject<string | number | boolean> = loaders.fromProcces()

export {
    developmentENVsFile as devENVs,
    localRunENVsFile as localENVs,
    productionENVsFile as prodENVs,
    stagingENVsFile as stagingENVs,
    testENVsFile as testENVs,
    secrets,
    serviceMesh,
    proccesENVs
}