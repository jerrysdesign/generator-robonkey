fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
iconfont = require('gulp-iconfont')
iconfontCss = require('gulp-iconfont-css')
runTimestamp = Math.round(Date.now() / 1000)

# Create icon font
gulp.task 'iconfont', ->
  gulp.src(cfg.font.src).pipe(iconfontCss(
    fontName: cfg.iconFont.name
    path: cfg.font.templateInput
    targetPath: cfg.font.templateOutput
    fontPath: cfg.font.templateFontpath + cfg.iconFont.name
    cssClass: 'icn')).pipe(iconfont(
    fontName: cfg.iconFont.name
    prependUnicode: true
    formats: cfg.iconFont.types
    timestamp: runTimestamp
    normalize: true
    fontHeight: 512
    descent: 50)).pipe gulp.dest(cfg.font.build + cfg.iconFont.name)
