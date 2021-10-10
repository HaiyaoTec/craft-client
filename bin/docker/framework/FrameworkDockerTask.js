import {copyFile, getPkgMaifest, writeFile} from '../../utils/file/index.js'
import {execCommand} from "../../utils/shell/index.js";
import {getFrameworkDockerFileConfig} from './FrameworkDockerFile.js'
import {cwd} from "process";
import {createRequire} from "module";
const require = createRequire(import.meta.url);
let shell = require('shelljs');


async function frameworkDockerTask() {

    console.log('currentDir!!!!!!!!!!!!!!!!', cwd())
    const projectRootPath=cwd()

    let webConfig = getPkgMaifest()?.craft?.framework?.web

    let serverConfig = getPkgMaifest()?.craft?.framework?.server


    //执行web打包命令
    await buildWeb()

    shell.cd(projectRootPath)

    console.log('currentDir!!!!!!!!!!!!!!!!', cwd())

    //拷贝app的dist目录
    await copyFile(`${webConfig.dir}\/${webConfig.buildDir}`??"app/dist", 'build')

    //拷贝server
    await copyFile(`${serverConfig.dir}`??"server", 'build')

    //生成FrameworkDockerFile()
    await generateFrameworkDockerFile()

    // 生成docker镜像文件
    await generateDockerImage()


}

export {
    frameworkDockerTask
}

/**
 * 生成FrameworkDockerFile文件
 * @returns {Promise<unknown>}
 */
function generateFrameworkDockerFile() {
    return new Promise((resolve, reject) => {
        console.log('generateFrameworkDockerFile!!!')
        //获取DockerfileConfig
        //获取FrameworkDockerFile配置信息
        let frameworkConfig = getPkgMaifest()?.craft?.framework
        const webConfig=frameworkConfig?.web
        const serverConfig=frameworkConfig?.server
        const staticPath=frameworkConfig?.staticPath
        let frameworkDockerFileConfig = getFrameworkDockerFileConfig(webConfig,serverConfig,staticPath)
        //在build目录创建Dockerfile文件
        //向nginx.conf写入配置数据
        writeFile('build/Dockerfile', frameworkDockerFileConfig).then(() => {
            resolve()
        })
        console.log('currentDir', cwd())
    })
}


/**
 * 生成Docker镜像文件
 */
export function generateDockerImage() {
    return new Promise((resolve, reject) => {
        const appName = getPkgMaifest().name
        //从项目根目录cd到build目录
        //执行docker build 命令生成镜像文件
        let command = `docker build -t ${appName}:latest .`
        execCommand('build', command).then(() => {
            resolve()
        })
        console.log('currentDir', cwd())
    })

}

/**
 * 执行web打包命令
 */
function buildWeb(){
    return new Promise((resolve, reject) => {
        const commandDir=`${getPkgMaifest()?.craft?.framework?.web?.dir}`
        const buildCommand=`${getPkgMaifest()?.craft?.framework?.web?.buildCommand}`
        execCommand(commandDir??"app",buildCommand??"npm run build").then(()=>{
            resolve()
        })
    })
}


