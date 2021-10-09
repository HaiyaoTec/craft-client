function getFrameworkDockerFileConfig({web='app/dist',server='server',command='node dist/Main.js',staticPath='client'}){
    //非空校验
    // if(!command || !command.trim()){
    //     command='node dist/Main.js'
    // }
    let commandArray= command.split(' ')//node Main.js
    console.log('++++++++++++++++',commandArray)

    // if(!web || !web.trim()){
    //     web='app/dist'
    // }
    //
    // if(!server || !server.trim()){
    //     server='server'
    // }
    //
    // if(!staticPath || !staticPath.trim()){
    //     staticPath='client'
    // }

    return `
FROM node:14-alpine

WORKDIR /app

COPY ${web} ${staticPath}

COPY ${server} ./

EXPOSE 80

CMD ["${commandArray[0]}","${commandArray[1]}"]
 `
}
export {
    getFrameworkDockerFileConfig
}

