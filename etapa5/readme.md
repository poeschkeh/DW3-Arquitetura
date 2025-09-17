# etapa 4
## Vertical Slice Architecture (Arquitetura Modular)

### Problema
À medida que a aplicação cresce (Contatos, Usuários, Produtos…), pastas horizontais (controllers, services, repositories) ficam lotadas e difíceis de navegar.
Difícil manter, entender e desenvolver novas funcionalidades sem se perder.

### Solução

Reorganizar o projeto em módulos por funcionalidade (feature).
Cada módulo contém controller, service, repository e rotas da funcionalidade.
O servidor (server.js) apenas registra os módulos.

### Conceito

Vertical Slice Architecture: agrupa tudo que uma funcionalidade precisa em uma pasta vertical.
Contrário à arquitetura em camadas (Layered Architecture), que organiza o código pelo papel técnico.
Cada módulo é autônomo e independente.

### Benefícios
Foco total na feature: toda a lógica de uma funcionalidade está em um único lugar.
Manutenção simplificada: bugs ou melhorias são localizados rapidamente.
Desenvolvimento paralelo: equipes podem trabalhar em módulos diferentes sem conflito.
Escalabilidade plug-and-play: adicionar ou remover módulos é fácil e seguro.
Código mais seguro: isola responsabilidades e previne dependências indevidas entre módulos.

### Resumo
Antes: código organizado por camadas horizontais (controllers, services, repositories).
Agora: código organizado por funcionalidade (vertical).
impacto: aumenta clareza, produtividade, testabilidade, manutenção e escalabilidade.