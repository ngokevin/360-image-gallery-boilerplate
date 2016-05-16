var responsify = require('response-stream')
var through = require('through2')
var inject = require('./inject-script-tag')

module.exports = injectLiveScript
function injectLiveScript (resp, opt) {
  opt = opt || {}
  var protocol = opt.protocol || 'http'
  var host = (opt.host || 'localhost').split(':')[0]
  var port = opt.port || 35729
  var injector = inject({
    src: protocol + '://' + host + ':' + port + '/livereload.js?snipver=1'
  })

  var stream = responsify(through())
  injector.pipe(resp)

  if (opt.autoDetect !== false) {
    stream
      .on('setHeader', setHeaderListener)
      .on('writeHead', writeHeadListener)
  } else {
    stream.pipe(injector)
  }

  return stream

  function setHeaderListener (args, prevent) {
    if (typeof args[1] !== 'string') return

    var isCType = args[0].toLowerCase() === 'content-type'
    var isHTML = args[1].toLowerCase().indexOf('text/html') >= 0
    if (isCType) {
      if (isHTML) stream.pipe(injector)
      else stream.pipe(resp)

      stream.removeListener('setHeader', setHeaderListener)
      stream.removeListener('writeHead', writeHeadListener)
    }
  }

  function writeHeadListener (args, prevent) {
    var hasCType = 'content-type' in args[1]
    var isHTML = args[1]['content-type'] === 'text/html'

    if (hasCType && isHTML) stream.pipe(injector)
    else stream.pipe(resp)

    stream.removeListener('setHeader', setHeaderListener)
    stream.removeListener('writeHead', writeHeadListener)
  }
}
