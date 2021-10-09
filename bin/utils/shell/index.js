import {createRequire} from "module";
import {Command} from 'commander/esm.mjs';
const require = createRequire(import.meta.url);
let shell = require('shelljs');



/**
 * 在指定目录执行命令
 * @param dir 需要进入的文件夹
 * @param command 需要执行的命令
 * @returns {Promise<unknown>}
 */
function execCommand(dir, command) {
    return new Promise((resolve, reject) => {
        //进入到目标文件
        shell.cd(dir)
        if (shell.exec(command).code !== 0) {
            shell.exit(1);
            reject('Command exec failed')
        } else {
            console.log('Command exec  done ^_^ ! ! !')
            resolve()
        }
    })
}


/**
 * 初始化命令行，并获取命令参数
 * @returns {OptionValues}
 */
function getCommandOptions() {
    //初始化命令行帮助信息
    const program = new Command();
    program.option('-d, --docker', 'generate docker image');
    program.addHelpText('after', `
Example call:
  $ craft-h --help`);
//解析命令行参数
    program.parse(process.argv);

//获取命令行参数
    return program.opts()
}



export {
    execCommand,
    getCommandOptions
}
