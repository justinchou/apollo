const ApolloConfig = require('./index.js');
const config = require('./config.js');

(async () => {
  const jsonConfig = new ApolloConfig(config.jsonRepo).init();
  const jsonCfg = await jsonConfig.loadJsonConfig();
  console.log('config [ %o ]', jsonCfg);

  const kvConfig = new ApolloConfig(config.kvRepo).init();
  const kvCfg = await kvConfig.loadKvConfig();
  console.log('config [ %o ]', kvCfg);
})();
