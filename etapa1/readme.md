# etapa 1
## Pontos-Chave do MVC + Fat Model

# 1. Padrão MVC → Separação de responsabilidades
Model → Dados + regras de negócio.
View → Representação dos dados (no caso de API: JSON).
Controller → Faz a ponte: recebe requisição HTTP, chama o Model e devolve resposta.

# Lembre-se: cada camada tem uma missão única.

# 2. Fat Model (Modelo Gordo)
Concentra toda a lógica de negócio (regras e manipulação dos dados).
Controller fica magro, apenas coordenando entrada/saída.
 Isso deixa o código mais organizado e fácil de manter.

# 3. Rotas
Definem para onde cada requisição HTTP deve ir.
Fazem o encaminhamento da URL → Controller correto.
Não têm lógica de negócio, só direcionamento.

# 4. Servidor
Arquivo simples que sobe o Fastify (ou outro framework).
Só registra as rotas com um prefixo (/api).
Não contém regra de negócio, só inicialização.

# 5. Fluxo de uma requisição
Cliente faz GET /api/contatos.
Route encaminha para o Controller.
Controller chama o Model.
Model aplica regras e retorna dados.
Controller responde em JSON (View).

# 6. O que NÃO fazer em cada camada
Model: não sabe HTTP, não formata JSON.
Controller: não faz regra de negócio, não mexe em banco direto.
Routes: não tem lógica, só mapeamento.
Server: não trata dados, só inicializa.

# Resumo:
Model = Cérebro (dados + regras).
Controller = Ponte (tráfego HTTP ↔ regras).
Routes = Recepção (encaminha pedido).
Server = Motor (só liga tudo).
Fat Model = regra concentrada no Model → Controller magro.