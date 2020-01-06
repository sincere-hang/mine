[![Mozilla Add-on](https://img.shields.io/amo/v/glitterdrag.svg)](https://addons.mozilla.org/firefox/addon/glitterdrag/)
[![GitHub release](https://img.shields.io/github/release/harytfw/GlitterDrag.svg)]()
[![Travis](https://img.shields.io/travis/harytfw/GlitterDrag/master.svg)](https://travis-ci.org/harytfw/GlitterDrag)
[![license](https://img.shields.io/github/license/harytfw/GlitterDrag.svg)]()

# GlitterDrag（闪耀拖拽）

An Firefox extension for drag behaviors, with WebExtension.

兼容多进程的Firefox拖拽扩展

# Goals

Currently I just want to provide an alternative to [Easy DragToGo+](https://www.firefox.net.cn/read-29894) for the reason that Firefox 57 won't support legacy extension anymore. This WebExtension is written in pure es6 without jQuery to avoid slowing the browser down as much as possible.

# Install to general use.

Please visit [Add-ons for firefox](https://addons.mozilla.org/en-US/firefox/addon/glitterdrag/). 

# Install to debug

See [installing section](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Your_first_WebExtension#Installing) in MDN  to install this addon. Or Using the [web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext) tool.

# Build

```
npm run build
```

The xpi file is generated in `/web-ext-artifacts`

# Request Feature 

Open an issue and describe clearly what you need. If this feature is not out of scope of GlitterDrag, author will consider to implement it.

# License

MIT