import {z, sources, initializeEnv, loaders} from '../ZodEnv'

import development from './files/environment/dev.json'
import localRun from './files/environment/localRun.json'
import production from './files/environment/production.json'
import staging from './files/environment/staging.json'
import test from './files/environment/testConfigs'

const fromK8sOrDocker = loaders.fromProcces()
const secrets = loaders.fromENV('/src/ZodEnv/example/files/GCP/GCP_Secrets.env')
const serviceMesh = loaders.fromENV('/src/ZodEnv/example/files/GCP/GCP_ServiceMesh.env')

const environmentTypes = {
    prod: production,
    production,
    dev: development,
    development,
    local: localRun,
    localRun,
    staging,
    test
}

const environmentConfigs = environmentTypes[process.env.NODE_ENV as keyof typeof environmentTypes]


//TODO: in the schema: add more usage of the diffrent env sources 

const userWritenEnvSchema = z.object({
    /**some comment about the filed the url/ */
    dbUrl : z.string().default(environmentConfigs.DB.service.url),
    /** if no pussword needed set defalt to '' */
    dbPass : z.string().default(sources(['a','b','c'])),
    stripe : z.object({
        userID : z.number(sources([null,2,], 7)),
        chargeEndpoint : z.string(sources(['a','b','c'],'http://localhost:2702'))
    })
})

const ENVs = initializeEnv(userWritenEnvSchema)

export default ENVs

