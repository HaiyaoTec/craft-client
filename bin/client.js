#!/usr/bin/env node
import {dockerFramework,dockerNode,dockerWeb} from './docker/index.js'
import {getCommandOptions} from './utils/shell/index.js'
import figlet from 'figlet'
import chalk from 'chalk';
import {getPkgMaifest} from "./utils/file/index.js";
//tips:踩坑，在node中使用esm必须完成路径.js不能简写

//获取PackageJson文件信息
let pkgManifest = getPkgMaifest();

//获取craft配置信息对象
let craftConfig = pkgManifest?.craft;

//初始化命令行帮助信息，并获取命令行参数
const options = getCommandOptions()

//根据docker命令执行打包docker镜像
if (options.docker) {

    try {
        //1.输出开始打包docker日志
        console.log(`- craft docker running ^_^ !!!!`);
        showFiglet()
        //2.获取配置文件信息
        switch (craftConfig && craftConfig.buildType) {
            case "web":
                console.log(`
            ###################
            web docker building
            ###################
            `)

                dockerWeb(craftConfig.web.distDir)
                break;
            case "node":
                console.log(`
            ####################
            node docker building
            ####################
            `)

                dockerNode()
                break;
            case "lib":

                console.log('node docker building')

                break;

            case "framework":

                console.log(`
            #########################
            framework docker building
            #########################
            `)

                dockerFramework()

                break;

            default :
                console.log('can not find buildType')
        }
    } catch (e) {
        console.error(`
            ==========================
            craft docker faild ! ! !
            ==========================
            `, e)
    }
}


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

