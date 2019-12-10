"use strict"
define("ast-finder/app",["exports","ast-finder/resolver","ember-load-initializers","ast-finder/config/environment"],(function(e,t,r,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var i=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:t.default});(0,r.default)(i,n.default.modulePrefix)
var a=i
e.default=a})),define("ast-finder/components/ast-finder",["exports","recast","ast-node-finder"],(function(_exports,_recast,_astNodeFinder){Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0
var j=_recast.types.builders,_code1='\nhello();\nlet hello = "world";\nexport default function() {};\n',_code="foo.bar.baz();"
function filterAstNodes(e,t){return["loc","tokens"].includes(e)?void 0:t}var _default=Ember.Component.extend({customize:Ember.inject.service(),code:_code,theme:Ember.computed.reads("customize.theme"),ast:Ember.computed("code",(function(){var e=(0,_recast.parse)(this.get("code"))
return console.log(e.program.body),JSON.stringify(e,filterAstNodes,2)})),pseudoAst:Ember.computed("code",(function(){var e=(0,_recast.parse)(this.get("code"))
return(0,_astNodeFinder.dispatchNodes)(e)})),nodeApi:Ember.computed("pseudoAst",(function(){var e=this.get("pseudoAst").join("\n//-----------------------\n")
return(0,_recast.prettyPrint)((0,_recast.parse)(e),{tabWidth:2}).code})),output:Ember.computed("pseudoAst",(function(){var sampleCode="",outputAst=(0,_recast.parse)(sampleCode)
this.get("pseudoAst").forEach((function(n){return outputAst.program.body.push(eval(n))}))
var output=(0,_recast.print)(outputAst,{quote:"single"}).code
return output})),init:function(){this._super.apply(this,arguments),this.set("jsonMode",{name:"javascript",json:!0}),this.set("gutters",["CodeMirror-linenumbers","CodeMirror-foldgutter"])}})
_exports.default=_default})),define("ast-finder/components/ivy-codemirror",["exports","ivy-codemirror/components/ivy-codemirror"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-finder/controllers/application",["exports","ast-finder/config/environment"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Controller.extend({customize:Ember.inject.service(),emberVersion:Ember.computed((function(){return t.default.pkg.devDependencies["ember-source"]})),nodeFinderVersion:Ember.computed((function(){return t.default.pkg.dependencies["ast-node-finder"]})),actions:{toggleDarkMode:function(){this.customize.toggleDarkMode()}}})
e.default=r})),define("ast-finder/helpers/app-version",["exports","ast-finder/config/environment","ember-cli-app-version/utils/regexp"],(function(e,t,r){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.default.APP.version,a=n.versionOnly||n.hideSha,o=n.shaOnly||n.hideVersion,d=null
return a&&(n.showExtended&&(d=i.match(r.versionExtendedRegExp)),d||(d=i.match(r.versionRegExp))),o&&(d=i.match(r.shaRegExp)),d?d[0]:i}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var i=Ember.Helper.helper(n)
e.default=i})),define("ast-finder/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("ast-finder/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("ast-finder/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ast-finder/config/environment"],(function(e,t,r){var n,i
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,r.default.APP&&(n=r.default.APP.name,i=r.default.APP.version)
var a={name:"App Version",initialize:(0,t.default)(n,i)}
e.default=a})),define("ast-finder/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=r})),define("ast-finder/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],(function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:t.default}
e.default=n})),define("ast-finder/initializers/export-application-global",["exports","ast-finder/config/environment"],(function(e,t){function r(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var r
if("undefined"!=typeof window)r=window
else if("undefined"!=typeof global)r=global
else{if("undefined"==typeof self)return
r=self}var n,i=t.default.exportApplicationGlobal
n="string"==typeof i?i:Ember.String.classify(t.default.modulePrefix),r[n]||(r[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete r[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=r,e.default=void 0
var n={name:"export-application-global",initialize:r}
e.default=n})),define("ast-finder/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"ember-data",initialize:t.default}
e.default=r})),define("ast-finder/resolver",["exports","ember-resolver"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("ast-finder/router",["exports","ast-finder/config/environment"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
r.map((function(){}))
var n=r
e.default=n})),define("ast-finder/routes/index",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t})),define("ast-finder/services/ajax",["exports","ember-ajax/services/ajax"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-finder/services/code-mirror",["exports","ivy-codemirror/services/code-mirror"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-finder/services/customize",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Service.extend({darkMode:!1,theme:Ember.computed("darkMode",(function(){return this.get("darkMode")?"solarized dark":"solarized light"})),toggleDarkMode:function(){var e=this.get("darkMode")
this.set("darkMode",!e)}})
e.default=t})),define("ast-finder/templates/application",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"GjYCW5XM",block:'{"symbols":[],"statements":[[7,"header",true],[8],[0,"\\n  "],[7,"h1",true],[8],[0,"AST-Finder"],[9],[0,"\\n  "],[7,"nav",true],[8],[0,"\\n    "],[7,"ul",true],[8],[0,"\\n      "],[7,"li",true],[8],[0,"\\n      "],[9],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n  "],[7,"div",true],[10,"id","options"],[8],[0,"\\n    "],[7,"p",true],[8],[0,"DarkMode: "],[5,"input",[],[["@type","@click"],["checkbox",[28,"action",[[23,0,[]],"toggleDarkMode"],null]]]],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"],[7,"main",true],[8],[0,"\\n  "],[1,[22,"outlet"],false],[0,"\\n"],[9],[0,"\\n"],[7,"footer",true],[8],[0,"\\n  "],[7,"p",true],[8],[0,"\\n  Built with "],[7,"a",true],[10,"href","https://emberjs.com"],[8],[0,"Ember.js: "],[1,[22,"emberVersion"],false],[9],[0," |\\n  "],[7,"a",true],[10,"href","https://github.com/rajasegar/ast-node-finder"],[8],[0,"ast-node-finder: "],[1,[22,"nodeFinderVersion"],false],[9],[0," |\\n    "],[7,"a",true],[10,"href","https://github.com/rajasegar/ast-finder"],[8],[0,"Github"],[9],[0," |\\n    "],[7,"a",true],[10,"href","https://github.com/rajasegar/ast-finder/issues"],[8],[0,"Report issues"],[9],[0," \\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-finder/templates/application.hbs"}})
e.default=t})),define("ast-finder/templates/components/ast-finder",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"cFmcaLfe",block:'{"symbols":[],"statements":[[7,"div",true],[10,"class","grid-row"],[8],[0,"\\n  "],[7,"div",true],[10,"class","grid-col"],[8],[0,"\\n    "],[7,"div",true],[8],[0,"\\n      "],[7,"p",true],[8],[7,"strong",true],[8],[0,"1."],[9],[0," Enter source code here:"],[9],[0,"\\n      "],[1,[28,"ivy-codemirror",null,[["value","options","valueUpdated"],[[24,["code"]],[28,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript",[24,["theme"]]]]],[28,"action",[[23,0,[]],[28,"mut",[[24,["code"]]],null]],null]]]],false],[0,"\\n    "],[9],[0,"\\n    "],[7,"div",true],[8],[0,"\\n      "],[7,"p",true],[8],[0,"Abstract Syntax Tree (AST) "],[9],[0,"\\n      "],[1,[28,"ivy-codemirror",null,[["value","options"],[[24,["ast"]],[28,"hash",null,[["mode","theme","foldGutter","lineNumbers","lineWrapping","gutters","readOnly"],[[24,["jsonMode"]],[24,["theme"]],true,true,true,[24,["gutters"]],true]]]]]],false],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n  "],[7,"div",true],[10,"class","grid-col"],[8],[0,"\\n    "],[7,"div",true],[8],[0,"\\n      "],[7,"p",true],[8],[0,"jscodeshift find api:"],[9],[0,"\\n      "],[1,[28,"ivy-codemirror",null,[["value","options"],[[24,["nodeApi"]],[28,"hash",null,[["lineNumbers","mode","theme","autoIndent"],[true,"javascript",[24,["theme"]],true]]]]]],false],[0,"\\n    "],[9],[0,"\\n    "],[7,"div",true],[8],[0,"\\n      "],[7,"p",true],[8],[0," "],[9],[0," \\n      "],[1,[28,"ivy-codemirror",null,[["value","options"],["",[28,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript",[24,["theme"]]]]]]]],false],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-finder/templates/components/ast-finder.hbs"}})
e.default=t})),define("ast-finder/templates/index",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"0lxZWK2Z",block:'{"symbols":[],"statements":[[5,"ast-finder",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-finder/templates/index.hbs"}})
e.default=t})),define("ast-finder/config/environment",[],(function(){try{var e="ast-finder/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),r={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(r,"__esModule",{value:!0}),r}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}})),runningTests||require("ast-finder/app").default.create({name:"ast-finder",version:"0.0.0+253284b8"})
