
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

`package.json`
```javascript
  {
  "scripts": {
    "craft-h": "craft -h",
    "craft-docker": "craft --docker"
  },
  "craft": {
    "buildType": "framework",
    "web": {
      "distDir": ""
    },
    "node": {
      "command": ""
    },
    "framework": {
      "web": "",
      "server": ""
    }
  }
}

```
Then just run the commands in the script

like `npm run craft-h` or `npm run craft-docker`


## Authors

- [@sudongyuer](https://github.com/sudongyuer)

  
