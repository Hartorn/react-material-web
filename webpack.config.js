const webpack = require('webpack');
const path = require('path');

const ConfigBuilder = require('webpack-focus/webpack-utilities/config-builder');
const envParser = require('webpack-focus/webpack-utilities/env-parser');

const parsedEnv = envParser(process.env);

// Création de la config basique
const config = new ConfigBuilder();

// Ajout du point d'entrée
config.addEntry('./src');

// Ajout du fichier 
config.setOuputPath('./dist');
// config.setAssetsPublicPath(parsedEnv.OUTPUT_PUBLIC_PATH);
config.setFilename(parsedEnv.MINIMIFY ? parsedEnv.npm_package_name + '.min' : parsedEnv.npm_package_name);
config.useSourceMaps(parsedEnv.SOURCE_MAPS);

// Ajout des variables injectées
config.addDefinedVariable('process.env.NODE_ENV', JSON.stringify(parsedEnv.NODE_ENV));

config.addExternal('prop-types', 'PropTypes');
config.addExternal('react', 'React');
config.addExternal('react-dom', 'ReactDOM');
config.addExternal('@material', 'mdc');
config.addExternal('material-components-web', 'mdc');

config.addExternal('@material/ripple', 'mdc.ripple');
config.addExternal('@material/icon-toggle', 'mdc.iconToggle');

// GESTION DES PLUGINS
// Les fonctions seront résolues au moment de la création de la config webpack.
config.addPlugin(10, () => new webpack.DefinePlugin(config.getDefinedVariables()));

// Gestion de la minification
if (parsedEnv.MINIMIFY) {
    config.addPlugin(50, new webpack.optimize.UglifyJsPlugin({
        compressor: {
            screw_ie8: true,
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            passes: 2
        }
    }));
}

// GESTION DES LOADERS
// Loader pour les source-map
if (parsedEnv.SOURCE_MAPS) {
    config.addComplexLoader(10, {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules\\css-loader/,
        loader: 'source-map-loader'
    });
}
// Loader pour Babel (transpile ES6 => ES5, exclude des node_modules, attendus en ES5)
config.addComplexLoader(20, {
    test: /\.(js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
        presets: ['babel-preset-focus']
    }
});

module.exports = config.toWebpackConfig(envParser(process.env));