import {
    generateNginxDockerFile,
    generateNginxConfig,
    generateDockerImage,
    copyFile
} from '../utiles/index.js'

import {showFiglet} from "../utiles/index.js";



async function nginxDockerTask(buildDir = 'dist') {
    //多加一次为空串的判断，防止后边cpy拷贝所有目录
    if(!buildDir)buildDir="dist"

    // Copy buildDir to build/buildDir
    await copyFile(buildDir,'build')

    //生成NginxConfig
    await generateNginxConfig()

    //生成NginxDockerFile
    await generateNginxDockerFile()

    // 生成docker镜像文件
    await generateDockerImage()

    //展示craft图案执行完成
    showFiglet()

}

export {
    nginxDockerTask
}
