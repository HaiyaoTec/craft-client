export function getFrameworkDockerFileConfig({web='app/dist',server='server',command='node dist/Main.js',staticPath='client'}){

    let commandArray= command.split(' ')//node Main.js
    console.log('++++++++++++++++',commandArray)


    return `
FROM node:14-alpine

WORKDIR /app

COPY ${web} ${staticPath}

COPY ${server} ./

EXPOSE 80

CMD ["${commandArray[0]}","${commandArray[1]}"]
 `
}


