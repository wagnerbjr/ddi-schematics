/*import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { <%= classify(name) %>ActionTypes } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.actions.types';
import { <%= classify(name) %>Lista } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>.dto';
import { PrvUtil } from '@core/utils/prv.util';
import { Action } from '@ddi-ng/layout';
import { ColumnType, TableColumn } from '@ddi-ng/layout/lib/table/_types';
import { PermissaoService } from '@ddi-ng/permissao';

@Component({
  selector: 'app-card-lista-<%= dasherize(name) %>',
  templateUrl: './card-lista-<%= dasherize(name) %>.component.html',
  styleUrls: ['./card-lista-<%= dasherize(name) %>.component.scss']
})
export class CardLista<%= classify(name) %>Component implements OnInit, OnChanges {

  @Input() lista<%= classify(name) %>: <%= classify(name) %>Lista[] = [];
  @Input() pageInfos: any = null;

  @Output() pageInfosChange: EventEmitter<{
    pageSize: number,
    pageNum: number
  }> = new EventEmitter();
  @Output() rowCLickEvent: EventEmitter<any> = new EventEmitter();
  @Output() menuClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() redirectEvent: EventEmitter<<%= classify(name) %>ActionTypes> = new EventEmitter();

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
      ['consultar-<%= dasherize(name) %>', (): void =>  this.exibePageConsultar<%= classify(name) %>($event.row)],
      ['desativar-<%= dasherize(name) %>', (): void => this.emiteDesativar<%= classify(name) %>Event($event.row)],
      ['reativar-<%= dasherize(name) %>', (): void => this.emiteReativar<%= classify(name) %>Event($event.row)]
    ]);

    actionOptions.get($event.action.id)?.bind(this)($event.row);
    return;
  }

  public handleRowClick($event: any): void {
    this.rowCLickEvent.emit($event.nroIntRota);
  }

  public exibePageConsultar<%= classify(name) %>(row: <%= classify(name) %>Lista) {
    this.menuClickEvent.emit({
      <%= dasherize(name) %>: row,
      menuOption: <%= classify(name) %>ActionTypes.CONSULTAR
    });
  }

  public emiteDesativar<%= classify(name) %>Event(row: <%= classify(name) %>Lista) {
    this.menuClickEvent.emit({
      nroIntRota: row.nroIntRota,
      menuOption: <%= classify(name) %>ActionTypes.EXCLUIR
    });
  }

  public emiteReativar<%= classify(name) %>Event(row: <%= classify(name) %>Lista) {
    this.menuClickEvent.emit({
      nroIntRota: row.nroIntRota,
      menuOption: <%= classify(name) %>ActionTypes.ALTERAR
    });
  }

  private montaColunas(): TableColumn[] {
    const actionOptions: Action[] = [
      {
        id: 'consultar-<%= classify(name) %>',
        show: true,
        label: 'Detalhes',
        pathForList: ''
      },
      {
        id: 'desativar-<%= classify(name) %>',
        show: this.permissaoDesativar,
        label: 'Desativar',
        pathForList: 'isPodeDesativar'
      },
      {
        id: 'reativar-<%= classify(name) %>',
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
        title: '<%= classify(name) %>',
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
    this.redirectEvent.emit(<%= classify(name) %>ActionTypes.IMPRIMIR);
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
    return this.lista<%= classify(name) %>[0]?.totalRegistros;
  }

  get permissaoDesativar(): boolean {
    return this.permissaoService.validarPermissao("ROTA", "ALTERA", "PRV");
  }
}
*/