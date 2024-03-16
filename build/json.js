/* Copyright (c) NriotHrreion 2024 */
/* Repo: https://github.com/NriotHrreion/json */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var o in r)("object"==typeof exports?exports:t)[o]=r[o]}}(this,(()=>(()=>{"use strict";var t={416:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.JSONCompiler=e.ValueType=void 0;var o,n,i,a=r(464),s=r(417),u=r(51),h=r(295),c=r(521),p=r(574);!function(t){t[t.LEFT_BRACE=123]="LEFT_BRACE",t[t.RIGHT_BRACE=125]="RIGHT_BRACE",t[t.LEFT_BRACKET=91]="LEFT_BRACKET",t[t.RIGHT_BRACKET=93]="RIGHT_BRACKET",t[t.SINGLE_QUOTE=39]="SINGLE_QUOTE",t[t.DOUBLE_QUOTE=34]="DOUBLE_QUOTE",t[t.COLON=58]="COLON",t[t.COMMA=44]="COMMA",t[t.POINT=46]="POINT",t[t.SPACE=32]="SPACE",t[t.SLASH=47]="SLASH",t[t.BACKSLASH=92]="BACKSLASH",t[t.UNDERSCORE=95]="UNDERSCORE",t[t.HYPHEN=45]="HYPHEN",t[t.NEWLINE=10]="NEWLINE"}(o||(o={})),function(t){t.TRUE="true",t.FALSE="false",t.NULL="null"}(n||(n={})),function(t){t[t.STRING=0]="STRING",t[t.NUMBER=1]="NUMBER",t[t.BOOLEAN=2]="BOOLEAN",t[t.NULL=3]="NULL"}(i||(e.ValueType=i={}));var l=function(){function t(t){this.jsonStr=t,this.layer=0,this.atKey=!1,this.atValue=!1,this.atString=!1,this.atNumber=!1,this.atObject=!1,this.atArray=!1,this.tempKey="",this.tempValue="",this.tempObject="",this.tempArray="",this.tokenMgr=new s.TokenManager,this.jsonStr=this.jsonStr.trim(),this.tokenize()}return t.prototype.tokenize=function(){if(this.getCharCode(0)!==o.LEFT_BRACE&&this.getCharCode(0)!==o.LEFT_BRACKET)throw new p.UnknownError("Invalid JSON",0);for(var t=0;t<this.jsonStr.length;t++){var e=this.jsonStr[t],r=this.getCharCode(t);if(this.atObject||this.atArray)switch(this.atObject?this.tempObject+=e:this.tempArray+=e,r){case o.LEFT_BRACE:case o.LEFT_BRACKET:this.layer++;break;case o.RIGHT_BRACE:this.layer===this.tempLayer&&(this.atObject=!1,this.tempLayer=void 0),this.layer--;break;case o.RIGHT_BRACKET:this.layer===this.tempLayer&&(this.atArray=!1,this.tempLayer=void 0),this.layer--}else switch(r){case o.LEFT_BRACE:this.layer++,0===t?(this.tokenMgr.createObjectTree(),this.mode=a.JSONValueType.OBJECT):this.atObject||(this.atObject=!0,this.tempLayer=this.layer,this.tempObject+=e);break;case o.LEFT_BRACKET:this.layer++,0===t?(this.tokenMgr.createArrayTree(),this.mode=a.JSONValueType.ARRAY):this.atArray||(this.atArray=!0,this.tempLayer=this.layer,this.tempArray+=e);break;case o.RIGHT_BRACE:this.atValue&&0===this.tempObject.length&&0===this.tempArray.length?(this.atNumber=!1,this.atValue=!1,this.pushItem()):0!==this.tempObject.length?this.pushObject():0!==this.tempArray.length&&this.pushArray(),this.layer--;break;case o.RIGHT_BRACKET:this.atValue&&0===this.tempArray.length&&0===this.tempObject.length?(this.atNumber=!1,this.atValue=!1,this.pushItem()):0!==this.tempArray.length?this.pushArray():0!==this.tempObject.length&&this.pushObject(),this.layer--;break;case o.DOUBLE_QUOTE:if(this.atValue||this.mode!==a.JSONValueType.ARRAY||(this.atValue=!0),this.atValue||this.atKey)if(!this.atValue&&this.atKey)this.atKey=!1;else if(this.atValue&&!this.atString)this.atString=!0,this.tempValueType=i.STRING;else{if(!this.atValue||!this.atString)throw new u.SyntaxError("Unexpected quote",t);this.atString=!1}else this.atKey=!0;break;case o.COLON:this.atKey||(this.atValue=!0);break;case o.COMMA:if(this.atValue&&0===this.tempObject.length&&0===this.tempArray.length)this.atNumber=!1,this.atValue=!1,this.pushItem();else if(0!==this.tempObject.length)this.atValue=!1,this.pushObject();else{if(0===this.tempArray.length)throw new u.SyntaxError("Unexpected comma",t);this.atValue=!1,this.pushArray()}break;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:if(!this.atValue&&!this.atNumber&&this.mode!==a.JSONValueType.ARRAY)throw new u.SyntaxError('Unexpected number "'+e+'"',t);if(this.atString){this.tempValue+=e;continue}0===this.tempValue.length&&(this.tempValueType=i.NUMBER,this.atNumber=!0,this.mode===a.JSONValueType.ARRAY&&(this.atValue=!0)),this.tempValue+=e;break;default:if(this.atKey)this.tempKey+=e;else if(this.atValue&&this.atString)this.tempValue+=e;else if(this.atValue&&!this.atString&&r===o.HYPHEN){if(0!==this.tempValue.length)throw new u.SyntaxError("Invalid number",t);this.tempValueType=i.NUMBER,this.atNumber=!0,this.tempValue+=e}else{if(!this.atValue||!this.atNumber||r!==o.POINT){if(!this.atValue&&this.mode!==a.JSONValueType.ARRAY||116!==r||114!==this.getCharCode(t+1)||117!==this.getCharCode(t+2)||101!==this.getCharCode(t+3)){if(!this.atValue&&this.mode!==a.JSONValueType.ARRAY||102!==r||97!==this.getCharCode(t+1)||108!==this.getCharCode(t+2)||115!==this.getCharCode(t+3)||101!==this.getCharCode(t+4)){if(!this.atValue&&this.mode!==a.JSONValueType.ARRAY||110!==r||117!==this.getCharCode(t+1)||108!==this.getCharCode(t+2)||108!==this.getCharCode(t+3)){if(r===o.SPACE||r===o.NEWLINE)continue;throw new u.SyntaxError('Unexpected char "'+e+'"',t)}this.mode===a.JSONValueType.ARRAY&&(this.atValue=!0),this.tempValueType=i.NULL,this.tempValue=n.NULL,t+=3;continue}this.mode===a.JSONValueType.ARRAY&&(this.atValue=!0),this.tempValueType=i.BOOLEAN,this.tempValue=n.FALSE,t+=4;continue}this.mode===a.JSONValueType.ARRAY&&(this.atValue=!0),this.tempValueType=i.BOOLEAN,this.tempValue=n.TRUE,t+=3;continue}if(this.tempValue.includes("."))throw new u.SyntaxError("Invalid number",t);this.tempValue+=e}}}},t.prototype.getCharCode=function(t){return this.jsonStr[t].charCodeAt(0)},t.prototype.pushItem=function(){this.mode===a.JSONValueType.ARRAY?this.tokenMgr.pushArrayItem(this.tempValue,this.tempValueType):(this.tokenMgr.pushObjectItem(this.tempKey,this.tempValue,this.tempValueType),this.tempKey=""),this.tempValue="",this.tempValueType=void 0},t.prototype.pushObject=function(){var e=new t(this.tempObject);this.mode===a.JSONValueType.ARRAY?this.tokenMgr.pushArrayItem(e.tokenMgr.getTree().unsafeToObjectToken(this.tempKey)):this.tokenMgr.pushObjectItem(this.tempKey,e.tokenMgr.getTree().unsafeToObjectToken(this.tempKey)),this.tempKey="",this.tempObject=""},t.prototype.pushArray=function(){var e=new t(this.tempArray);this.mode===a.JSONValueType.ARRAY?this.tokenMgr.pushArrayItem(e.tokenMgr.getTree().unsafeToArrayToken(this.tempKey)):this.tokenMgr.pushObjectItem(this.tempKey,e.tokenMgr.getTree().unsafeToArrayToken(this.tempKey)),this.tempKey="",this.tempArray=""},t.prototype.make=function(){var e=this.tokenMgr.getTree();return this.mode===a.JSONValueType.OBJECT?t.makeObject(e):this.mode===a.JSONValueType.ARRAY?t.makeArray(e):void 0},t.makeObject=function(e){var r=new Object;return e.forEach((function(e){var o=e.value;e instanceof h.ObjectToken?o=t.makeObject(e.toRootToken()):e instanceof c.ArrayToken&&(o=t.makeArray(e.toRootToken())),r[e.key]=o})),r},t.makeArray=function(e){var r=new Array;return e.forEach((function(e){var o=e;e instanceof h.ObjectToken?o=t.makeObject(e.toRootToken()):e instanceof c.ArrayToken&&(o=t.makeArray(e.toRootToken())),r.push(o)})),r},t}();e.JSONCompiler=l},94:function(t,e){var r,o=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0}),e.JSONError=void 0;var n=function(t){function e(e,r){var o=t.call(this,"JSON ".concat(e,": ").concat(r))||this;return o.type=e,o.message=r,o}return o(e,t),e}(Error);e.JSONError=n},51:function(t,e,r){var o,n=this&&this.__extends||(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.SyntaxError=void 0;var i=function(t){function e(e,r){return t.call(this,"SyntaxError",e+" at "+r+".")||this}return n(e,t),e}(r(94).JSONError);e.SyntaxError=i},574:function(t,e,r){var o,n=this&&this.__extends||(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.UnknownError=void 0;var i=function(t){function e(e,r){return t.call(this,"UnknwonError",e+" at "+r+".")||this}return n(e,t),e}(r(94).JSONError);e.UnknownError=i},129:function(t,e,r){var o=this&&this.__createBinding||(Object.create?function(t,e,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(e,r);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,o,n)}:function(t,e,r,o){void 0===o&&(o=r),t[o]=e[r]}),n=this&&this.__exportStar||function(t,e){for(var r in t)"default"===r||Object.prototype.hasOwnProperty.call(e,r)||o(e,t,r)};Object.defineProperty(e,"__esModule",{value:!0}),n(r(287),e)},287:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.JSON=void 0;var o=r(416),n=r(697),i=function(){function t(){}return t.parse=function(t){return new o.JSONCompiler(t).make()},t.stringify=function(t){var e=new n.StringBuilder;if(Array.isArray(t)){e.add("[");var r=t;r.forEach((function(t,o){e.pushValue(t),o!==r.length-1&&e.add(",")})),e.add("]")}else{for(var o in e.add("{"),t){var i=t[o];e.add('"'.concat(o,'":')),e.pushValue(i),e.add(",")}","===e.getChar(e.length-1)&&e.remove(e.length-1),e.add("}")}return e.getString()},t}();e.JSON=i},697:(t,e)=>{function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.StringBuilder=void 0;var o=function(){function t(){this.str=""}return Object.defineProperty(t.prototype,"length",{get:function(){return this.str.length},enumerable:!1,configurable:!0}),t.prototype.add=function(t){this.str+=t},t.prototype.getChar=function(t){return this.str[t]},t.prototype.remove=function(t){this.str=this.str.slice(0,t)+this.str.slice(t+1,this.length)},t.prototype.pushValue=function(t){switch(r(t)){case"string":this.add('"'.concat(t,'"'));break;case"number":this.add(t.toString());break;case"boolean":this.add(!0===t?"true":"false");break;default:null===t?this.add("null"):this.add(JSON.stringify(t))}},t.prototype.getString=function(){return this.str},t}();e.StringBuilder=o},417:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.TokenManager=void 0;var o=r(416),n=r(610),i=r(713),a=function(){function t(){}return t.prototype.createObjectTree=function(){this.tree=n.RootToken.createObjectRoot()},t.prototype.createArrayTree=function(){this.tree=n.RootToken.createArrayRoot()},t.prototype.getTree=function(){return this.tree},t.prototype.pushObjectItem=function(e,r,o){"string"==typeof r?this.tree.push(new i.ValueToken(e,t.transformToType(r,o))):this.tree.push(r)},t.prototype.pushArrayItem=function(e,r){"string"==typeof e?this.tree.push(t.transformToType(e,r)):this.tree.push(e)},t.prototype.isExist=function(t){if(this.tree.value.hasOwnProperty)return this.tree.value.hasOwnProperty(t)},t.prototype.print=function(){console.log(this.tree)},t.transformToType=function(t,e){switch(e){case o.ValueType.STRING:return t;case o.ValueType.NUMBER:return parseFloat(t);case o.ValueType.BOOLEAN:return"true"===t;case o.ValueType.NULL:return null}},t}();e.TokenManager=a},521:function(t,e,r){var o,n=this&&this.__extends||(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.ArrayToken=void 0;var i=r(464),a=r(610),s=r(350),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=s.TokenType.ARRAY,e}return n(e,t),e.create=function(t){return new e(t,[])},e.prototype.push=function(t){this.value.push(t)},e.prototype.toRootToken=function(){var t=a.RootToken.createArrayRoot();return t.value=this.value,t},e}(i.JSONToken);e.ArrayToken=u},464:function(t,e,r){var o,n=this&&this.__extends||(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.JSONToken=e.JSONValueType=void 0;var i,a=r(713);!function(t){t[t.OBJECT=0]="OBJECT",t[t.ARRAY=1]="ARRAY"}(i||(e.JSONValueType=i={}));var s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype.forEach=function(t){for(var e in this.value)t(this.value[e])},e}(a.ValueToken);e.JSONToken=s},295:function(t,e,r){var o,n=this&&this.__extends||(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.ObjectToken=void 0;var i=r(464),a=r(610),s=r(350),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=s.TokenType.OBJECT,e}return n(e,t),e.create=function(t){return new e(t,{})},e.prototype.push=function(t){this.value[t.key]=t},e.prototype.toRootToken=function(){var t=a.RootToken.createObjectRoot();return t.value=this.value,t},e}(i.JSONToken);e.ObjectToken=u},610:function(t,e,r){var o,n=this&&this.__extends||(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.RootToken=void 0;var i=r(521),a=r(464),s=r(295),u=r(350),h=function(t){function e(e,r){var o=t.call(this,e,r)||this;return o.type=u.TokenType.ROOT,o.mode=Array.isArray(r)?a.JSONValueType.ARRAY:a.JSONValueType.OBJECT,o}return n(e,t),e.createObjectRoot=function(){return new e("\\",{})},e.createArrayRoot=function(){return new e("\\",[])},e.prototype.push=function(t){this.mode===a.JSONValueType.ARRAY?this.value.push(t):this.value[t.key]=t},e.prototype.unsafeToObjectToken=function(t){var e=s.ObjectToken.create(t);return e.value=this.value,e},e.prototype.unsafeToArrayToken=function(t){var e=i.ArrayToken.create(t);return e.value=this.value,e},e}(a.JSONToken);e.RootToken=h},350:(t,e)=>{var r;Object.defineProperty(e,"__esModule",{value:!0}),e.Token=e.TokenType=void 0,function(t){t[t.VALUE=0]="VALUE",t[t.OBJECT=1]="OBJECT",t[t.ARRAY=2]="ARRAY",t[t.ROOT=3]="ROOT"}(r||(e.TokenType=r={}));var o=function(t){this.value=t};e.Token=o},713:function(t,e,r){var o,n=this&&this.__extends||(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.ValueToken=void 0;var i=r(350),a=function(t){function e(e,r){var o=t.call(this,r)||this;return o.key=e,o.type=i.TokenType.VALUE,o}return n(e,t),e}(i.Token);e.ValueToken=a}},e={};var r=function r(o){var n=e[o];if(void 0!==n)return n.exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,r),i.exports}(129);return r})()));
//# sourceMappingURL=json.js.map