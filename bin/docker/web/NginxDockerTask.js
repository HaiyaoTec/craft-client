import {execCommand} from '../../utils/shell/index.js'
import {copyFile, generateFile, getPkgMaifest, writeFile} from "../../utils/file/index.js";
import {cwd} from "process";
import {getNginxConfig} from './NginxConfig.js'
import {getNginxDockerFileConfig} from './NginxDockerFile.js'

export async function nginxDockerTask(buildDir = 'dist') {
    //多加一次为空串的判断，防止后边cpy拷贝所有目录
    if (!buildDir) buildDir = "dist"

    //执行web打包命令
    await buildWeb()
    // Copy buildDir to build/buildDir
    await copyFile(buildDir, 'build')

    //生成NginxConfig
    await generateNginxConfig()

    //生成NginxDockerFile
    await generateNginxDockerFile()

    // 生成docker镜像文件
    await generateDockerImage()


}



/**
 * 生成nginxConfig
 */
function generateNginxConfig() {
    return new Promise((resolve, reject) => {

        //读取配置字符串
        let nginxConfig = getNginxConfig();
        //创建目标文件夹build
        // generateDir('build')
        //在build目录创建nginx.conf文件
        generateFile('build/nginx.conf')
        //向nginx.conf写入配置数据
        writeFile('build/nginx.conf', nginxConfig).then(() => {
            resolve()
        })
        console.log('currentDir', cwd())
    })
}

/**
 * 生成NginxDockerFile文件
 */
function generateNginxDockerFile() {
    return new Promise((resolve, reject) => {
        console.log('generateNginxDockerFile!!!')
        //获取DockerfileConfig
        let nginxDockerFileConfig = getNginxDockerFileConfig();
        //在build目录创建Dockerfile文件
        generateFile('build/Dockerfile')
        //向NginxDockerFile.conf写入配置数据
        writeFile('build/Dockerfile', nginxDockerFileConfig).then(() => {
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
        //在指定目录 执行docker build 命令生成镜像文件
        let command = `docker build -t ${appName}:latest .`
        execCommand('build', command).then(() => {
            resolve()
        })
    })

}

/**
 * 执行web打包命令
 */
function buildWeb(){
    return new Promise((resolve, reject) => {
        execCommand('./',getPkgMaifest()?.craft?.web?.buildCommand??"npm run build").then(()=>{
            resolve()
        })
    })
}
