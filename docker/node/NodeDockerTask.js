import {copyFile, writeFile} from '../../utils/file/index.js'
import {getNodeDockerFileConfig} from './NodeDockerFile.js'
import {cwd} from "process";
import {execCommand,showFiglet,getPkgMaifest} from "../../utils/shell/index.js";


async function nodeDockerTask() {

    // Copy . to build/.
    await copyFile('.', 'build')

    //生成NginxDockerFile
    await generateNodeDockerFile()

    // 生成docker镜像文件
    await generateDockerImage()

    //展示craft图案执行完成
    showFiglet()


}

export {
    nodeDockerTask
}

/**
 * 生成NodeDockerFile文件
 */
function generateNodeDockerFile() {

    return new Promise((resolve, reject) => {
        console.log('generateNodeDockerFile!!!')
        //获取DockerfileConfig
        let nodeDockerFileConfig=getNodeDockerFileConfig(getPkgMaifest()?.craft?.node?.command)
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
