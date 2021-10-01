function getFrameworkDockerFileConfig(command='node dist/Main.js'){
    //非空校验
    if(!command || !command.trim()){
        command='node dist/Main.js'
    }
    let commandArray= command.split(' ')//node Main.js
    console.log('++++++++++++++++',commandArray)
    return `
FROM node:14-alpine

WORKDIR /app

COPY app/dist client

COPY server ./

EXPOSE 80

CMD ["${commandArray[0]}","${commandArray[1]}"]
 `
}
export {
    getFrameworkDockerFileConfig
}

