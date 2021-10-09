import {createRequire} from "module";
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







export {
    execCommand
}
