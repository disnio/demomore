
const { compose, injectBabelPlugin } = require("react-app-rewired");
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {

    config = rewireCssModules(config, env);
    config = injectBabelPlugin(["import", { libraryName: "antd-mobile", style: "css" }], config);

    return config;
}