# etapa 0
## Etapa 0 – Tudo Junto e Misturado (Resumo para Prova)
Objetivo
Construir rapidamente uma API CRUD funcional em um único arquivo (server.js).
Entender os problemas de organização de código e por que surgem padrões de arquitetura.

# Estrutura Básica
# Servidor: Fastify
# Banco: Array em memória (contatos = [])
# Rotas CRUD:
GET /contatos → Listar todos
GET /contatos/:id → Buscar por ID
POST /contatos → Criar novo contato
PUT /contatos/:id → Atualizar contato
DELETE /contatos/:id → Remover contato

# Problemas do Código Tudo Junto
Manutenção difícil: arquivo cresce muito e fica confuso.
Violação da Responsabilidade Única: mesmo arquivo faz servidor, rotas, regras de negócio e manipulação de dados.
Código repetido: lógica de busca duplicada em PUT e DELETE.
Difícil de testar: regras de negócio estão presas às rotas.
Reutilização zero: não dá para usar a lógica de criar contato em outro lugar sem duplicação.

## Aprendizado
Entender por que não se deve colocar tudo em um único arquivo.
Reconhecer a necessidade de modularizar e organizar a aplicação.
Ver na prática os problemas que padrões de arquitetura (como MVC ou modularização por features) resolvem.