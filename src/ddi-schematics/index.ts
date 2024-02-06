import { basename, dirname, normalize, Path, strings } from "@angular-devkit/core";
import {
	apply,
	chain,
	MergeStrategy,
	mergeWith,
	move,
	renameTemplateFiles,
	Rule,
	SchematicContext,
	template,
	Tree,
	url
} from '@angular-devkit/schematics';

interface SchemaOptions {
  name: string;
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ddiSchematics(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    //console.log("Hello world from schematics");
    const rule = chain([
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

      const templateSourceModulePage = apply(
          url('./files/modules/pages'), [
            renameTemplateFiles(),
              template({
                  ...strings,
                  ..._options,
              }),
              move(_options.path+'/modules/'+_options.name+'/pages/' as string),
          ]);

      const templateSourceModuleRoute = apply(
        url('./files/modules/components/module'), [
          renameTemplateFiles(),
            template({
                ...strings,
                ..._options,
            }),
            move(_options.path+'/modules/'+_options.name as string),
        ]);    
      
      const templateSourceModuleComponentLista = apply(
        url('./files/modules/components/card-lista'), [
          renameTemplateFiles(),
            template({
                ...strings,
                ..._options,
            }),
            move(_options.path+'/modules/'+_options.name+'/components/card-lista' as string),
        ]);

      const templateSourceModuleComponentFiltra = apply(
        url('./files/modules/components/card-filtra'), [
          renameTemplateFiles(),
            template({
                ...strings,
                ..._options,
            }),
            move(_options.path+'/modules/'+_options.name+'/components/card-filtra' as string),
        ]);

      const templateSourceCoreComponentService = apply(
        url('./files/core/service'), [
          renameTemplateFiles(),
            template({
                ...strings,
                ..._options,
            }),
            move(_options.path+'/core/'+_options.name+'/service' as string),
        ]); 

      const templateSourceCoreComponentStore = apply(
        url('./files/core/store'), [
          renameTemplateFiles(),
            template({
                ...strings,
                ..._options,
            }),
            move(_options.path+'/core/'+_options.name+'/store' as string),
        ]);

        const templateSourceCoreComponentTypes = apply(
          url('./files/core/types'), [
            renameTemplateFiles(),
              template({
                  ...strings,
                  ..._options,
              }),
              move(_options.path+'/core/'+_options.name+'/types' as string),
          ]);

        const templateSourceCoreComponent = apply(
          url('./files/core'), [
            renameTemplateFiles(),
              template({
                  ...strings,
                  ..._options,
              }),
              move(_options.path+'/core/'+_options.name as string),
          ]);
        
        const templateSourceModuleComponent = apply(
          url('./files/modules/module'), [
            renameTemplateFiles(),
              template({
                  ...strings,
                  ..._options,
              }),
                move(_options.path+'/modules/'+_options.name as string),
          ]);
          
        const templateSourceModalCrudComponent = apply(
          url('./files/modules/components/modal/modal-crud'), [
            renameTemplateFiles(),
              template({
                  ...strings,
                  ..._options,
              }),
              move(_options.path+'/modules/'+_options.name+'/components/modal-crud/' as string), 
          ]);

          const templateSourceModalDetalhesComponent = apply(
            url('./files/modules/components/modal/modal-detalhes'), [
              renameTemplateFiles(),
                template({
                    ...strings,
                    ..._options,
                }),
                move(_options.path+'/modules/'+_options.name+'/components/modal-detalhes/' as string), 
            ]);
            
          const templateSourceModalAlterarComponent = apply(
            url('./files/modules/components/modal/modal-alterar'), [
              renameTemplateFiles(),
                template({
                    ...strings,
                    ..._options,
                }),
                move(_options.path+'/modules/'+_options.name+'/components/modal-alterar/' as string), 
            ]);
            
          const templateSourceModalExcluirComponent = apply(
            url('./files/modules/components/modal/modal-excluir'), [
              renameTemplateFiles(),
                template({
                    ...strings,
                    ..._options,
                }),
                move(_options.path+'/modules/'+_options.name+'/components/modal-excluir/' as string), 
            ]);
            
          const templateSourceModalIncluirComponent = apply(
            url('./files/modules/components/modal/modal-incluir'), [
              renameTemplateFiles(),
                template({
                    ...strings,
                    ..._options,
                }),
                move(_options.path+'/modules/'+_options.name+'/components/modal-incluir/' as string), 
            ]);  
    
      let mergedCore = chain([]);
      let mergedList = chain([]);
      let mergeModal = chain([]);

      _options.createComponents.map((componentName: string) => {
        if (componentName==='Create Core components') {
          mergedCore = chain([
            mergeWith(templateSourceCoreComponentService, MergeStrategy.Overwrite),
            mergeWith(templateSourceCoreComponentStore, MergeStrategy.Overwrite),
            mergeWith(templateSourceCoreComponentTypes, MergeStrategy.Overwrite),
            mergeWith(templateSourceCoreComponent, MergeStrategy.Overwrite),
          ])
        }
        
        if (componentName==='Create List components') {
          mergedList = chain([
            mergeWith(templateSourceModuleComponentFiltra, MergeStrategy.Overwrite),
            mergeWith(templateSourceModuleComponentLista, MergeStrategy.Overwrite),
            mergeWith(templateSourceModulePage, MergeStrategy.Overwrite),
            mergeWith(templateSourceModuleComponent, MergeStrategy.Overwrite),
            mergeWith(templateSourceModuleRoute, MergeStrategy.Overwrite)
          ])
        }  

        if (componentName==='Create Modal components') {
          //console.log('criar modal components');
          mergeModal = chain([
            mergeWith(templateSourceModalCrudComponent, MergeStrategy.Overwrite),
            mergeWith(templateSourceModalDetalhesComponent, MergeStrategy.Overwrite),
            mergeWith(templateSourceModalAlterarComponent, MergeStrategy.Overwrite),
            mergeWith(templateSourceModalExcluirComponent, MergeStrategy.Overwrite),
            mergeWith(templateSourceModalIncluirComponent, MergeStrategy.Overwrite)
          ]);
        }  

      });

      /*return chain([
          mergeWith(templateSourceCoreComponentService, MergeStrategy.Overwrite),
          mergeWith(templateSourceCoreComponentStore, MergeStrategy.Overwrite),
          mergeWith(templateSourceCoreComponentTypes, MergeStrategy.Overwrite),
          mergeWith(templateSourceModuleComponentFiltra, MergeStrategy.Overwrite),
          mergeWith(templateSourceModuleComponentLista, MergeStrategy.Overwrite),
          mergeWith(templateSourceModulePage, MergeStrategy.Overwrite),
          mergeWith(templateSourceCoreComponent, MergeStrategy.Overwrite),
          mergeWith(templateSourceModuleComponent, MergeStrategy.Overwrite)
      ]);*/

      return chain([mergedCore, mergedList, mergeModal])
  };
}

