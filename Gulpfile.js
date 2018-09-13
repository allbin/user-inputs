let del = require('del');
let gulp = require('gulp4');
let allbin = require('gulp-allbin');
let tslint = require('gulp-tslint');
let sourcemaps = require('gulp-sourcemaps');
let ts = require('gulp-typescript');
let tsProject = ts.createProject('./tsconfig.json');

function lint() {
    return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
        .pipe(tslint({
            fomatter: "json",
            configuration: "./tslint.json"
        }))
        .pipe(tslint.report());
}

gulp.task('clean', () => {
    return del(['build', 'dist']);
});

gulp.task('build:static', () => {
    return gulp.src(['./img/**/*']).pipe(gulp.dest('dist/img'));
});

gulp.task('build:scripts', () => {
    return lint().pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series("clean", gulp.parallel("build:static", "build:scripts")));

gulp.task('release:patch', gulp.series("build", allbin.tagAndPush(["package.json", "dist"], "patch")));
gulp.task('release:minor', gulp.series("build", allbin.tagAndPush(["package.json", "dist"], "minor")));
gulp.task('release:major', gulp.series("build", allbin.tagAndPush(["package.json", "dist"], "major")));