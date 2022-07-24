import {z, sources, initializeEnv, loaders} from '../../index'

// import environment variables (key value pairs) from files
import developmentENVsFile from '../files/environment/dev.json'
import localRunENVsFile from '../files/environment/localRun.json'
import productionENVsFile from '../files/environment/production.json'
import stagingENVsFile from '../files/environment/staging.json'
import testENVsFile from '../files/environment/testConfigs'
const GCP_SecretsFilePath = './files/GCP/gcpSecrets.json' 
const serviceMeshFilePath = './files/GCP/serviceMesh.json'

//some files need to be loaded (un like json that can be loaded directly)
const secrets = loaders.fromENV('/src/ZodEnv/example/files/GCP/GCP_Secrets.env')
const serviceMesh = loaders.fromENV('/src/ZodEnv/example/files/GCP/GCP_ServiceMesh.env')
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