# Minimal RPC

Minimal RPC streams for sending the smallest amount of data across the wire.

[![Browser Support](https://ci.testling.com/rgbboy/minimal-rpc.png)
](https://ci.testling.com/RGBboy/minimal-rpc)

[![Build Status](https://secure.travis-ci.org/RGBboy/minimal-rpc.png)](http://travis-ci.org/RGBboy/minimal-rpc)

# API

``` javascript

  var RPC = require('minimal-rpc'),
      stream1 = RPC(),
      stream2 = RPC();

  stream1.pipe(stream2).pipe(stream1);

  stream1.registerRPC(new Buffer('0'), function (data) {
    console.log(data.toString('utf-8')); // Ping
  });

  stream2.registerRPC(new Buffer('1'), function (data) {
    console.log(data.toString('utf-8')); // Ping
    stream2.callRPC(new Buffer('1'), new Buffer('Pong'));
  });

  stream1.callRPC(new Buffer('0'), new Buffer('Ping'));

```

## MinimalRPC()

* Return `Duplex` RPC Stream

## instance.registerRPC(id, fn)

* id `Buffer`
* fn `Function`

The id is stored to distinguish the RPC calls from the other side. The smaller the id, the smaller the framing that needs to be sent by the caller.

## instance.callRPC(id, data)

* id `Buffer`
* data `Buffer`

The id is sent down the wire to distinguish the stream on the other side. The smaller the id, the smaller the framing sent. If you want to send objects across you can use `new Buffer(JSON.stringify(Object))`. This allows users to pack their data in the most efficient way that they can. 

# License 

(The MIT License)

Copyright (c) 2014 RGBboy &lt;l-_-l@rgbboy.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.