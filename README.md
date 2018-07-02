# Apollo Config Center - NodeJs Client

## What Is This Module Target For?

Recentlly, We're Using [Apollo](https://github.com/ctripcorp/apollo) As Config Center, 
And The Official Suggested NodeJS Module Doesn't Works Well, So We Do This Module To 
Load Data From Apollo Config Center.


## Installation

`npm install apollo-config --save` 

or 

`yarn add apollo-config`

Then Require The Module:

`const ApolloConfig = require('apollo-config');`


## Quick Start

Maybe You Need To Config And Start Apollo In The Right Place First, See https://github.com/ctripcorp/apollo/wiki/Quick-Start

Config The Right Type Of Configuration As You Want, We Currently Support Json And Properties Type.

If You're Using Json Type,

```js
  const jsonConfig = new ApolloConfig(config.jsonRepo).init();
  const jsonCfg = await jsonConfig.loadJsonConfig();
  console.log('config [ %o ]', jsonCfg);
```

If You're Using Properties Type,

```js
  const kvConfig = new ApolloConfig(config.kvRepo).init();
  const kvCfg = await kvConfig.loadKvConfig();
  console.log('config [ %o ]', kvCfg);
```

And The `config` Is Just Like This:

```js
module.exports = {
  jsonRepo: {
    host        : '127.0.0.1',
    port        : 8080,

    env         : 'dev',
    clusterName : 'default',
    namespace   : 'filename.json',

    appId       : 'appId from http://ip:port/open/manage.html',
    token       : '32 bytes string together with appid',
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

## FAQ

1. Where Can I Find The `env`, `clusterName`, `namespace`, `appId` And `token`?

You Can Find All The Values Of The Config In The Apollo Dashboard, 
Some Of Them Must Config As Admin User, Such As `appId` And `token`, 
And The Others Are Commenly Configured As Common Users.


