import {copyFile, getPkgMaifest, writeFile} from '../../utils/file/index.js'
import {getNodeDockerFileConfig} from './NodeDockerFile.js'
import {cwd} from "process";
import {execCommand} from "../../utils/shell/index.js";
import {createRequire} from "module";
const require = createRequire(import.meta.url);
let shell = require('shelljs');

export async function nodeDockerTask() {


    console.log('currentDir!!!!!!!!!!!!!!!!', cwd())
    const projectRootPath = cwd()

    //node build
    await buildNode()
    shell.cd(projectRootPath)

    // Copy . to build/.
    await copyFile('.', 'build')
    shell.cd(projectRootPath)

    //生成NginxDockerFile
    await generateNodeDockerFile()
    shell.cd(projectRootPath)

    // 生成docker镜像文件
    await generateDockerImage()



}


/**
 * 生成NodeDockerFile文件
 */
function generateNodeDockerFile() {

    return new Promise((resolve, reject) => {
        console.log('generateNodeDockerFile!!!')
        //获取DockerfileConfig
        let nodeDockerFileConfig=getNodeDockerFileConfig(getPkgMaifest()?.craft?.node?.bootCommand)
        //在build目录创建Dockerfile文件
        //向nginx.conf写入配置数据
        writeFile('build/Dockerfile',nodeDockerFileConfig).then(()=>{
            resolve()
        })
        console.log('currentDir', cwd())
    })
}


/**
 * 生成Docker镜像文件
 */
function generateDockerImage() {
    return new Promise((resolve, reject) => {
        const appName = getPkgMaifest().name
        //从项目根目录cd到build目录
        //执行docker build 命令生成镜像文件
        let command = `docker build -t ${appName}:latest .`
        execCommand('build',command).then(()=>{
            resolve()
        })
        console.log('currentDir', cwd())
    })


}

/**
 * 执行web打包命令
 */
function buildNode(){
    return new Promise((resolve, reject) => {
        if(getPkgMaifest()?.craft?.node?.buildCommand==='undefined' || !getPkgMaifest()?.craft?.node?.buildCommand){
            resolve()
        }else {
            execCommand('./',getPkgMaifest()?.craft?.node?.buildCommand??"npm run build").then(()=>{
                resolve()
            })
        }

    })
}
