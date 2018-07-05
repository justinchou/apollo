# Apollo  配置中心客户端 - NodeJS版本

## 为什么要使用本模块?

最近我们在使用 [Apollo](https://github.com/ctripcorp/apollo) 作为项目的配置中心,
 官方推荐的 NodeJS 模块似乎不是很好用, 所以我们开发了一个我们自己的可用版本.
虽然没有实现官方何种复杂接口和不同情境下的境况, 但是能够完成初级的配置获取操作.


## 安装

`npm install apollo-config --save` 

或者使用 yarn:

`yarn add apollo-config`

引入依赖:

`const ApolloConfig = require('apollo-config');`


## 快速开始

首先需要安装并配置 Apollo 服务, 参考官方文档: https://github.com/ctripcorp/apollo/wiki/Quick-Start

我们目前支持的配置格式为 JSON 和 Properties 类型.

如果使用 JSON 类型的配置, 那么需要使用下面代码获取配置:

```js
  const jsonConfig = new ApolloConfig(config.jsonRepo).init();
  const jsonCfg = await jsonConfig.loadJsonConfig();
  console.log('config [ %o ]', jsonCfg);
```

如果是 Properties 类型:

```js
  const kvConfig = new ApolloConfig(config.kvRepo).init();
  const kvCfg = await kvConfig.loadKvConfig();
  console.log('config [ %o ]', kvCfg);
```

在执行之前, 还需要编辑配置文件指定 Apollo 的相关参数:

```js
module.exports = {
  jsonRepo: {
    host        : '127.0.0.1', // Apollo 服务器地址
    port        : 8080,        // Apollo 服务端口

    env         : 'dev',       // 配置的环境
    clusterName : 'default',   // 配置的集群
    namespace   : 'filename.json',  // 配置的命名空间, 建议 json 形式使用文件名为命名空间

    appId       : 'appId from http://ip:port/open/manage.html',  // 申请的应用 Id
    token       : '32 bytes string together with appid',         // 申请的应用权限 token
  },

  kvRepo: {
    host        : '127.0.0.1',
    port        : 8080,

    env         : 'dev',
    clusterName : 'cluster name defined under env',
    namespace   : 'namespace defined under cluster',

    appId       : 'appId from http://ip:port/open/manage.html',
    token       : '32 bytes string together with appid',
  },

};
```

## 常见问题

1. 在哪里找到配置文件里面的 `env`, `clusterName`, `namespace`, `appId` 和 `token`?

在 Apollo 的控制台可以获取上面的配置信息, 有些必须使用管理员账号授权才能获取到,
例如`appId`和`token`, 其他的直接可以使用配置所有者账号在界面上获取.


