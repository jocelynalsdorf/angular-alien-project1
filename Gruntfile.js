
module.exports = function(grunt) {
    
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    // Project configuration.
    grunt.initConfig({

        ngAnnotate: {
      //specify an app
          comments: {
      //specify the destination files
            files: {
            'javascript/comments.annotated.js' : ['javascript/comments.js']
            }
          }
        },
        
        autoprefixer: {
            // prefix all files
            top: {
                expand: true,
                src: '*/css/**/*.css',
                dest: ''
            },
        },

        sass: {
            dist: {
                files: {
                    'css/comments.css': 'scss/comments.scss',
                }
            }
        },
        
        watch: {
            sass: {
                files: ['scss/*.scss', '!.#*'],
                tasks: ['build'],
                options: {
                    spawn: false, //faster I think
                    livereload: true
                }
            },
            
            options: {
                livereload: true,
                dot: false
            },
        },
        
        //run the server on the _site
        connect: {
            server: {
                options: {
                    port: 9009
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.server.options.port %>/'
            }
        }
    });
    
    grunt.registerTask('build', ['sass', 'autoprefixer', 'ngAnnotate']);
    grunt.registerTask('server', [
        'connect:server',
        'open:server',
        'build',
        'watch'
    ]);
    
    // Default task.
    grunt.registerTask('default', 'server');
    
};
