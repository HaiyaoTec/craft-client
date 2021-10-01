import {
    copyFile,
    generateFrameworkDockerFile,
    generateDockerImage, showFiglet
} from '../utiles/index.js'



async function frameworkDockerTask() {

    //拷贝app的dist目录
    await copyFile('app/dist','build')
    //拷贝server
     await copyFile('server','build')




    //生成FrameworkDockerFile()
    await generateFrameworkDockerFile()


    // 生成docker镜像文件
    await generateDockerImage()

    //展示craft图案执行完成
    showFiglet()


}

export {
    frameworkDockerTask
}
