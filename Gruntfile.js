/*jshint node:true */
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js: {
        src: 'js/**/*.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 9999,
          base: ''
        }
      }
    },
    watch: {},
    copy: {
      release: {
        files: [
          { extend: true,
            src: ['components/jquery/jquery.min.js', 'images/*', 'manifest.json'],
            dest: 'release/'}
        ]
      }
    },
    clean: {
      release: [
        'release'
      ]
    },
    uglify: {
      options: {
        mangle: false
      },
      release: {
        files: {
          'release/js/main.js': ['js/main.js']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) { grunt.loadNpmTasks(key); }
  }

  // Default task.
  grunt.registerTask('default', []);
  grunt.registerTask('test', []);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('release', ['clean:release', 'copy:release', 'uglify:release']);
};
