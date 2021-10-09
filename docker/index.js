import {nginxDockerTask as dockerWeb} from './web/NginxDockerTask.js'
import {nodeDockerTask as dockerNode} from './node/NodeDockerTask.js'
import {frameworkDockerTask as dockerFramework } from './framework/FrameworkDockerTask.js'

export {
    dockerWeb,
    dockerNode,
    dockerFramework
}
