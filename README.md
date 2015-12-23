# mla16.org

This is the Mobile Program for the 2016 MLA Convention in Austin. A hosted
version can be found at [mla16.org][mla16].

## Program data

Structured data in XML format can be found in the `xml` folder. JSON data can
be found in the `public/data` folder.

## Prerendering

This is a single page application built with [Backbone Marionette][marionette].
In order to allow search engines to index the site, all pages are prerendered
using [PhantomJS][phantom]. For the first page load, all visitors are served a 
static, rendered page. Browsers navigate the site with JavaScript and HTML5 
PushState, while search engines continue to request static pages from the 
server.

## Build

Install dependencies:

```bash
npm install
```

Compile assets (requires [Gulp][gulp]):

```bash
gulp assets
```

Compile assets, start a local Web server, and watch for changes:

```bash
gulp
```

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial 3.0 Unported License][cc-by-nc].

![Creative Commons License](http://i.creativecommons.org/l/by-nc/3.0/88x31.png)

[mla16]: http://mla16.org
[marionette]: http://marionettejs.com
[phantom]: http://phantomjs.org
[gulp]: http://gulpjs.com
[cc-by-nc]: http://creativecommons.org/licenses/by-nc/3.0/
