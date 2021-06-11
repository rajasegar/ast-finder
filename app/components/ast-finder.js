import Component from '@glimmer/component';
import { babel as babelFinder, glimmer } from 'ast-node-finder';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import recast from 'recast';
import etr from 'ember-template-recast';
import recastBabel from 'recastBabel';
import recastBabylon from 'recastBabylon';

const { dispatchNodes } = babelFinder;

function filterAstNodes(key, value) {
  return ['loc', 'tokens'].includes(key) ? undefined : value;
}
export default class AstFinderComponent extends Component {
  @service customize;
  @tracked code = this.args.samplecode;

  get theme() {
    return this.customize.theme;
  }

  get parse() {
    let parse = recast.parse;
    let _parser = this.parser;
    switch (_parser) {
      case 'babylon':
        parse = recastBabylon.parse;
        break;
      case 'babel':
        parse = recastBabel.parse;
        break;
      case 'ember-template-recast':
        parse = etr.parse;
        break;
    }
    return parse;
  }

  get ast() {
    let parse = this.parse;
    let ast;
    try {
      ast = parse(this.code);
    } catch (error) {
      console.error(error); // eslint-disable-line
      ast = {};
    }
    return JSON.stringify(ast, filterAstNodes, 2);
  }

  get pseudoAst() {
    let parse = this.parse;
    let ast = {};

    try {
      ast = parse(this.code);
    } catch (err) {}
    let _mode = this.args.mode;
    let str;
    switch (_mode) {
      case 'javascript':
        str = dispatchNodes(ast);
        break;

      case 'handlebars':
        str = glimmer.dispatchNodes(ast);
        break;
    }
    return str;
  }

  get nodeApi() {
    let str = this.pseudoAst;
    return recast.prettyPrint(recast.parse(str), { tabWidth: 2 }).code;
  }

  constructor() {
    super(...arguments);
    this.jsonMode = { name: 'javascript', json: true };
    this.gutters = ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'];
  }
}
