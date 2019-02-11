import gulp from 'gulp';
import config from '../config';

function reload(done) {
  config.bs.reload();
  done();
}

gulp.task('watch', (done) => {
  gulp.watch( config.files.js, gulp.series('js', reload) );
});
