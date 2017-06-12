let fs = require('fs');
let path = require('path');
let babel = require('babel-core');

let babelOptions = {
    presets: [
        'focus'
    ],
    sourceMaps: 'inline'
};

let walk = function (dir) {
    let files = [];
    let list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) files = files.concat(walk(file));
        else files.push(file);
    });
    return files;
};

let filterFiles = function (files) {
    return files.filter(function (file) {
        return (!file.match(/(example|__tests__)/) && file.match(/\.js$/));
    });
};

function ensureDirectoryExistence(filePath) {
    let dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

let files = filterFiles(walk('./src'));
files.forEach(function (file) {
    babel.transformFile(file, babelOptions, function (err, result) {
        if (err) console.error(err);
        let newFile = file.replace('./src', '.');
        ensureDirectoryExistence(newFile);
        fs.writeFile(newFile, result.code, function (err) {
            if (err) console.error(err);
            console.log('Babelified ' + file);
        });
    });
});
