let del = require('del');
let gulp = require('gulp4');
let tslint = require('gulp-tslint');
let sourcemaps = require('gulp-sourcemaps');
let ts = require('gulp-typescript');
let tsProject = ts.createProject('./tsconfig.json');
let bump = require('gulp-bump');
let exec = require('child_process').exec;
let fs = require('fs');

let execPromise = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                return reject(new Error(cmd + ": " + stderr));
            }
            return resolve();
        });
    });
};

function lint() {
    return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
        .pipe(tslint({
            fomatter: "json",
            configuration: "./tslint.json"
        }))
        .pipe(tslint.report());
}

function addFilesCommitTagPush(cb, files = null) {
    if (!files || !Array.isArray(files)) {
        return Promise.reject("Files property is required to be an array of files to 'git add'.");
    }

    let version = "";

    return Promise.resolve().then(() => {
        version = JSON.parse(fs.readFileSync('package.json')).version;
    }).then(() => {
        return execPromise('git add ' + files.join(' '));
    }).then(() => {
        console.log("Added files '" + files.join(' ') + "' to git.");
        return execPromise('git commit -m "Release v' + version + '"');
    }).then(() => {
        return execPromise('git tag v' + version);
    }).then(() => {
        console.log("Commit and tagged 'v" + version + "'.");
        return execPromise('git push && git push --tags');
    }).then(() => {
        console.log("Pushed.");
        cb();
    }).catch((err) => {
        cb(err);
    });
}

function tagAndPush(files = null, bump = "patch") {
    //Defaults to only adding package.json to the commit.
    files = files || ["package.json"];

    if (bump === "major") {
        return gulp.series('bump:major', (cb) => { addFilesCommitTagPush(cb, files); });
    } else if (bump === "minor") {
        return gulp.series('bump:minor', (cb) => { addFilesCommitTagPush(cb, files); });
    }
    return gulp.series('bump:patch', (cb) => { addFilesCommitTagPush(cb, files); });
}

function tagExpAndPush(cb, files = null) {
    if (!files || !Array.isArray(files)) {
        return Promise.reject("Files property is required to be an array of files to 'git add'.");
    }

    try {
        Promise.resolve().then(() => {
            return execPromise('git add ' + files.join(' '));
        }).then(() => {
            return execPromise('git commit -m "Release exp"');
        }).catch((err) => {
            //This empty catch is here because git commit will fail if there
            //were no changes but you still want to do a custom release.
        }).then(() => {
            return execPromise('git tag --force exp');
        }).then(() => {
            return execPromise('git push && git push --tags -f');
        }).then(() => {
            return cb();
        });
    } catch (err) {
        return cb(err);
    }
}

gulp.task('bump:patch', (cb) => {
    return gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('.'));
});
gulp.task('bump:minor', (cb) => {
    return gulp.src('./package.json')
        .pipe(bump({type: 'minor'}))
        .pipe(gulp.dest('.'));
});
gulp.task('bump:major', (cb) => {
    return gulp.src('./package.json')
        .pipe(bump({type: 'major'}))
        .pipe(gulp.dest('.'));
});

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

gulp.task('release:patch', gulp.series("build", tagAndPush(["package.json", "dist"], "patch")));
gulp.task('release:minor', gulp.series("build", tagAndPush(["package.json", "dist"], "minor")));
gulp.task('release:major', gulp.series("build", tagAndPush(["package.json", "dist"], "major")));
gulp.task('release:exp', gulp.series("build", (cb) => { tagExpAndPush(cb, ["package.json", "dist"]); }));
