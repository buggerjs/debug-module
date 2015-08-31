# DebugModule

## Install

```bash
npm install --save debug-module
```

## Usage

For the first `DebugModule`:

```js
var DebugModule = require('debug-module');
var moduleExports = DebugModule._load('./in-context', module);
// moduleExports is now `module.exports` of the required file,
// just like with a "normal" require.
```

From inside of `in-context.js`:

1. Access `Debug` and other utility functions like `MakeMirror`.
2. Require more modules using `require.debug`.
3. Require non-debug context modules using `require`.

You can find a rough example in the `example` directory.

## License

The code of this module is just a simplified version of `lib/module.js`
as it appears in node itself.

```
Copyright Joyent, Inc. and other Node contributors. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
```
