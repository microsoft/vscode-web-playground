!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){e.exports=require("vscode")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.activate=void 0;const n=r(0),s=r(2);function i(e,t){e&&"/sample-folder/large.ts"===e.fileName?t.set(e.uri,[{code:"",message:"cannot assign twice to immutable variable `storeHouses`",range:new n.Range(new n.Position(4,12),new n.Position(4,32)),severity:n.DiagnosticSeverity.Error,source:"",relatedInformation:[new n.DiagnosticRelatedInformation(new n.Location(e.uri,new n.Range(new n.Position(1,8),new n.Position(1,9))),"first assignment to `x`")]},{code:"",message:"function does not follow naming conventions",range:new n.Range(new n.Position(7,10),new n.Position(7,23)),severity:n.DiagnosticSeverity.Warning,source:""}]):t.clear()}t.activate=function(e){if("object"==typeof navigator){(function(e){const t=new s.MemFS;return e.subscriptions.push(t),t})(e).seed(),function(e){const t=n.languages.createDiagnosticCollection("test");n.window.activeTextEditor&&i(n.window.activeTextEditor.document,t);e.subscriptions.push(n.window.onDidChangeActiveTextEditor(e=>{e&&i(e.document,t)}))}(e),n.commands.executeCommand("vscode.open",n.Uri.parse("memfs:/sample-folder/large.ts"))}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MemFS=t.Directory=t.File=void 0;const n=r(0),s=r(3);class i{constructor(e,t){this.uri=e,this.type=n.FileType.File,this.ctime=Date.now(),this.mtime=Date.now(),this.size=0,this.name=t}}t.File=i;class o{constructor(e,t){this.uri=e,this.type=n.FileType.Directory,this.ctime=Date.now(),this.mtime=Date.now(),this.size=0,this.name=t,this.entries=new Map}}t.Directory=o;const a=new TextEncoder;class l{constructor(){this.root=new o(n.Uri.parse("memfs:/"),""),this._emitter=new n.EventEmitter,this._bufferedEvents=[],this.onDidChangeFile=this._emitter.event,this.disposable=n.Disposable.from(n.workspace.registerFileSystemProvider(l.scheme,this,{isCaseSensitive:!0}))}dispose(){var e;null===(e=this.disposable)||void 0===e||e.dispose()}seed(){this.createDirectory(n.Uri.parse("memfs:/sample-folder/")),this.writeFile(n.Uri.parse("memfs:/sample-folder/large.ts"),a.encode(s.largeTSFile),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.txt"),a.encode("foo"),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.html"),a.encode('<html><body><h1 class="hd">Hello</h1></body></html>'),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.js"),a.encode('console.log("JavaScript")'),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.json"),a.encode('{ "json": true }'),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.ts"),a.encode('console.log("TypeScript")'),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.css"),a.encode("* { color: green; }"),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.md"),a.encode(s.debuggableFile),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.xml"),a.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>'),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.py"),a.encode('import base64, sys; base64.decode(open(sys.argv[1], "rb"), open(sys.argv[2], "wb"))'),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.yaml"),a.encode("- just: write something"),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.jpg"),s.getImageFile(),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/file.php"),a.encode('<?php echo "Hello World!"; ?>'),{create:!0,overwrite:!0}),this.createDirectory(n.Uri.parse("memfs:/sample-folder/folder/")),this.createDirectory(n.Uri.parse("memfs:/sample-folder/workspaces/")),this.createDirectory(n.Uri.parse("memfs:/sample-folder/large/")),this.createDirectory(n.Uri.parse("memfs:/sample-folder/xyz/")),this.createDirectory(n.Uri.parse("memfs:/sample-folder/xyz/abc")),this.createDirectory(n.Uri.parse("memfs:/sample-folder/xyz/def")),this.writeFile(n.Uri.parse("memfs:/sample-folder/folder/empty.txt"),new Uint8Array(0),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/folder/empty.foo"),new Uint8Array(0),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/folder/file.ts"),a.encode("let a:number = true; console.log(a);"),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/large/rnd.foo"),function(e,t=155){let r=[];for(let n=0;n<e;n++){let e="";for(;e.length<t;)e+=Math.random().toString(2+n%34).substr(2);r.push(e.substr(0,t))}return a.encode(r.join("\n"))}(5e4),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/xyz/UPPER.txt"),a.encode("UPPER"),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/xyz/upper.txt"),a.encode("upper"),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/xyz/def/foo.md"),a.encode("*MemFS*"),{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/workspaces/mem.code-workspace"),a.encode(JSON.stringify({folders:[{name:"sample-folder-large",uri:"memfs:/sample-folder/large"},{name:"sample-folder-xyz",uri:"memfs:/sample-folder/xyz"},{name:"sample-folder-folder",uri:"memfs:/sample-folder/folder"}]},void 0,"\t")),{create:!0,overwrite:!0}),this.createDirectory(n.Uri.parse("memfs:/sample-folder/encodings/")),this.writeFile(n.Uri.parse("memfs:/sample-folder/encodings/windows1251.txt"),s.windows1251File,{create:!0,overwrite:!0}),this.writeFile(n.Uri.parse("memfs:/sample-folder/encodings/gbk.txt"),s.gbkFile,{create:!0,overwrite:!0})}stat(e){return this._lookup(e,!1)}readDirectory(e){const t=this._lookupAsDirectory(e,!1);let r=[];for(const[e,n]of t.entries)r.push([e,n.type]);return r}readFile(e){const t=this._lookupAsFile(e,!1).data;if(t)return t;throw n.FileSystemError.FileNotFound()}writeFile(e,t,r){let s=this._basename(e.path),a=this._lookupParentDirectory(e),l=a.entries.get(s);if(l instanceof o)throw n.FileSystemError.FileIsADirectory(e);if(!l&&!r.create)throw n.FileSystemError.FileNotFound(e);if(l&&r.create&&!r.overwrite)throw n.FileSystemError.FileExists(e);l||(l=new i(e,s),a.entries.set(s,l),this._fireSoon({type:n.FileChangeType.Created,uri:e})),l.mtime=Date.now(),l.size=t.byteLength,l.data=t,this._fireSoon({type:n.FileChangeType.Changed,uri:e})}rename(e,t,r){if(!r.overwrite&&this._lookup(t,!0))throw n.FileSystemError.FileExists(t);let s=this._lookup(e,!1),i=this._lookupParentDirectory(e),o=this._lookupParentDirectory(t),a=this._basename(t.path);i.entries.delete(s.name),s.name=a,o.entries.set(a,s),this._fireSoon({type:n.FileChangeType.Deleted,uri:e},{type:n.FileChangeType.Created,uri:t})}delete(e){let t=e.with({path:this._dirname(e.path)}),r=this._basename(e.path),s=this._lookupAsDirectory(t,!1);if(!s.entries.has(r))throw n.FileSystemError.FileNotFound(e);s.entries.delete(r),s.mtime=Date.now(),s.size-=1,this._fireSoon({type:n.FileChangeType.Changed,uri:t},{uri:e,type:n.FileChangeType.Deleted})}createDirectory(e){let t=this._basename(e.path),r=e.with({path:this._dirname(e.path)}),s=this._lookupAsDirectory(r,!1),i=new o(e,t);s.entries.set(i.name,i),s.mtime=Date.now(),s.size+=1,this._fireSoon({type:n.FileChangeType.Changed,uri:r},{type:n.FileChangeType.Created,uri:e})}_lookup(e,t){let r=e.path.split("/"),s=this.root;for(const i of r){if(!i)continue;let r;if(s instanceof o&&(r=s.entries.get(i)),!r){if(t)return;throw n.FileSystemError.FileNotFound(e)}s=r}return s}_lookupAsDirectory(e,t){let r=this._lookup(e,t);if(r instanceof o)return r;throw n.FileSystemError.FileNotADirectory(e)}_lookupAsFile(e,t){let r=this._lookup(e,t);if(r instanceof i)return r;throw n.FileSystemError.FileIsADirectory(e)}_lookupParentDirectory(e){const t=e.with({path:this._dirname(e.path)});return this._lookupAsDirectory(t,!1)}watch(e){return new n.Disposable(()=>{})}_fireSoon(...e){this._bufferedEvents.push(...e),this._fireSoonHandle&&clearTimeout(this._fireSoonHandle),this._fireSoonHandle=setTimeout(()=>{this._emitter.fire(this._bufferedEvents),this._bufferedEvents.length=0},5)}_basename(e){return(e=this._rtrim(e,"/"))?e.substr(e.lastIndexOf("/")+1):""}_dirname(e){return(e=this._rtrim(e,"/"))?e.substr(0,e.lastIndexOf("/")):"/"}_rtrim(e,t){if(!e||!t)return e;const r=t.length,n=e.length;if(0===r||0===n)return e;let s=n,i=-1;for(;i=e.lastIndexOf(t,s-1),-1!==i&&i+r===s;){if(0===i)return"";s=i}return e.substring(0,s)}_getFiles(){const e=new Set;return this._doGetFiles(this.root,e),e}_doGetFiles(e,t){e.entries.forEach(e=>{e instanceof i?t.add(e):this._doGetFiles(e,t)})}_convertSimple2RegExpPattern(e){return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g,"\\$&").replace(/[\*]/g,".*")}}t.MemFS=l,l.scheme="memfs"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.gbkFile=t.windows1251File=t.getImageFile=t.debuggableFile=t.largeTSFile=void 0,t.largeTSFile="/// <reference path=\"lib/Geometry.ts\"/>\n/// <reference path=\"Game.ts\"/>\n\nmodule Mankala {\nexport var storeHouses = [6,13];\nexport var svgNS = 'http://www.w3.org/2000/svg';\n\nfunction createSVGRect(r:Rectangle) {\n\tvar rect = document.createElementNS(svgNS,'rect');\n\trect.setAttribute('x', r.x.toString());\n\trect.setAttribute('y', r.y.toString());\n\trect.setAttribute('width', r.width.toString());\n\trect.setAttribute('height', r.height.toString());\n\treturn rect;\n}\n\nfunction createSVGEllipse(r:Rectangle) {\n\tvar ell = document.createElementNS(svgNS,'ellipse');\n\tell.setAttribute('rx',(r.width/2).toString());\n\tell.setAttribute('ry',(r.height/2).toString());\n\tell.setAttribute('cx',(r.x+r.width/2).toString());\n\tell.setAttribute('cy',(r.y+r.height/2).toString());\n\treturn ell;\n}\n\nfunction createSVGEllipsePolar(angle:number,radius:number,tx:number,ty:number,cxo:number,cyo:number) {\n\tvar ell = document.createElementNS(svgNS,'ellipse');\n\tell.setAttribute('rx',radius.toString());\n\tell.setAttribute('ry',(radius/3).toString());\n\tell.setAttribute('cx',cxo.toString());\n\tell.setAttribute('cy',cyo.toString());\n\tvar dangle = angle*(180/Math.PI);\n\tell.setAttribute('transform','rotate('+dangle+','+cxo+','+cyo+') translate('+tx+','+ty+')');\n\treturn ell;\n}\n\nfunction createSVGInscribedCircle(sq:Square) {\n\tvar circle = document.createElementNS(svgNS,'circle');\n\tcircle.setAttribute('r',(sq.length/2).toString());\n\tcircle.setAttribute('cx',(sq.x+(sq.length/2)).toString());\n\tcircle.setAttribute('cy',(sq.y+(sq.length/2)).toString());\n\treturn circle;\n}\n\nexport class Position {\n\n\tseedCounts:number[];\n\tstartMove:number;\n\tturn:number;\n\n\tconstructor(seedCounts:number[],startMove:number,turn:number) {\n\t\tthis.seedCounts = seedCounts;\n\t\tthis.startMove = startMove;\n\t\tthis.turn = turn;\n\t}\n\n\tscore() {\n\t\tvar baseScore = this.seedCounts[storeHouses[1-this.turn]]-this.seedCounts[storeHouses[this.turn]];\n\t\tvar otherSpaces = homeSpaces[this.turn];\n\t\tvar sum = 0;\n\t\tfor (var k = 0,len = otherSpaces.length;k<len;k++) {\n\t\t\tsum += this.seedCounts[otherSpaces[k]];\n\t\t}\n\t\tif (sum==0) {\n\t\t\tvar mySpaces = homeSpaces[1-this.turn];\n\t\t\tvar mySum = 0;\n\t\t\tfor (var j = 0,len = mySpaces.length;j<len;j++) {\n\t\t\t\tmySum += this.seedCounts[mySpaces[j]];\n\t\t\t}\n\n\t\t\tbaseScore -= mySum;\n\t\t}\n\t\treturn baseScore;\n\t}\n\n\tmove(space:number,nextSeedCounts:number[],features:Features):boolean {\n\t\tif ((space==storeHouses[0])||(space==storeHouses[1])) {\n\t\t\t// can't move seeds in storehouse\n\t\t\treturn false;\n\t\t}\n\t\tif (this.seedCounts[space]>0) {\n\t\t\tfeatures.clear();\n\t\t\tvar len = this.seedCounts.length;\n\t\t\tfor (var i = 0;i<len;i++) {\n\t\t\t\tnextSeedCounts[i] = this.seedCounts[i];\n\t\t\t}\n\t\t\tvar seedCount = this.seedCounts[space];\n\t\t\tnextSeedCounts[space] = 0;\n\t\t\tvar nextSpace = (space+1)%14;\n\n\t\t\twhile (seedCount>0) {\n\t\t\t\tif (nextSpace==storeHouses[this.turn]) {\n\t\t\t\t\tfeatures.seedStoredCount++;\n\t\t\t\t}\n\t\t\t\tif ((nextSpace!=storeHouses[1-this.turn])) {\n\t\t\t\t\tnextSeedCounts[nextSpace]++;\n\t\t\t\t\tseedCount--;\n\t\t\t\t}\n\t\t\t\tif (seedCount==0) {\n\t\t\t\t\tif (nextSpace==storeHouses[this.turn]) {\n\t\t\t\t\t\tfeatures.turnContinues = true;\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\tif ((nextSeedCounts[nextSpace]==1)&&\n\t\t\t\t\t\t\t(nextSpace>=firstHomeSpace[this.turn])&&\n\t\t\t\t\t\t\t(nextSpace<=lastHomeSpace[this.turn])) {\n\t\t\t\t\t\t\t// capture\n\t\t\t\t\t\t\tvar capturedSpace = capturedSpaces[nextSpace];\n\t\t\t\t\t\t\tif (capturedSpace>=0) {\n\t\t\t\t\t\t\t\tfeatures.spaceCaptured = capturedSpace;\n\t\t\t\t\t\t\t\tfeatures.capturedCount = nextSeedCounts[capturedSpace];\n\t\t\t\t\t\t\t\tnextSeedCounts[capturedSpace] = 0;\n\t\t\t\t\t\t\t\tnextSeedCounts[storeHouses[this.turn]] += features.capturedCount;\n\t\t\t\t\t\t\t\tfeatures.seedStoredCount += nextSeedCounts[capturedSpace];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tnextSpace = (nextSpace+1)%14;\n\t\t\t}\n\t\t\treturn true;\n\t\t}\n\t\telse {\n\t\t\treturn false;\n\t\t}\n\t}\n}\n\nexport class SeedCoords {\n\ttx:number;\n\tty:number;\n\tangle:number;\n\n\tconstructor(tx:number, ty:number, angle:number) {\n\t\tthis.tx = tx;\n\t\tthis.ty = ty;\n\t\tthis.angle = angle;\n\t}\n}\n\nexport class DisplayPosition extends Position {\n\n\tconfig:SeedCoords[][];\n\n\tconstructor(seedCounts:number[],startMove:number,turn:number) {\n\t\tsuper(seedCounts,startMove,turn);\n\n\t\tthis.config = [];\n\n\t\tfor (var i = 0;i<seedCounts.length;i++) {\n\t\t\tthis.config[i] = new Array<SeedCoords>();\n\t\t}\n\t}\n\n\n\tseedCircleRect(rect:Rectangle,seedCount:number,board:Element,seed:number) {\n\t\tvar coords = this.config[seed];\n\t\tvar sq = rect.inner(0.95).square();\n\t\tvar cxo = (sq.width/2)+sq.x;\n\t\tvar cyo = (sq.height/2)+sq.y;\n\t\tvar seedNumbers = [5,7,9,11];\n\t\tvar ringIndex = 0;\n\t\tvar ringRem = seedNumbers[ringIndex];\n\t\tvar angleDelta = (2*Math.PI)/ringRem;\n\t\tvar angle = angleDelta;\n\t\tvar seedLength = sq.width/(seedNumbers.length<<1);\n\t\tvar crMax = sq.width/2-(seedLength/2);\n\t\tvar pit = createSVGInscribedCircle(sq);\n\t\tif (seed<7) {\n\t\t\tpit.setAttribute('fill','brown');\n\t\t}\n\t\telse {\n\t\t\tpit.setAttribute('fill','saddlebrown');\n\t\t}\n\t\tboard.appendChild(pit);\n\t\tvar seedsSeen = 0;\n\t\twhile (seedCount > 0) {\n\t\t\tif (ringRem == 0) {\n\t\t\t\tringIndex++;\n\t\t\t\tringRem = seedNumbers[ringIndex];\n\t\t\t\tangleDelta = (2*Math.PI)/ringRem;\n\t\t\t\tangle = angleDelta;\n\t\t\t}\n\t\t\tvar tx:number;\n\t\t\tvar ty:number;\n\t\t\tvar tangle = angle;\n\t\t\tif (coords.length>seedsSeen) {\n\t\t\t\ttx = coords[seedsSeen].tx;\n\t\t\t\tty = coords[seedsSeen].ty;\n\t\t\t\ttangle = coords[seedsSeen].angle;\n\t\t\t}\n\t\t\telse {\n\t\t\t\ttx = (Math.random()*crMax)-(crMax/3);\n\t\t\t\tty = (Math.random()*crMax)-(crMax/3);\n\t\t\t\tcoords[seedsSeen] = new SeedCoords(tx,ty,angle);\n\t\t\t}\n\t\t\tvar ell = createSVGEllipsePolar(tangle,seedLength,tx,ty,cxo,cyo);\n\t\t\tboard.appendChild(ell);\n\t\t\tangle += angleDelta;\n\t\t\tringRem--;\n\t\t\tseedCount--;\n\t\t\tseedsSeen++;\n\t\t}\n\t}\n\n\ttoCircleSVG() {\n\t\tvar seedDivisions = 14;\n\t\tvar board = document.createElementNS(svgNS,'svg');\n\t\tvar boardRect = new Rectangle(0,0,1800,800);\n\t\tboard.setAttribute('width','1800');\n\t\tboard.setAttribute('height','800');\n\t\tvar whole = createSVGRect(boardRect);\n\t\twhole.setAttribute('fill','tan');\n\t\tboard.appendChild(whole);\n\t\tvar labPlayLab = boardRect.proportionalSplitVert(20,760,20);\n\t\tvar playSurface = labPlayLab[1];\n\t\tvar storeMainStore = playSurface.proportionalSplitHoriz(8,48,8);\n\t\tvar mainPair = storeMainStore[1].subDivideVert(2);\n\t\tvar playerRects = [mainPair[0].subDivideHoriz(6), mainPair[1].subDivideHoriz(6)];\n\t\t// reverse top layer because storehouse on left\n\t\tfor (var k = 0;k<3;k++) {\n\t\t\tvar temp = playerRects[0][k];\n\t\t\tplayerRects[0][k] = playerRects[0][5-k];\n\t\t\tplayerRects[0][5-k] = temp;\n\t\t}\n\t\tvar storehouses = [storeMainStore[0],storeMainStore[2]];\n\t\tvar playerSeeds = this.seedCounts.length>>1;\n\t\tfor (var i = 0;i<2;i++) {\n\t\t\tvar player = playerRects[i];\n\t\t\tvar storehouse = storehouses[i];\n\t\t\tvar r:Rectangle;\n\t\t\tfor (var j = 0;j<playerSeeds;j++) {\n\t\t\t\tvar seed = (i*playerSeeds)+j;\n\t\t\t\tvar seedCount = this.seedCounts[seed];\n\t\t\t\tif (j==(playerSeeds-1)) {\n\t\t\t\t\tr = storehouse;\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tr = player[j];\n\t\t\t\t}\n\t\t\t\tthis.seedCircleRect(r,seedCount,board,seed);\n\t\t\t\tif (seedCount==0) {\n\t\t\t\t\t// clear\n\t\t\t\t\tthis.config[seed] = new Array<SeedCoords>();\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn board;\n\t}\n}\n}\n",t.debuggableFile="# VS Code Mock Debug\n\nThis is a starter sample for developing VS Code debug adapters.\n\n**Mock Debug** simulates a debug adapter for Visual Studio Code.\nIt supports *step*, *continue*, *breakpoints*, *exceptions*, and\n*variable access* but it is not connected to any real debugger.\n\nThe sample is meant as an educational piece showing how to implement a debug\nadapter for VS Code. It can be used as a starting point for developing a real adapter.\n\nMore information about how to develop a new debug adapter can be found\n[here](https://code.visualstudio.com/docs/extensions/example-debuggers).\nOr discuss debug adapters on Gitter:\n[![Gitter Chat](https://img.shields.io/badge/chat-online-brightgreen.svg)](https://gitter.im/Microsoft/vscode)\n\n## Using Mock Debug\n\n* Install the **Mock Debug** extension in VS Code.\n* Create a new 'program' file 'readme.md' and enter several lines of arbitrary text.\n* Switch to the debug viewlet and press the gear dropdown.\n* Select the debug environment \"Mock Debug\".\n* Press the green 'play' button to start debugging.\n\nYou can now 'step through' the 'readme.md' file, set and hit breakpoints, and run into exceptions (if the word exception appears in a line).\n\n![Mock Debug](file.jpg)\n\n## Build and Run\n\n[![build status](https://travis-ci.org/Microsoft/vscode-mock-debug.svg?branch=master)](https://travis-ci.org/Microsoft/vscode-mock-debug)\n[![build status](https://ci.appveyor.com/api/projects/status/empmw5q1tk6h1fly/branch/master?svg=true)](https://ci.appveyor.com/project/weinand/vscode-mock-debug)\n\n\n* Clone the project [https://github.com/Microsoft/vscode-mock-debug.git](https://github.com/Microsoft/vscode-mock-debug.git)\n* Open the project folder in VS Code.\n* Press 'F5' to build and launch Mock Debug in another VS Code window. In that window:\n* Open a new workspace, create a new 'program' file 'readme.md' and enter several lines of arbitrary text.\n* Switch to the debug viewlet and press the gear dropdown.\n* Select the debug environment \"Mock Debug\".\n* Press 'F5' to start debugging.",t.getImageFile=function(){const e=atob("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");return Uint8Array.from([...e].map(e=>e.charCodeAt(0)))},t.windows1251File=Uint8Array.from([192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255]),t.gbkFile=Uint8Array.from([214,208,185,250,97,98,99])}]));
//# sourceMappingURL=extension.js.map