import { basename, dirname, normalize, Path, strings } from "@angular-devkit/core";
import { apply, chain, externalSchematic, MergeStrategy, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';

//import { templateInclude } from '../lib/include';

interface SchemaOptions {
  name: string;
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ddiSchematics(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    //console.log("Hello world from schematics");
    const rule = chain([
      //runNgNewSchematic(_options),
      //createDefaultFolders(_options),
      createCoreNovoServiceFolder(_options),
      createCoreNovoStoreFolder(_options),
      createCoreNovoTypesFolder(_options),
      createModulesNovoComponentCardFiltroFolder(_options),
      createModulesNovoComponentCardListaFolder(_options),
      createModulesNovoPagesListaFolder(_options),
    ]);

    generateComponent(_options)(tree, _context);
    
    return rule(tree, _context);
  };
}

/*function runNgNewSchematic({ name }: SchemaOptions) {
  return externalSchematic("@schematics/angular", "ng-new", {
    name,
    version: "15.1.5",
    directory: name,
    routing: false,
    style: "scss",
    inlineStyle: false,
    inlineTemplate: false,
  });

}*/

/*function createDefaultFolders({ name }: SchemaOptions) {
  return (tree: Tree, _context: SchematicContext) => {
    //core-folders
    tree.create(`${name}/src/app/core/${name}/service/`, "");
    
  };
}*/

function createCoreNovoServiceFolder({ name }: SchemaOptions) {
  return (_: Tree, _context: SchematicContext) => {
    const transformedSource = apply(url("./templates/core/service"), [move(`src/app/core/${name}/service`)]);
    return mergeWith(transformedSource);
  };
}

function createCoreNovoStoreFolder({ name }: SchemaOptions) {
  return (_: Tree, _context: SchematicContext) => {
    const transformedSource = apply(url("./templates/core/store"), [move(`src/app/core/${name}/store`)]);
    return mergeWith(transformedSource);
  };
}

function createCoreNovoTypesFolder({ name }: SchemaOptions) {
  return (_: Tree, _context: SchematicContext) => {
    const transformedSource = apply(url("./templates/core/types"), [move(`src/app/core/${name}/types`)]);
    return mergeWith(transformedSource);
  };
}

function createModulesNovoComponentCardFiltroFolder({ name }: SchemaOptions) {
  return (_: Tree, _context: SchematicContext) => {
    const transformedSource = apply(url("./templates/modules/components/card-filtra-novo"), [move(`src/app/modules/${name}/components/card-filtra-novo`)]);
    return mergeWith(transformedSource);
  };
}

function createModulesNovoComponentCardListaFolder({ name }: SchemaOptions) {
  return (_: Tree, _context: SchematicContext) => {
    const transformedSource = apply(url("./templates/modules/components/card-lista-novo"), [move(`src/app/modules/${name}/components/card-lista-novo`)]);
    return mergeWith(transformedSource);
  };
}

function toCamelCase(value: string): string {
  return strings.camelize(value);
}

// Função auxiliar para formatar strings para KebabCase
function toKebabCase(value: string): string {
  return strings.dasherize(value);
}

function createModulesNovoPagesListaFolder({ name }: SchemaOptions) {
  return (_: Tree, _context: SchematicContext) => {
    let source = url("./templates/modules/pages");
    let outputPath = `src/app/modules/${name}/pages`;

    return mergeWith(
      apply(source, [
        //templateInclude(_context, templateData, outputPath),
        move(outputPath)
      ])
    );
  };
}

// Função para gerar o conteúdo do componente
function generateComponent(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    console.log("entrou...");

    const sourceTemplates = url('./files');

    const templateSource = apply(sourceTemplates, [
      template({
        ...strings,
        ...options,
        toCamelCase,
        toKebabCase,
      }),
    ]);

    console.log(templateSource)

    return mergeWith(templateSource)(tree, _context);
  };
}

export function subscriptionComponent(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {

      _options.name = basename(_options.name as Path);
      _options.path = normalize('/' + dirname((_options.path + '/' + _options.name) as Path));

      const templateSource = apply(
          url('./files'), [
              template({
                  ..._options,
                  classify: strings.classify,
                  dasherize: strings.dasherize,
              }),
              move(_options.path as string),
          ]);

      return chain([
          externalSchematic('@schematics/angular', 'component', _options),
          mergeWith(templateSource, MergeStrategy.Overwrite),
      ]);
  };
}

