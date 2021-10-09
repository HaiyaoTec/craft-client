export function getNodeDockerFileConfig(command = 'node dist/Main.js') {

    let commandArray = command.split(' ')//node dist/Main.js
    console.log('++++++++++++++++', commandArray)
    return `
FROM node:14-alpine
WORKDIR /app
COPY . ./
EXPOSE 80
CMD ["${commandArray[0]}","${commandArray[1]}"]
 `
}

