/*
module.exports = function (grunt) {

    // 构建任务配置
    grunt.initConfig({
        //读取package.json的内容，形成json数据
        pkg: grunt.file.readJSON('package.json'),

// 压缩所有js并生成source map
        uglify: {
            my_target: {
                // options: {
                //     sourceMap: false
                // },
                files: [
                    // 可以直接作用于文件夹下所有文件
                    {
                        expand: true,
                        cwd: '1052/',
                        // 排除.min的文件
                        src: ['*.js', '!*.min.js'],
                        // 输出和输入在同一目录
                        dest: 'pbres/',
                        ext: '.min.js'
                    }
                    // 也可以指明具体一一对应的文件
                    // {
                    //     // core
                    //     'core/jsCompare.min.js': 'core/jsCompare.js',
                    //     'core/jsHelper.min.js': 'core/jsHelper.js',
                    //     'core/jsShare.min.js': 'core/jsShare.js',
                    //     // dijia
                    //     'app/dijia/dijia.min.js': 'app/dijia/dijia.js',
                    //     'app/dijia/location.min.js': 'app/dijia/location.js'
                    // }
                ]
            }
        },

        // 压缩所有css
        // cssmin: {
        //     minify: {
        //         expand: true,
        //         cwd: '1052/',
        //         src: ['**!/!*.css', '**!/!*.min.css'],
        //         dest: 'pbres',
        //         ext: '.min.css'
        //     }
        // }

    });

    // 加载指定插件任务
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认执行的任务
    grunt.registerTask('default', ['uglify']);
};*/
var src = '1052/**/',
    srcout = 'pbres/**';
/*module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        //清除目录
        /!*clean: {
            all: ['dist/html/!**', 'dist/!*.*'],
            image: 'dist/html/images',
            css: 'dist/html/css',
            html: 'dist/html/!**!/!*'
        },*!/

        /!*copy: {
            src: {
                files: [
                    {expand: true, cwd: 'src', src: ['*.html'], dest: 'dist/html'}
                ]
            },
            image: {
                files: [
                    {expand: true, cwd: 'src', src: ['images/!*.{png,jpg,jpeg,gif}'], dest: 'dist/html'}
                ]
            }
        },*!/

        // 文件合并
       /!* concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            js: {
                src: [
                    "src/js/!*.js"
                ],
                dest: "dist/html/js/app.js"
            },
            css:{
                src: [
                    "src/css/!*.css"
                ],
                dest: "dist/html/css/main.css"
            }
        },*!/

        //压缩JS
        uglify: {
            prod: {
                options: {
                    mangle: {
                        except: ['require', 'exports', 'module', 'window']
                    },
                    compress: {
                        global_defs: {
                            PROD: true
                        },
                        dead_code: true,
                        pure_funcs: [
                            "console.log",
                            "console.info"
                        ]
                    }
                },

                files: [{
                    expand: true,
                    cwd: src,
                    src: ['*.js', '!js/!*.min.js'],
                    dest: srcout
                }]
            }
        },

        //压缩CSS
        cssmin: {
            prod: {
                options: {
                    report: 'gzip'
                },
                files: [
                    {
                        expand: true,
                        cwd: src,
                        src: ['*.css'],
                        dest: srcout
                    }
                ]
            }
        },

        //压缩图片
        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    pngquant: true
                },
                files: [
                    {expand: true, cwd: src, src: ['*.{png,jpg,jpeg,gif,webp,svg}'], dest: srcout}
                ]
            }
        },

        // 处理html中css、js 引入合并问题
        usemin: {
            html: src + '*.html'
        },

        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [
                    {expand: true, cwd: src, src: ['*.html'], dest: srcout}
                ]
            }
        }

    });


    grunt.registerTask('prod', [
        // 'copy',                 //复制文件
        // 'concat',               //合并文件
        'imagemin',             //图片压缩
        'cssmin',               //CSS压缩
        'uglify',               //JS压缩
        'usemin',               //HTML处理
        'htmlmin'               //HTML压缩
    ]);

    grunt.registerTask('default', ['prod']);
};*/

module.exports = function (grunt) {

 require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

 grunt.initConfig({

 //压缩JS
 uglify: {
 prod: {
 options: {
 mangle: {
 except: ['require', 'exports', 'module', 'window']
 },
 compress: {
 global_defs: {
 PROD: true
 },
 dead_code: true,
 pure_funcs: [
 "console.log",
 "console.info"
 ]
 }
 },

 files: [{
 expand: true,
 src: [src + '*.js'],
 dest: srcout + '*.js'
 }]
 }
 },

 //压缩CSS
 cssmin: {
 prod: {
 options: {
 report: 'gzip'
 },
 files: [
 {
 expand: true,
 src: [src + '*.css'],
 dest: srcout + '*.css'
 }
 ]
 }
 },

 //压缩图片
 imagemin: {
 prod: {
 options: {
 optimizationLevel: 7,
 pngquant: true
 },
 files: [
 {expand: true,src: [src　+　'*.{png,jpg,jpeg,gif,webp,svg}'], dest: srcout　+　'*.{png,jpg,jpeg,gif,webp,svg}'}
 ]
 }
 },

 // 处理html中css、js 引入合并问题
 usemin: {
 html: src + '*.html'
 },

 //压缩HTML
 htmlmin: {
 options: {
 removeComments: true,
 removeCommentsFromCDATA: true,
 collapseWhitespace: true,
 collapseBooleanAttributes: true,
 removeAttributeQuotes: true,
 removeRedundantAttributes: true,
 useShortDoctype: true,
 removeEmptyAttributes: true,
 removeOptionalTags: true
 },
 html: {
 files: [
 {expand: true, src: [src　+ '*.html'], dest: srcout + '*.html'}
 ]
 }
 }

 });


 grunt.registerTask('prod', [
 // 'copy',                 //复制文件
 // 'concat',               //合并文件
 'imagemin',             //图片压缩
 'cssmin',               //CSS压缩
 'uglify',               //JS压缩
 'usemin',               //HTML处理
 'htmlmin'               //HTML压缩
 ]);

 grunt.registerTask('default', ['prod']);
 };
