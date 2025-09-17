# etapa 3
##  Resumo Teórico – Etapa 3: Desacoplando com Injeção de Dependência

### 🔹 O Problema
* Após a Etapa 2, as camadas estão separadas (*Service* e *Repository), mas ainda **acopladas fortemente*:
  * Controller cria Service
  * Service cria Repository  
* Consequência: difícil testar e substituir implementações.

### 🔹 Solução: Injeção de Dependência (DI)

* *Definição:* Um componente *recebe* suas dependências em vez de criá-las.
* *Princípio base:* *Inversão de Controle (IoC)* – o controle da criação das dependências sai da classe e é passado de fora.

### 🔹 Vantagens da DI
* *Acoplamento fraco:* classes não dependem de implementações concretas, apenas de contratos.
* *Alta coesão:* cada classe mantém sua responsabilidade única.
* *Testabilidade:* facilita o uso de "mocks" para testes isolados.
* *Flexibilidade:* é fácil trocar implementações sem alterar outras classes.

### 🔹 Como aplicar
1. *Repository* → não muda (não tem dependências).
2. *Service* → recebe o Repository no construtor, não cria mais instâncias.
3. *Controller* → recebe o Service no construtor, não cria mais instâncias.
4. *Arquivo de rotas* → faz a "linha de montagem": cria instâncias concretas e injeta onde necessário.

### 🔹 Exemplo da composição (linha de montagem)

js
const contatoRepository = new ContatoRepository();
const contatoService = new ContatoService(contatoRepository);
const contatoController = new ContatoController(contatoService);


### 🔹 Benefícios finais
* Baixo acoplamento
* Alta coesão
* Testabilidade facilitada
* Flexibilidade para trocar implementações

### 🔹 Frase-chave para a prova
DI permite que cada camada *receba* suas dependências em vez de criá-las, tornando o sistema *flexível, testável e desacoplado*.