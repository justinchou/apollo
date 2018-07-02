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
