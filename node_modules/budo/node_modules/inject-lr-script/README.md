# inject-lr-script

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Inject the [LiveReload script snippet](http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually) into a HTML response.

By default, this will attempt to discover HTML files as their headers are written. You can pass `{ autoDetect: false }` to ignore this and just inject the script on all incoming responses.

Example:

```js
var inject = require('inject-lr-script')
var handler = require('ecstatic')(process.cwd())

http.createServer(function (req, res) {
    return handler(req, inject(res))
}).listen(8000, cb)
```

*Note:* This expects a `<body>` tag to be present in the HTML.

## Usage

[![NPM](https://nodei.co/npm/inject-lr-script.png)](https://www.npmjs.com/package/inject-lr-script)

#### `inject(resp[, opt])`

Will inject LiveReload `<script>` tag into the body of an HTML script going through `resp`. Options:

- `port` the live reload server port, default 35729
- `host` the host, default `localhost`
- `autoDetect` whether to auto-detect for HTML types, default true. Setting this to false will inject on all incoming responses.

## See Also

- [inject-lr-script-stream](https://github.com/yoshuawuyts/inject-lr-script-stream) - a simpler, streaming approach

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/inject-lr-script/blob/master/LICENSE.md) for details.
