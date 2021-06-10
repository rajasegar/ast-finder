import Component from '@ember/component';
import { babel as babelFinder, glimmer } from 'ast-node-finder';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import recast from 'recast';
import etr from 'ember-template-recast';
import recastBabel from 'recastBabel';
import recastBabylon from 'recastBabylon';

const j = recast.types.builders; // eslint-disable-line
const b = etr.builders; // eslint-disable-line

const { dispatchNodes } = babelFinder;

function filterAstNodes(key, value) {
  return ['loc', 'tokens'].includes(key) ? undefined : value;
}
export default class AstFinderComponent extends Component {
  @service customize;

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
    debugger;
    let parse = this.parse;
    let ast = parse(this.code);
    let _mode = this.mode;
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
    let str = this.pseudoAst.join('\n//-----------------------\n');
    return recast.prettyPrint(recast.parse(str), { tabWidth: 2 }).code;
  }

  get output() {
    const sampleCode = '';
    let parse = this.parse;
    const outputAst = parse(sampleCode);

    // Check the manifested api is working fine
    this.pseudoAst.forEach((n) => outputAst.program.body.push(eval(n)));

    const output = print(outputAst, { quote: 'single' }).code;

    return output;
  }

  constructor() {
    super(...arguments);
    this.jsonMode = { name: 'javascript', json: true };
    this.gutters = ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'];
  }
}
