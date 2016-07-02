var FfmpegCommand = require('fluent-ffmpeg')
var path = require('path')
var fs = require('fs')

// osx: x64 / other: ia32
var arch = process.platform === 'darwin' ? 'x64' : 'ia32'

// only windows has an extension
var ext = process.platform === 'win32' ? '.exe' : ''

try {

  var back = '../..';
  var binDir = path.resolve(__dirname, back, 'bin');

  // in case of asar, go one level down
  while (binDir.includes('/app.asar/') || binDir.includes('\\app.asar\\')) {
      back += '/..'
      binDir = path.resolve(__dirname, back, 'bin');
  }

  var ffmpeg = path.join(binDir, 'ffmpeg', process.platform, arch, 'ffmpeg' + ext)
  var ffprobe = path.join(binDir, 'ffmpeg', process.platform, arch, 'ffprobe' + ext)
console.log('ffmpeg path');
console.log(ffmpeg);
console.log('ffprobe path');
console.log(ffprobe);
  // this checks if the ffmpeg folder exists in our repo, if it doesn't it will return an error
  fs.accessSync(ffmpeg, fs.F_OK)
  fs.accessSync(ffprobe, fs.F_OK)

  // folder exists so we need to load ffmpeg and ffprobe from our repo
  FfmpegCommand.setFfmpegPath(ffmpeg)
  FfmpegCommand.setFfprobePath(ffprobe)
} catch (e) {
  // folder does not exist, this means that ffmpeg and ffprobe
  // wore found somewhere else during the install process
  // fluent-ffmpeg will set the correct paths on it's own
}

module.exports = FfmpegCommand
