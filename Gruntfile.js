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
                    'src/js/vendor/jquery-ui.min.js',
                    'src/js/vendor/jquery.ui.touch-punch.js',
                    'src/js/bs.js',
                    'src/js/Helpers.js',
                    'src/js/gfx/Entity.js',
                    'src/js/gfx/Text.js',
                    'src/js/gfx/Gfx.js',
                    'src/js/Card.js',
                    'src/js/Slot.js',
                    'src/js/DeckSlot.js',
                    'src/js/DrawSlot.js',
                    'src/js/Board.js',
                    'src/js/GUI.js',
                    'src/js/klondike/Slot.js',
                    'src/js/klondike/FinalSlot.js',
                    'src/js/klondike/GameType.js',
                    'src/js/spider/Slot.js',
                    'src/js/spider/FinalSlot.js',
                    'src/js/spider/GameType.js',
                    'src/js/poker/DrawSlot.js',
                    'src/js/poker/PlayerSlot.js',
                    'src/js/poker/GameType.js',
                    'src/js/History.js',
                    'src/js/Game.js',
                    'src/js/GameManager.js',
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
            manifest: {
                expand: true,
                cwd: 'src',
                src: 'manifest.json',
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
                    'copy:fonts',
                    'copy:favicon',
                    'copy:manifest',
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
            'copy:fonts',
            'copy:favicon',
            'copy:manifest',
            'copy:html',
            'watch'
        ]
    );
};