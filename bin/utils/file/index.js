import {createRequire} from "module";
import cpy from "cpy";
import path from "path";
import {cwd} from "process";
const require = createRequire(import.meta.url);
const makeDir = require('make-dir');
let shell = require('shelljs');
const fs = require('fs')


/**
 * 创建指定文件夹
 * @param dir 需要创建的文件目录 tips:创建的时候不要在开头写/了，直接demo/xxx
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
 * 生成指定文件
 * @param dir eg:build/DockerFile
 */
function generateFile(dir) {
    shell.touch(dir)
}

/**
 * 向指定文件写入内容
 * @param dir 指定文件
 * @param content 要写入的内容
 * @returns {Promise<unknown>}
 */
function writeFile(dir, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dir, content, err => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }
            //文件写入成功
            console.log(' writeFile done ！！！')
            resolve()
        })
    })
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

/**
 * 获取PackageJson文件对象
 *
 */
function getPkgMaifest() {
    return require(path.join(cwd(), 'package.json'))
}


export {
    generateDir,
    generateFile,
    writeFile,
    copyFile,
    getPkgMaifest
}
