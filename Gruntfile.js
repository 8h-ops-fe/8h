module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        copy: { // 1. 复制目录
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/app/', // cwd指定路径，但不拷贝路径
                        src: ['styles/**'], // 拷贝路径
                        dest: 'build/'
                    },

                    {
                        expand: true,
                        cwd: 'src/app',
                        src: ['images/**'],
                        dest: 'build/'
                    },

                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['plugin/**'],
                        dest: 'build/'
                    },
                ]
            },

            html: {
                expand: true,
                cwd: 'src/app/html/',
                src: ['**'],
                dest: 'build/',
                options: {
                    process: function (content, srcpath) {
                        // TODO 过滤路径 ../.. -> ./
                        return content.replace(/\.\.\/styles/g, 'styles')
                            .replace(/\.\.\/images/g, './images')
                            .replace(/\.\.\/\.\.\/plugin/g, './plugin')
                            .replace(/\.\.\/\.\.\/app/g, '.')
                            .replace(/\.\.\/js/g, './js');
                    },
                },
            },

            js: {
                expand: true,
                cwd: 'src/app/',
                src: 'js/**',
                dest: 'build/',
                options: {
                    //process: function(content, srcpath) {
                    //    return content.replace(/..\/html/g, '.').replace(/\.\.\/\.\./g, '.');
                    //},
                },
            },
        },
        uglify: { // 2. 代码混淆
            options: {
                mangle: {
                    except: ['$', 'Zepto', 'seajs', 'require', 'exports', 'module']
                }
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: 'js/**/*.js',
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'build/',
                        src: 'plugin/*.js',
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'build/',
                        src: 'plugin/jqueryui/*.js',
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'build/',
                        src: 'plugin/jquery/*.js',
                        dest: 'build/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [
                    {expand: true, cwd: 'build/', src: '*.html', dest: 'build/'}
                ]
            }
        },
        zip: {
            'dist/<%= grunt.template.today("yyyymmddHHMMss") %>.zip': ['build/**'],
        },
        clean: {
            spm: ['build', 'dist']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-zip');
    grunt.registerTask('default', ['clean', 'copy',  'htmlmin', 'zip']);
};
