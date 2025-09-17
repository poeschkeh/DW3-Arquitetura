# etapa 2
## Resumo Teórico – Etapa 2: Service e Repository (Acoplamento Forte)

# 🔹 O Problema do Fat Model
O Model fazia coisas demais → misturava regras de negócio com acesso a dados.
Consequência: código confuso, difícil de manter e de testar.

# 🔹 A Solução
Dividir responsabilidades em duas novas camadas:
Repository → cuida do acesso a dados (CRUD).
Service → cuida da lógica de negócio (validações, regras, orquestração).
O Controller continua cuidando só do HTTP, mas agora depende do Service.

# 🔹 Conceitos-Chave
Service Layer → camada que centraliza regras de negócio.
Repository Pattern → camada que centraliza persistência de dados.
Princípio da Responsabilidade Única (SRP) → cada classe tem uma função clara.

# 🔹 Estrutura da Aplicação
Controller → fala com o Service.
Service → fala com o Repository.
Repository → fala com os dados.

# 🔹 O Benefício
Código mais organizado.
Separação clara entre dados, regras e HTTP.
Evita o problema do Fat Model.

# 🔹 O Novo Problema
Acoplamento Forte:
Controller cria sua instância de Service.
Service cria sua instância de Repository.

# Consequência:
Difícil de testar isolado (não dá para simular dependências).
Pouca flexibilidade (se mudar Repository → precisa alterar Service).

# Frase para lembrar na prova:
"Repository cuida dos dados, Service cuida das regras e Controller cuida do HTTP. A desvantagem ainda é o acoplamento forte."