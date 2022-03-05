const srcFolder = 'src/';
const buildFolder = 'dist/';


const path = {
    src:{
        files: [
            `${srcFolder}**/*.*`,
            `!${srcFolder}js/*.js`,
            `!${srcFolder}templates/*.*`,
            `!${srcFolder}scss/*.*`
        ]
    },
    scripts:{
        output:`${buildFolder}js/`,
        src:[
            `${srcFolder}js/index.js`
        ]
    },
    watch:{
        scripts: [ `${srcFolder}js/*.js`, `!${srcFolder}**/*.min.js`],
        html : `${srcFolder}**/*.html`,
        scss: `${srcFolder}**/*.scss`
    },
    srcFolder,
    buildFolder
}


exports.path = path;