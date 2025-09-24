# Etapa 6  
## BaseRepository — Reuso e Padronização de Operações Comuns

### Problema  
Na Etapa 5, centralizamos a comunicação com o banco via **SQL puro**, mas cada repositório ainda precisa repetir operações comuns, como `findById`, `findAll`, `insert`, `update` e `delete`.  
Isso gera **duplicação de código** e aumenta o risco de inconsistências na forma de tratar erros, mapear dados ou lidar com transações.

### Solução  
Criar um **BaseRepository genérico** que concentra operações CRUD e utilitários de acesso a banco, permitindo que os repositórios de cada módulo herdem ou reutilizem esses métodos padronizados.  
Cada repositório de módulo pode:
- **Reusar** métodos comuns (CRUD básico, paginação, checagem de existência).  
- **Sobrescrever ou estender** quando necessário (consultas específicas da feature).

### Conceito  
- **BaseRepository**: classe/função genérica que implementa operações SQL básicas.  
- **Repositórios de Feature**: delegam para o `BaseRepository` operações comuns, mas continuam podendo definir queries personalizadas.  
- **Padronização**: erros, logs, parâmetros e retornos seguem o mesmo formato.  

### Benefícios  
- **Menos código repetido**: repositórios usam métodos prontos em vez de reimplementar.  
- **Maior consistência**: todas as queries básicas seguem o mesmo padrão de segurança e tratamento.  
- **Facilidade de manutenção**: ajustes em lógica genérica (ex.: logs, tratamento de erros) são feitos em um só lugar.  
- **Extensibilidade**: cada repositório ainda pode ter métodos SQL específicos.  

### Estrutura sugerida  
```
meu-projeto-api/
├── .env
├── .gitignore
├── drizzle.config.js     # [NOVO] Arquivo de configuração para a ferramenta drizzle-kit.
├── package.json
├── drizzle/              # [NOVO] Pasta auto-gerada com os arquivos de migration (o "histórico" do nosso banco).
│   └── 0000_...sql
│
└── src/
    ├── modules
    │   └── contatos/
    │       ├── contato.controller.js  # (Sem alteração de estrutura)
    │       ├── contato.repository.js  # [MODIFICADO] Conteúdo alterado para usar as queries do Drizzle.
    │       ├── contato.routes.js      # (Sem alteração de estrutura)
    │       └── contato.service.js     # (Sem alteração de estrutura)
    │
    ├── infra/
    │   ├── db/                 # [NOVO] Subpasta para organizar tudo relacionado ao schema do banco.
    │   │   └── schema.js       # [NOVO] Onde definimos nossas tabelas usando a sintaxe do Drizzle.
    │   │
    │   └── database.js       # [MODIFICADO] Agora configura e exporta a instância principal do Drizzle.
    │
    └── server.js           # (Sem alteração de estrutura)
```

### Fluxo de execução (exemplo `findById` usando BaseRepository)  

1. Chamado HTTP → **contatoController**  
2. Controller chama **contatoService**  
3. Service chama **contatoRepository.findById(id)**  
4. O **contatoRepository** delega ao `BaseRepository.findById('contatos', id)`  
5. **BaseRepository** executa SQL genérico `SELECT * FROM contatos WHERE id = $1`  
6. Resultado é retornado ao service → lógica de negócio → controller → resposta HTTP  

### Considerações extras  
- **Generalização**: BaseRepository pode aceitar parâmetros como `tabela`, `colunas` e `condições`.  
- **Paginação e Filtros**: métodos utilitários podem ser implementados (`paginate`, `count`, `exists`).  
- **Transações**: BaseRepository pode iniciar, commitar e dar rollback em transações, reutilizáveis pelos módulos.  
- **Logs e Métricas**: todo acesso ao banco pode ser monitorado automaticamente.  

### Resumo  
A Etapa 6 introduz o **BaseRepository**, que encapsula operações comuns em SQL, reduzindo duplicação e aumentando a consistência entre os módulos.  
Impacto: código mais limpo, manutenível e com reuso estruturado, sem perder a flexibilidade do SQL puro.