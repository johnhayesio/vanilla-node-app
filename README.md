# ```Vanilla Node App```

[![Patreon](https://img.shields.io/badge/-Patreon-red?logo=patreon&colorA=gray)](https://patreon.com/lifefullofchange) [![Ko-fi](https://img.shields.io/badge/-Buy%20me%20a%20coffee-orange?logo=ko-fi&logoColor=orange&colorA=gray)](https://ko-fi.com/lifefullofchange) [![Ask me anything!](https://img.shields.io/badge/Ask%20me-ANYTHING-1abc9c.svg)](https://github.com/johnhayesio/ama) ![GitHub Repo Size](https://img.shields.io/github/repo-size/johnhayesio/vanilla-node-app) ![GitHub language count](https://img.shields.io/github/languages/count/johnhayesio/vanilla-node-app) ![GitHub top language](https://img.shields.io/github/languages/top/johnhayesio/vanilla-node-app) ![GitHub last commit](https://img.shields.io/github/last-commit/johnhayesio/vanilla-node-app?color=red) [![Analytics](https://ga-beacon.appspot.com/UA-158277243-2/github.com/johnhayesio/vanilla-node-app/README.md?pixel)](https://github.com/johnhayesio/vanilla-node-app)

> An app created with vanilla Node methods

## How to use

Execute app entry point (index.js) using NODE_ENV set to development or production:

```bash
NODE_ENV=development node index.js
```

## HTTPS protocol usage

In order to use the HTTPS protocol, a key and certificate must be created in a folder named https:

```bash
mkdir -p https
cd https

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

![Key/Cert Creation](./assets/https_setup.gif)
