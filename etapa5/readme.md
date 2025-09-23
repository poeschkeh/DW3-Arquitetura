# Etapa 5  
## A Base de Tudo — Comunicação com o Banco via SQL Puro

### Problema  
Até agora, os módulos de feature encapsulam controllers, services e repositórios, mas ainda dependem de abstrações ou ORMs que ocultam a lógica de acesso ao banco.  
Isso pode mascarar consultas ineficientes, dificultar otimizações específicas de SQL, gerar camadas duplicadas ou complicar transações complexas.

### Solução  
Criar uma **camada centralizada de acesso ao banco** que usa **SQL puro** (queries manuais) para comunicação com o banco de dados, e que funciona como base (fundação) para os módulos de feature.  
Essa camada é responsável por executar comandos SQL, mapear resultados e prover transações se necessário. Os repositórios dos módulos de feature delegam suas operações a essa base.

### Conceito  
- **Camada de Infraestrutura de Dados (Data Infrastructure Layer)**: abstrai a conexão, execução de query, tratamento de erros, transações e mapeamento (row → objeto).  
- Os módulos de feature (vertical slices) continuam responsáveis por sua lógica, mas não mais implementam acesso direto a banco — delegam para a base SQL.  
- Essa base é o “núcleo invisível” que todos os módulos usam para persistência.

### Benefícios  
- **Controle total do SQL**: escreve consultas com precisão, otimiza índices e junções conforme necessário.  
- **Uniformidade**: todo acesso ao banco passa por um ponto único, padronizando tratamento de erros, logging e otimizações.  
- **Isolamento de preocupação**: os módulos de feature focam em regras de negócio, não em detalhes de SQL ou transações.  
- **Facilidade para ajustes globais**: se houver necessidade de mudar driver, incluir cache, ou trocar banco, faz-se na camada central.  
- **Transações coordenadas**: a camada base pode orquestrar transações que envolvam múltiplos módulos/features.

### Estrutura sugerida  

```
meu-projeto-api/
├── .env                # Arquivo com as variáveis de ambiente (NUNCA vai para o Git)
├── .gitignore          # Ignora arquivos e pastas como node_modules e .env
├── package.json        # Define as dependências e scripts do projeto
└── src/                # <== TODO O CÓDIGO DA NOSSA APLICAÇÃO VIVE AQUI
    │
    ├── modules/        # PASTA DOS NOSSOS MÓDULOS DE NEGÓCIO
    │   │
    │   └── contatos/   # MÓDULO: Tudo sobre o recurso "Contatos" vive aqui dentro
    │       ├── contato.controller.js  # Camada de Apresentação (lida com HTTP)
    │       ├── contato.repository.js  # Camada de Dados (agora com SQL puro)
    │       ├── contato.routes.js      # Ponto de entrada e "linha de montagem" do módulo
    │       └── contato.service.js     # Camada de Negócio (regras e orquestração)
    │
    ├── infra/          # INFRAESTRUTURA: Código técnico compartilhado pela aplicação
    │   │
    │   └── database.js # Configura e exporta a conexão com o banco (o Pool do 'pg')
    │
    └── server.js       # PONTO DE ENTRADA: Inicia o Fastify e registra os módulos 
```

### Fluxo de execução (exemplo de uma operação de “Buscar Contato por ID”)  

1. Chamado HTTP → **contatoController**  
2. Controller chama **contatoService**  
3. Service chama **contatoRepository.findById(id)**  
4. No **contatoRepository**, método `findById` chama `baseRepository.query(…)` com SQL puro  
5. **baseRepository** executa a query no banco, transforma o resultado (mapper)  
6. Resultado retornado ao service → lógica de negócio → controller → resposta HTTP  

### Considerações extras  
- Use **placeholders / parâmetros vinculados** ao montar SQL (evitar injeção).  
- Trate erros e transações centralmente (por exemplo, rollback automático).  
- Pode-se oferecer helpers como `paginate`, `count`, `exists` no baseRepository.  
- Extensões opcionais: logging de queries, medição de tempo, cache, métricas de desempenho.

### Resumo  
Antes: cada módulo de feature fazia acesso direto (via ORM ou abstração) ao banco.  
Agora: todo acesso ao banco é realizado por uma **camada central com SQL puro**, enquanto os módulos de feature ficam livres para cuidar apenas da lógica de negócio.  
Impacto: maior controle, performance, padronização, manutenibilidade e capacidade de evoluir a infraestrutura de dados de forma consistente.