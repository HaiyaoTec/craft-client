
# craft-client
![](https://static01.imgkr.com/temp/0ac8b8268f6b478591479bca5ee3f879.jpg)

Very simple to help you generate docker image

(Finally free of Gradle ^_^)

## Installation

Install craft-client with npm

```bash
  npm install @imf/craft-client -D
```

## Usage
Configure it in package.json

**in web project**

`package.json`

```json
  {
  "scripts": {
    "craft-h": "craft -h",
    "craft-docker": "craft --docker"
  },
  "craft": {
    "buildType": "web",
    "web": {
      "distDir": "dist"
    }
  }
}

```

**in node project**

`package.json`

```json
  {
  "scripts": {
    "craft-h": "craft -h",
    "craft-docker": "craft --docker"
  },
  "craft": {
    "buildType": "node",
    "node": {
      "command": "node app.js"
    }
  }
}

```

**in framework project**

`package.json`

```json
  {
  "scripts": {
    "craft-h": "craft -h",
    "craft-docker": "craft --docker"
  },
  "craft": {
    "buildType": "framework",
    "framework": {
      "web": "app/dist",
      "server": "server",
      "command": "node dist/Main.js",
      "staticPath": "client"
    }
  }
}

```
Then just run the commands in the script

like  `npm run craft-docker` or `npm run craft-h`

- craft-docker (generate dockerImage)
- craft-h (show help message)


## Authors

- [@sudongyuer](https://github.com/sudongyuer)

  
