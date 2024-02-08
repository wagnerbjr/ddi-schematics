/*export interface <%= classify(name) %>Lista {
  cod<%= classify(name) %>: number,
  abreviatura<%= classify(name) %>: string,
  descricao<%= classify(name) %>: string,
  situacao: string,
  totalRegistros: number
}
export interface <%= classify(name) %> {
  nroInt<%= classify(name) %>: number;
	cod<%= classify(name) %>: number;
	nome<%= classify(name) %>: string;
  indAtivo: string;
  indAtributo1: string; //exemplo de atributo, substituir e retirar comentário
  ctrOrgInc: string;
  ctrOrgAtu: string;
  ctrUsuInc: number;
  ctrUsuAtu: number;
  ctrSamdInc: number;
  ctrSamdAtu: number;
  ctrHmsInc: number;
  ctrHmsAtu: number;
}

// INSERCAO MODAL ALTERAR
 
  export interface <%= classify(name) %>DetalhesDTO{
  codigo?: number;
  descricao?: string;
  situacao?: number;
  tpTurma?: string;
  data?: any;
  permiteEdicao?: string;
  clienteOperadorInclusaoFormatado?:string;
  clienteOperadorAtualizacaoFormatado?: string;
  dataInclusaoFormatada?: string;
  dataAtualizacaoFormatada?: string;
  }
 
  // ** MODAL DE INCLUSAO
 
  export interface <%= classify(name) %>InclusaoDTO{
  codigo?: number;
  descricao?: string;
  situacao?: number;
  tpTurma?: string;
  data?: any;
  }
tem menu de contexto
  
*/