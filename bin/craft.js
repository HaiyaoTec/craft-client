#!/usr/bin/env node
import {cwd} from 'process';
import path from "path";
import {Command} from 'commander/esm.mjs';
import {createRequire} from "module";
import {frameworkDockerTask, nginxDockerTask, nodeDockerTask} from './tasksUtiles/index.js'
//踩坑，在node中使用esm必须完成路径.js不能简写



const require = createRequire(import.meta.url);


//获取PackgeJson文件信息
let pkgManifest = require(path.join(cwd(), 'package.json'));
//获取craft配置信息对象
let craftConfig = pkgManifest?.craft;

const program = new Command();


program
    .option('-d, --docker', 'generate docker image');

program.addHelpText('after', `
Example call:
  $ craft-h --help`);

program.parse(process.argv);

//获取命令行参数
const options = program.opts();

//根据docker命令执行打包docker镜像
if (options.docker) {

    try {
        //1.输出开始打包docker日志
        console.log(`- craft docker running ^_^ !!!!`);
        //2.获取配置文件信息
        switch (craftConfig.buildType) {
            case "web":
                console.log(`
            ###################
            web docker building
            ###################
            `)

                nginxDockerTask(craftConfig.web.distDir)
                break;
            case "node":
                console.log(`
            ###################
            node docker building
            ###################
            `)

                nodeDockerTask()
                break;
            case "lib":

                console.log('node docker building')

                break;

            case "framework":

                console.log(`
            ###################
            framework docker building
            ###################
            `)

                frameworkDockerTask()

                break;

            default :
                console.log('can not find buildType')
        }
    } catch (e) {
            console.error(`
            ==========================
            craft docker faild ! ! !
            ==========================
            `,e)
    }
}


