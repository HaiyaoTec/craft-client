import {copyFile, generateDockerImage, generateNodeDockerFile, showFiglet} from '../utiles/index.js'



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
