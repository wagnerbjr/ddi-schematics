/*import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { <%= classify(name) %>ActionTypes } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.actions.types';
import { <%= classify(name) %>Lista } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>.dto';
import { PrvDateUtil } from '@core/utils/prv-date.util';
import { PrvUtil } from '@core/utils/prv.util';
import { Action } from '@ddi-ng/layout';
import { ColumnType, TableColumn } from '@ddi-ng/layout/lib/table/_types';
import { PermissaoService } from '@ddi-ng/permissao';

@Component({
  selector: 'app-card-lista-dinamica-<%= dasherize(name) %>',
  templateUrl: './card-lista-dinamica-<%= dasherize(name) %>.component.html',
  styleUrls: ['./card-lista-dinamica-<%= dasherize(name) %>.component.scss']
})
export class CardLista<%= classify(name) %>Component implements OnInit, OnChanges {

  @Input() criterioPesquisa: number = null;

  // Para cada critério, declarar uma variável @Input
  @Input() lista<%= classify(name) %>: <%= classify(name) %>Lista[] = [];

  @Input() pageInfos: any = null;

  @Output() rowClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() menuClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() redirectEvent: EventEmitter<<%= classify(name) %>ActionTypes> = new EventEmitter();
  @Output() pageInfosChange: EventEmitter<{
    pageSize: number,
    pageNum: number
  }> = new EventEmitter();

  public colunas: any[] = [];

  private genericList: any[] = [];

  constructor(
    private permissaoService: PermissaoService
  ) { }

  ngOnInit() {
    this.colunas = this.montaColunas();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Para cada critério, atribuir à variável genericList o valor da lista correspondente
    if (this.criterioPesquisa === 1) this.genericList = this.lista<%= classify(name) %>;

    this.colunas = this.montaColunas();
  }

  public handleMenuClick($event): void {
    const actionOptions: Map<string, Function> = new Map([
      ['editar-<%= dasherize(name) %>', (): void => this.emiteEditar<%= classify(name) %>Event($event.row)]
    ]);

    actionOptions.get($event.action.id)?.bind(this)($event.row);
    return;
  }

  public handleRowClick($event: any): void {
    this.rowClickEvent.emit($event.nroInt<%= classify(name) %>);
  }

  public handlePageChange($event): void {
    this.pageInfos = {
      ...this.pageInfos,
      pageNum: parseInt($event.pagina),
      pageSize: $event.tamanho
    };

    this.pageInfosChange.emit(this.pageInfos);
  }

  public emiteEditar<%= classify(name) %>Event(row: <%= classify(name) %>Lista) {
    this.menuClickEvent.emit({
      nroIntObjeto: row.codigo,
      menuOption: <%= classify(name) %>ActionTypes.ALTERAR
    });
  }

  private montaColunas(): TableColumn[] {
    const criteriaOptions: Map<number, Function> = new Map([
      [1, () => this.montaColunas<%= classify(name) %>()],
      [2, () => null],
      [3, () => null]
    ]);

    return criteriaOptions.get(this.criterioPesquisa)?.bind(this)?.();
  }

  private montaColunas<%= classify(name) %>(): TableColumn[] {
    const actionOptions: Action[] = [
      {
        id: 'consultar-<%= classify(name) %>',
        show: true,
        label: 'Detalhes',
        pathForList: ''
      },
      {
        id: 'editar-<%= classify(name) %>',
        show: this.permissaoEditar,
        label: 'Editar',
        pathForList: 'isPodeEditar'
      }
    ];
    return [
      {
        type: 'Actions' as ColumnType,
        isSmall: true,
        hasEffect: false,
        hide: false,
        menuAction: {
          dropdownPosition: 'right',
          pathsForList: ['isPodeEditar'],
          actions: actionOptions
        }
      },
      {
        title: 'Data',
        dataPath: 'data',
        className: 'colunaTexto',
        transform: (valor: number) => PrvUtil.trataValorVazio(PrvDateUtil.toDate(valor)?.toLocaleDateString())
      },
      {
        title: 'Texto',
        dataPath: 'texto',
        transform: (valor: string) => PrvUtil.trataStringNaoInformada(valor)
      },
      {
        title: 'Número',
        dataPath: 'numero',
        transform: (valor: number) => this.trataValorNaoInformado(valor)
      }
    ];
  }

  private trataValorNaoInformado(valor: any): string {
    return ['', null, undefined, ' '].includes(valor) ? 'Não Informado' : valor;
  }

  public imprimirEvent() {
    this.redirectEvent.emit(<%= classify(name) %>ActionTypes.IMPRIMIR);
  }

  get pageData(): any[] {
    return this.genericList;
  }

  get totalRegistros(): number {
    // Para cada critério, retornar o atributo totalRegistros da lista correspondente
    if (this.criterioPesquisa === 1) return this.lista<%= classify(name) %>[0]?.totalRegistros;
  }

  get permissaoEditar(): boolean {
    return this.permissaoService.validarPermissao("ROTA", "ALTERA", "PRV");
  }
}
*/
