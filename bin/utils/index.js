import figlet from 'figlet'
import {cwd} from 'process';
import {createRequire} from "module";
import chalk from 'chalk';



import path from "path";
import cpy from "cpy";
import {
    getFrameworkDockerFileConfig,
    getNginxConfig,
    getNginxDockerFileConfig,
    getNodeDockerFileConfig
} from "../config/index.js";


const require = createRequire(import.meta.url);
const fs = require('fs')
const makeDir = require('make-dir');
let shell = require('shelljs');
//获取PackgeJson文件信息
let pkgManifest = require(path.join(cwd(), 'package.json'));

/**
 * 展示文字图片
 */
function showFiglet() {
    figlet?.text('C r a f t !!!', {
        font: 'Graffiti',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.blue(data));
    });
}

/**
 * 创建指定文件夹
 * @param dir 需要创建的文件目录,创建的时候不要在开头写/了，直接demo/xxx
 */
function generateDir(dir) {
    (async () => {
        const paths = await Promise.all([
            makeDir(dir)
        ]);
        // 打印生成出来的文件目录
        console.log('generateDirPath', paths);

    })();
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
        shell.touch('build/Dockerfile')
        //向nginx.conf写入配置数据
        fs.writeFile('build/Dockerfile', nginxDockerFileConfig, err => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }
            //文件写入成功
            console.log('nginxDockerFileConfig write done ！！！')
            resolve()
        })
        console.log('currentDir', cwd())
    })
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
        shell.touch('build/nginx.conf')
        //向nginx.conf写入配置数据
        fs.writeFile('build/nginx.conf', nginxConfig, err => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }
            //文件写入成功
            console.log('nginxConfig generat done ！！！')
            resolve()
        })


        console.log('currentDir', cwd())
        //将nginxConfig字符串写入nginx.conf文件
        //TODO
    })

}

/**
 * 生成Docker镜像文件
 */
function generateDockerImage() {
    return new Promise((resolve, reject) => {
        const appName = pkgManifest.name
        //从项目根目录cd到build目录
        shell.cd('build')
        console.log('currentDir', cwd())
        //执行docker build 命令生成镜像文件
        let command = `docker build -t ${appName}:latest .`
        if (shell.exec(command).code !== 0) {
            shell.echo('Error: docker build failed');
            shell.exit(1);
            reject()
        } else {
            console.log('generateDockerImage done ^_^ ! ! !')
            resolve()
        }
    })


}

/**
 * 生成NodeDockerFile文件
 */
function generateNodeDockerFile() {

    return new Promise((resolve, reject) => {
        console.log('generateNodeDockerFile!!!')
        //获取DockerfileConfig
        let nodeDockerFileConfig=getNodeDockerFileConfig(pkgManifest?.craft?.node?.command)
        //在build目录创建Dockerfile文件
        shell.touch('build/Dockerfile')
        //向nginx.conf写入配置数据
        fs.writeFile('build/Dockerfile', nodeDockerFileConfig, err => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }
            //文件写入成功
            console.log('nodeDockerFileConfig write done ！！！')
            resolve()
        })
        console.log('currentDir', cwd())
    })


}

/**
 * 生成NodeDocker镜像文件
 */
function generateNodeDockerImage(){
   return  generateDockerImage()

}

/**
 * 拷贝文件的方法
 * @param src 指定目标文件或文件件位置 demo/dir or demo/dir/file.xxx
 * @param dest 需要拷贝到哪里去
 * @param options 拷贝文件时的配置
 * @returns {Promise<void>}
 */
async function copyFile(src, dest,options={
    parents: true,
    flat: false,
    overwrite: true
}) {
    await cpy(src, dest, options);
    console.log('Files copied!');
}


function generateFrameworkDockerFile(){
    return new Promise((resolve, reject) => {
        console.log('generateFrameworkDockerFile!!!')
        //获取DockerfileConfig
        let frameworkDockerFileConfig=getFrameworkDockerFileConfig()
        //在build目录创建Dockerfile文件
        shell.touch('build/Dockerfile')
        //向nginx.conf写入配置数据
        fs.writeFile('build/Dockerfile', frameworkDockerFileConfig, err => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }
            //文件写入成功
            console.log('frameworkDockerFileConfig write done ！！！')
            resolve()
        })
        console.log('currentDir', cwd())
    })
}

export {
    showFiglet,
    generateDir,
    copyFile,
    generateNginxDockerFile,
    generateNginxConfig,
    generateDockerImage,
    generateNodeDockerFile,
    generateNodeDockerImage,
    generateFrameworkDockerFile
}
