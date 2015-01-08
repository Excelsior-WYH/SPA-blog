module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: ['*.scss'],
                    dest: 'public/css',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
//        jshint: {
//            files: ['Gruntfile.js', 'public/js/*.js'],
//            options: {
//                //这里是覆盖JSHint默认配置的选项
//                globals: {
//                    jQuery: true,
//                    console: true,
//                    module: true,
//                    document: true
//                }
//            }
//        },
        watch: {
            sass: {
                files: 'public/css/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: ['dev'],
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname,
                    ignore: ['node_modules/**'],
                    watch: [''],
                    delay: 1000,
                    legacyWatch: true
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.option('force', true);
    grunt.registerTask('default', ['concurrent:dev', 'watch']);

};