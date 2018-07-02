const Got          = require('got');
const EventEmitter = require('events').EventEmitter;
const BlueBird     = require('bluebird');

class ApolloConfig extends EventEmitter {
  constructor(config) {
    super();

    this.config      = config;

    this.host        = '127.0.0.1';
    this.port        = 80;
    this.env         = 'dev';

    this.appId       = '';
    this.clusterName = '';
    this.namespace   = '';
    this.token       = '';

    this.url         = '';
  }

  init() {
    this.config.host && (this.host = this.config.host);
    this.config.port && (this.port = this.config.port);
    this.config.env  && (this.env  = this.config.env);

    this.appId       = this.config.appId;
    this.clusterName = this.config.clusterName;
    this.namespace   = this.config.namespace;
    this.token       = this.config.token;
    
    this.url    = `http://${this.host}:${this.port}/openapi/v1/envs/${this.env}/apps/${this.appId}/clusters/${this.clusterName}/namespaces/${this.namespace}/releases/latest`

    return this;
  }

  async loadConfig(header) {
    console.log('Load Settings From Apollo url [ %s ] header [ %j ]', this.url, header);

    const res = await Got.get(`${this.url}`, header);

    if (!res || !res.body) return {};

    let settings;
    try {
      settings = JSON.parse(res.body);
    } catch (parseBodyErr) {
      console.error("parse json from apollo body failed! %s", res.body);
      throw parseBodyError;
    }

    return settings;
  }

  parseStringToJsonObject(str) {
    if (typeof str !== 'string') return str;

    let parsed;
    try {
      parsed = JSON.parse(str);
      return parsed;
    } catch (parsedFailed) {
      return str;
    }
  }

  async loadKvConfig() {
    const header = {headers: {authorization: this.token,}};
    const settings = await this.loadConfig(header);

    if (!settings || !settings.configurations) return {};

    console.log('Load Settings From Apollo [ %s ], [ %j ]', this.url, settings.configurations);

    const content = {};
    await BlueBird.map(Object.keys(settings.configurations), key => {
      content[key] = this.parseStringToJsonObject(settings.configurations[key]);
    });

    return content;
  }

  async loadJsonConfig() {
    const header = {headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      authorization: this.token,
    }};
    const settings = await this.loadConfig(header);

    if (!settings || !settings.configurations || !settings.configurations.content) return {};

    console.log('Load Settings From Apollo [ %s ], [ %j ]', this.url, settings.configurations.content);

    let content;
    try {
      content = JSON.parse(settings.configurations.content);
    } catch (parseContentError) {
      console.error("parse json from apollo content failed! %s", settings.configurations.content);
      throw parseContentError;
    }

    return content;
  }

  
}

module.exports = ApolloConfig;
