/*import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { <%= capitalize(name) %>ActionTypes } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.actions.types';
import { <%= capitalize(name) %>Lista } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>-lista.dto';
import { PrvUtil } from '@core/utils/prv.util';
import { Action } from '@ddi-ng/layout';
import { ColumnType, TableColumn } from '@ddi-ng/layout/lib/table/_types';
import { PermissaoService } from '@ddi-ng/permissao';

@Component({
  selector: 'app-card-lista-<%= dasherize(name) %>',
  templateUrl: './card-lista-<%= dasherize(name) %>.component.html',
  styleUrls: ['./card-lista-<%= dasherize(name) %>.component.scss']
})
export class CardLista<%= capitalize(name) %>Component implements OnInit, OnChanges {

  @Input() lista<%= capitalize(name) %>: <%= dasherize(name) %>Lista[] = [];
  @Input() pageInfos: any = null;

  @Output() pageInfosChange: EventEmitter<{
    pageSize: number,
    pageNum: number
  }> = new EventEmitter();
  @Output() rowCLickEvent: EventEmitter<any> = new EventEmitter();
  @Output() menuClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() redirectEvent: EventEmitter<<%= dasherize(name) %>ActionTypes> = new EventEmitter();

  public colunas: any[] = [];

  constructor(
    private permissaoService: PermissaoService
  ) { }

  ngOnInit() {
    this.colunas = this.montaColunas();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.colunas = this.montaColunas();
  }

  public handleMenuClick($event): void {
    const actionOptions: Map<string, Function> = new Map([
      ['consultar-<%= dasherize(name) %>', (): void =>  this.exibePageConsultar<%= dasherize(name) %>($event.row)],
      ['desativar-<%= dasherize(name) %>', (): void => this.emiteDesativar<%= dasherize(name) %>Event($event.row)],
      ['reativar-<%= dasherize(name) %>', (): void => this.emiteReativar<%= dasherize(name) %>Event($event.row)]
    ]);

    actionOptions.get($event.action.id)?.bind(this)($event.row);
    return;
  }

  public handleRowClick($event: any): void {
    this.rowCLickEvent.emit($event.nroIntRota);
  }

  public exibePageConsultar<%= capitalize(name) %>(row: <%= dasherize(name) %>Lista) {
    this.menuClickEvent.emit({
      <%= dasherize(name) %>: row,
      menuOption: <%= capitalize(name) %>ActionTypes.CONSULTAR
    });
  }

  public emiteDesativar<%= capitalize(name) %>Event(row: <%= dasherize(name) %>Lista) {
    this.menuClickEvent.emit({
      nroIntRota: row.nroIntRota,
      menuOption: <%= capitalize(name) %>ActionTypes.EXCLUIR
    });
  }

  public emiteReativar<%= capitalize(name) %>Event(row: <%= dasherize(name) %>Lista) {
    this.menuClickEvent.emit({
      nroIntRota: row.nroIntRota,
      menuOption: <%= capitalize(name) %>ActionTypes.ALTERAR
    });
  }

  private montaColunas(): TableColumn[] {
    const actionOptions: Action[] = [
      {
        id: 'consultar-<%= capitalize(name) %>',
        show: true,
        label: 'Detalhes',
        pathForList: ''
      },
      {
        id: 'desativar-<%= capitalize(name) %>',
        show: this.permissaoDesativar,
        label: 'Desativar',
        pathForList: 'isPodeDesativar'
      },
      {
        id: 'reativar-<%= capitalize(name) %>',
        show: this.permissaoDesativar,
        label: 'Reativar',
        pathForList: 'isPodeReativar'
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
          pathsForList: ['isPodeDesativar', 'isPodeReativar'],
          actions: actionOptions
        }
      },
      {
        title: '<%= capitalize(name) %>',
        dataPath: 'nome',
        transform: (valor: string) => PrvUtil.trataStringNaoInformada(valor)
      },
      {
        title: 'Região de Exame',
        dataPath: 'regiaoExames',
        transform: (valor: string) => PrvUtil.trataStringNaoInformada(valor)
      },
      {
        title: 'Quantidade Examinador',
        dataPath: 'qtdExaminador',
        transform: (valor: number) => this.trataValorNaoInformado(valor)
      },
      {
        title: 'Situação',
        dataPath: 'situacao',
        transform: (valor: string) => PrvUtil.trataStringNaoInformada(valor)
      },
      {
        title: 'Participa Distribuição',
        dataPath: 'distribuicao',
        transform: (valor: string) => PrvUtil.trataStringNaoInformada(valor)
      }
    ];
  }

  private trataValorNaoInformado(valor: any): string {
    return ['', null, undefined, ' '].includes(valor) ? 'Não Informado' : valor;
  }

  public imprimirEvent() {
    this.redirectEvent.emit(<%= capitalize(name) %>ActionTypes.IMPRIMIR);
  }

  public handlePageChange($event): void {
    this.pageInfos = {
      ...this.pageInfos,
      pageNum: parseInt($event.pagina),
      pageSize: $event.tamanho
    };

    this.pageInfosChange.emit(this.pageInfos);
  }

  get totalRegistros(): number {
    return this.lista<%= capitalize(name) %>[0]?.totalRegistros;
  }

  get permissaoDesativar(): boolean {
    return this.permissaoService.validarPermissao("ROTA", "ALTERA", "PRV");
  }
}
*/