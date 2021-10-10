# craft-client ✨

![](https://static01.imgkr.com/temp/0ac8b8268f6b478591479bca5ee3f879.jpg)

Very simple to help you generate docker image

(Finally free of Gradle ^_^)

## Installation 🌝

Install craft-client with npm

```bash
  npm install @imf/craft-client -D
```

## Usage 🍉

### Step 1

> Configure it in package.json

#### In web project Config Reference 🤖

`web`

| Parameter   | Type     | Description                                    | value            |
| :---------- | :------- | :--------------------------------------------- | :--------------- |
| `buildType` | `string` | **Required**  build type                        | web              |
| `web`       | `string` | **Required**                                   | object           |
| `distDir`   | `string` | **choosable** your web project build directory | **defalut**:dist |
| `buildCommand`   | `string` | **Required** your web project build command | **defalut**:npm run build |
`package.json`

```json
  "craft": {
    "node": "web",
    "web": {
        "distDir": "dist",
        "buildCommand": "npm run build"
    }
}

```

#### In node project Config Reference 🤖

`node`

| Parameter   | Type     | Description                                        | value                         |
| :---------- | :------- | :------------------------------------------------- | :---------------------------- |
| `buildType` | `string` | **Required**  build type                            | node                          |
| `node`      | `string` | **Required**                                       | object                        |
| `bootCommand`   | `string` | **choosable** your node project executable command | **defalut**:node dist/Main.js |

`package.json`

```json
  "craft": {
    "buildType": "node",
    "node": {
      "bootCommand": "node app.js"
    }
}
```

#### In framework project Config Reference 🤖

`framework`

| Parameter    | Type     | Description                                                  | value                         |
| :----------- | :------- | :----------------------------------------------------------- | :---------------------------- |
| `buildType`  | `string` | **Required**  build type                                    | framework                     |
| `framework`  | `string` | **Required**                                                 | object                        |
| `staticPath`  | `string` | **choosable** the static resource path                                                | **defalut**:client                        |
| `web`        | `string` | **Required**             | object          |
| web `dir`        | `string` | **Required** the web project directory            | app          |
| web `buildDir`        | `string` | **Required**   the web project build directoryName          | dist          |
| web `buildCommand`        | `string` | **choosable**             |**default**: npm run build          |
| `server`        | `string` | **Required**             | object          |
| server `dir`        | `string` | **Required**  the web server directory           | server          |
| server `bootCommand`        | `string` | **choosable** the web server boot command            |**defalut**:node dist/Main.js           |
`package.json`

```json
  "craft": {
    "buildType": "framework",
    "framework": {
        "web":{
          "dir":"app",
          "buildDir":"dist",
          "buildCommand":"npm run build"
        }, 
        "server": {
            "dir" :"server",
            "bootCommand": "node dist/Main.js"
        },
        "staticPath": "client"
    }
}

```

### Step 2

> Then just run the commands in the script

like  `npm run craft-docker` or `npm run craft-h`

- craft-docker (generate dockerImage)
- craft-h (show help message)

## Example

`package.json`

```json
"scripts": {
"craft-h": "craft -h",
"craft-docker": "craft --docker"
},
"craft": {
  "buildType": "framework",
    "framework": {
    "staticPath": "client",
    "web":{
        "dir":"app",
        "buildDir":"dist",
        "buildCommand":"npm run build"
    },
    "server": {
        "dir" :"server",
        "bootCommand": "node dist/Main.js"
    }
  }
}
```
`shell`
```shell
npm run craft-docker
```

## Authors 👨‍💻

- [@sudongyuer](https://github.com/sudongyuer)

