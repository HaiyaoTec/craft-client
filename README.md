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
| `buildType` | `string` | **Required**  buildType                        | web              |
| `web`       | `string` | **Required**                                   | object           |
| `distDir`   | `string` | **choosable** your web project build directory | **defalut**:dist |

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
| `buildType` | `string` | **Required**  buildType                            | node                          |
| `node`      | `string` | **Required**                                       | object                        |
| `command`   | `string` | **choosable** your node project executable command | **defalut**:node dist/Main.js |

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
| `buildType`  | `string` | **Required**  buildType                                      | framework                     |
| `framework`  | `string` | **Required**                                                 | object                        |
| `web`        | `string` | **choosable** your web project build directory               | **defalut**:app/dist          |
| `server`     | `string` | **choosable** your  node web server project directory        | **defalut**:node dist/Main.js |
| `command`    | `string` | **choosable** your node web server start command             | **defalut**:node dist/Main.js |
| `staticPath` | `string` | **choosable** your node web server static resource directory | **defalut**:client            |

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
  "web": "app",
  "server": "server",
  "command": "node dist/Main.js",
  "staticPath": "client"
  }
}
```
`shell`
```shell
npm run craft-docker
```

## Authors 👨‍💻

- [@sudongyuer](https://github.com/sudongyuer)
- [@Jude95](https://github.com/Jude95)

