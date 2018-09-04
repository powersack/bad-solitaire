module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        uglify: {
            options:{
                // beautify: true,
                // mangle: false
            },
            build: {
                src: [
                    'src/js/vendor/jquery.min.js',
                    'src/js/main.js'
                ],
                dest: 'dist/js/main.min.js'
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/css/styles.min.css": "src/less/main.less"
                }
            }
        },
        // inline: {
        //     dist: {
        //         src: 'src/index.html',
        //         dest: 'dist/index-inline.html'
        //     }
        // },
        // htmlmin: {
        //     dist: {
        //         options: {
        //             removeComments: true,
        //             collapseWhitespace: true
        //         },
        //         files: {
        //             'dist/index.html': 'dist/index-inline.html'
        //         }
        //     }
        // },
        clean: {
            all: ['dist/**/*.*']
        },
        copy:{
            html: {
                expand: true,
                cwd: 'src',
                src: 'index.html',
                dest: 'dist/'
            },
            images: {
                expand: true,
                cwd: 'src/img',
                src: '**/*.*',
                dest: 'dist/img/'
            },
            fonts: {
                expand: true,
                cwd: 'src/fonts',
                src: '**/*.*',
                dest: 'dist/fonts/'
            },
            favicon: {
                expand: true,
                cwd: 'src/favicon',
                src: '**/*.*',
                dest: 'dist/favicon/'
            }
        },
        watch: {
            all: {
                options: {
                    spawn: false
                },
                files: [
                    'src/index.html',
                    'src/less/**/*.less',
                    'src/js/**/*.js'
                ],
                tasks: [
                    'clean:all',
                    'uglify',
                    'less',
                    'copy:images',
                    'copy:html'
                ]
            }
        }
    });

    grunt.registerTask('default',
        [
            'clean:all',
            'uglify',
            'less',
            'copy:images',
            'copy:html',
            'watch'
        ]
    );
};