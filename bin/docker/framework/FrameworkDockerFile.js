export function getFrameworkDockerFileConfig(web,server,staticPath="client"){
    let commandArray= server?.bootCommand?.split(' ')//node Main.js
    if(!commandArray)commandArray=['node','Main.js']
    console.log('++++++++++++++++',commandArray)


    return `
FROM node:14-alpine

WORKDIR /app

COPY ${web.dir??"app"}\/${web.buildDir??"dist"} ${staticPath??"client"}

COPY ${server.dir??"server"} ./

EXPOSE 80

CMD ["${commandArray[0]}","${commandArray[1]}"]
 `
}


