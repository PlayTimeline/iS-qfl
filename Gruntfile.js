'use strict';


module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['controllers/**/*.js', 'lib/**/*.js', 'models/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        requirejs: {
            build: {
                options: {
                    baseUrl: 'public/js',
                    mainConfigFile: 'public/js/config.js',
                    dir: '.build/js',
                    optimize: 'uglify',
                    modules: [{name: 'app'}]
                }
            }
        },
        less: {
            build: {
                options: {
                    yuicompress: true,
                    paths: ['public/css']
                },
                files: {
                    '.build/css/app.css': 'public/css/app.less'
                }
            }
        },

        // by sconfield
        coffee: {
            controllers: {
                expand: true,
                cwd: 'controllers/coffee/',
                src: '*.coffee',
                dest: 'controllers/',
                ext: '.js',
                options: {
                    bare: true,
                    sourceMap: true
                }
            },
            lib: {
                expand: true,
                cwd: 'lib/coffee/',
                src: '*.coffee',
                dest: 'lib/',
                ext: '.js',
                options: {
                    bare: true
                }
            },
            models: {
                expand: true,
                cwd: 'models/coffee/',
                src: '*.coffee',
                dest: 'models/',
                ext: '.js',
                options: {
                    bare: true
                }
            },
            web: {
                expand: true,
                cwd: 'public/coffee/',
                src: '*.coffee',
                dest: 'public/js/',
                ext: '.js',
                options: {
                    bare: true,
                    join: true,
                    sourceMap: true
                }
            },
            index: {
                files: {
                    'index.js': 'index.coffee'
                },
                options: {
                    bare: true
                }
            }
        },
        watch: {
            script: {
                files: ['public/coffee/*.coffee'],
                tasks: ['coffee']
            }
        },

        makara: {
            files: ['public/templates/**/*.dust'],
            options: {
                contentPath: ['locales/**/*.properties']
            }
        },
        dustjs: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/',
                        src: '**/*.dust',
                        dest: '.build/templates',
                        ext: '.js'
                    }
                ],
                options: {
                    fullname: function (filepath) {
                        var path = require('path'),
                            name = path.basename(filepath, '.dust'),
                            parts = filepath.split(path.sep),
                            fullname = parts.slice(3, -1).concat(name);

                        return fullname.join(path.sep);
                    }
                }
            }
        },
        copyto: {
            build: {
                files: [
                    { cwd: 'public', src: ['**/*'], dest: '.build/' }
                ],
                options: {
                    ignore: [
                        'public/css/**/*',
                        'public/js/**/*',
                        'public/coffee',
                        'public/templates/**/*'
                    ]
                }
            }
        },
        clean: {
            'tmp': 'tmp',
            'build': '.build/templates'
        },
        mochacli: {
            src: ['test/*.js'],
            options: {
                globals: ['chai'],
                timeout: 6000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-dustjs');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadTasks('./node_modules/makara/tasks/');

    grunt.registerTask('i18n', ['clean', 'makara', 'dustjs', 'clean:tmp']);
    grunt.registerTask('build', ['coffee', 'less', 'requirejs',  'copyto', 'i18n']);
    grunt.registerTask('test', ['jshint', 'mochacli']);

};