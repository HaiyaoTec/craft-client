import {copyFile, getPkgMaifest, writeFile} from '../../utils/file/index.js'
import {execCommand} from "../../utils/shell/index.js";
import {getFrameworkDockerFileConfig} from './FrameworkDockerFile.js'
import {cwd} from "process";

async function frameworkDockerTask() {
    let appDistDir = getPkgMaifest()?.framework?.web?.trim()
    let serverDir = getPkgMaifest()?.framework?.server?.trim()
    if (!appDistDir) {
        appDistDir = 'app/dist'
    }
    if (!serverDir) {
        serverDir = 'server'
    }

    //拷贝app的dist目录
    await copyFile(appDistDir, 'build')
    //拷贝server
    await copyFile(serverDir, 'build')

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
        let frameworkDockerFileConfig = getFrameworkDockerFileConfig(frameworkConfig)
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



