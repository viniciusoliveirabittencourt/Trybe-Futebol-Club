# Boas vindas ao repositório do Trybe Futebol Clube!

O projeto Trybe Futebol Clube (TFC) foi um dos últimos projetos do bloco de back-end da Trybe. Nele, nós criamos um back-end que tem uma conexão real com um front-end (O front-end foi criado pela equipe responsável de currículo da [Trybe](https://www.betrybe.com/), não sendo de minha autória.) onde podemos ver como funciona uma dinâmica entre um back e front. Este é um projeto Node, onde utilizamos o framework Express para construir o servidor REST. Para o banco de dados, estamos utilizando um banco de dados relacional, o MySQL, com o auxílio do ORM Sequelize, para fazer a conexão entre servidor e banco de dados e ajudar a fazer o manuseio dele de maneira mais padronizada. Além disso, utilizamos a biblioteca jsonwebtoken para fazer validações de usuário e a biblioteca bcryptjs para validação de senhas. Para os tests, nós utilizamos as bibliotecas Mocha, Chai e Sinon. Para garantir um projeto conciso, o projeto roda em cima de containers Docker, para organizar e orquestrar esses containers Docker, nós utilizamos o docker-compose.

# Rodar localmente

> Utilizei o Ubuntu 20.04.4 LTS para realizar o projeto e escrever as instruções nesse README

Para rodar localmente o projeto, é necessário que se tenha no mínimo o Node.JS versão 16 ou superior; Docker; o git versã o 2 ou superior; e o Docker-compose versão 1.29.2 ou superior;

Siga o passo a passo para rodar localmente o projeto e testar os requisitos, caso deseje.

  1. Clone o repositório

  - `git clone git@github.com:viniciusoliveirabittencourt/Trybe-Futebol-Club.git`

  - Após isso, entre no diretório criado
    - `cd Trybe-Futebol-Club`

  2. Rode o script responsável por inicializar o docker-compose

  - `npm run compose:up`

  > Caso deseje fazer alguma modificação, também é possível rodar o comando `npm run dev` para rodar em modo de desenvolvimento

  Pronto, agora vc já tem a aplicação completa rodando em sua máquina local. Para acessar o front-end da aplicação, basta acessar `http://localhost:3000/`. Para enivar requisições ao back-end da aplicação, basta enviar para `http://localhost:3001/endpointDesejado`.

# Criação da estrutura de pastas inicial

> Isso considerando o diretório **backend** dentro do diretório **app**

1. Criar a pasta **src** na raiz do projeto para colocar toda a parte de código

2. Levar os arquivos **app.ts** e **index.ts** para dentro da pasta src

3. Modificar os scripts no **package.json** para indicar que os arquivos **app.ts** e **index.ts** agora estão dentro de **src**

4. Dentro da pasta **src** criar os principais diretórios do modelo MSC: **services**, **controllers**

> Neste caso estamos substituindo a pasta models para a pasta database, mas o responsável por isso será o **sequelize-cli**

5. Após isso criar as pastas de suporte: **interfaces**, **routes**, **middlewares**

6. Criar o arquivo **index.ts** dentro de **route**, onde eu consigo ter um maior controle sobre minhas rotas

7. Já importar o **route** no **app.ts** para facilitar a criação de rotas futuras

# Configuração inicial do Sequelize

> Isso considerando o diretório **backend** dentro do diretório **app**

1. Criar na raiz do diretório o arquivo **.sequelizerc**, aplicando as rotas necessárias, onde o sequelize irá interagir com a config e o models partir do diretório **build**
    - O **sequelize-cli**, não interage com arquivos **.ts**, por isso é necessário que os responsáveis efetivos por criar o Banco de Dados, os diretórios **models** e **config**, apenas interajam com o **sequelize-cli**, após transpilados, na pasta **build**

2. Após isso eu rodei o comando `npx sequelize-cli init` para inicializar o **sequelize**

3. O comando irá criar um diretório chamado **database**, com os diretórios **models** e **config** dentro do diretório **build**, nesse momento eu descarto apago o **database** com todas os seus sub-diretórios, pois os irei implementar a mão utilizando TypeScript
    - O **sequelize-cli** também irá criar um diretório chamado **database** com os diretórios **migrations** e **seeders**, mas esses serão criados dentro da pasta src, onde realmente devem ficar.

4. Dentro de **src/database**, eu irei criar os diretórios **config** e **models**

5. Em **src/database/config** vou criar o arquivo **database.ts** onde colocarei toda a configuração de acesso ao banco de dados.

6. Em **src/database/models** vou criar o **index.ts**, com o código padrão para o funcionamento do Sequelize.

7. Em **src/database/models** vou criar os models, conforma o schema pedido no projeto. Foto abaixo:
    - ![schema do modelo do banco de dados](assets/er-diagram.png)

8. Agora é criar as migrations e os seeders conforme o schema já apresentado

9. Para finalizar, irei rodar o comando `npm run db:reset` para formatar o banco de dados e verificar se houve algum problema durante a execução, não tendo problemas, é só partir para o código.

# Tests

Os tests se encontram no diretório **tests** dentro de **app/backend/src/tests**. Utilizamos tests E2E para esse projeto. Para o framework de tests, nós utilizamos o **mocha**, para fazer as requisições aos endpoints, nós utilizamos o **chai** e o **chai-http** e para fazer os stubs das requisições externas ao código, foi utilizado o **sinon**.

Caso você queira verificar a eficiência dos tests, você poderá rodar o comando `npm run test:coverage` dentro do diretório **app/backend**

# Requisitos

## Seção 1: Users e Login

- A rota utilizada deve ser (`/login`);

- A rota deve receber os campos `email` e `password` e esses campos devem ser validados no banco de dados:
  - O campo `email` deve receber um email válido;
  - O Campo `password` deve ter mais de 6 caracteres.

- O body da requisição deve conter o seguinte formato:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

O objetivo foi criar o endpoint (`/login`) para o usuário poder logar em sua conta. O endpoint irá receber um body com o corpo acima e após a verificação do body, nós iremos verificar o email e o password, caso o email e o password sejam validados, o retorno do endpoint será um token da biblioteca jsonwebtoken, neste jeito:

**_status http:_ `200`**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
}
```

<details close>
<summary>Regras de négocio:</summary>

<br>

## Regras de négocio para verificar o campo "email" do body da requisição

Caso o campo "email" não seja informado, ou caso ele venha vazio, o endpoint irá retornar essa resposta:

  **_status http:_ `400`**
  ```json
    { "message": "All fields must be filled" }
  ```

Caso o campo "email" seja inválido, o endpoint irá retornar essa resposta:

  **_status http:_ `401`**
  ```json
    { "message": "Incorrect email or password" }
  ```
<br />

## Regras de négocio para verificar o campo "password" do body da requisição

Caso o campo "password" não seja informado, ou caso ele venha vazio, o endpoint irá retornar essa resposta:

  **_status http:_ `400`**
  ```json
    { "message": "All fields must be filled" }
  ```

Caso o campo "password" seja inválido, o endpoint irá retornar essa resposta:

  **_status http:_ `401`**
  ```json
    { "message": "Incorrect email or password" }
  ```
</details>

<br />

Também foi tivemos que criar um endpoint (`/login/validate`), onde o mesmo, se enviado no `header`, com o parâmetro `authorization`, com um jsonweebtoken valido, o endpoint retorna o **role** da aquele usuário. O retorno será parecido com esse:

  **_status http:_ `200`**
  ```json
    { "role": "admin" }
  ```

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

## Seção 2: Times

O objetivo desse requisito foi criar duas rotas `GET` onde se podia obter o id e nome dos times salvos no banco de dados.

Caso tenha um pedido para a rota (`/teams`), o endpoint irá ter um retorno parecido com esse:

  **_status http:_ `200`**

```json
[
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
	...
]
```

Caso tenha um pedido para a rota (`/teams/:id`), o endpoint irá retornar o time com o id específico, o retorno será parecido com este:

  **_status http:_ `200`**

```json
{
  "id": 1,
  "teamName": "Avaí/Kindermann"
}
```

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

## Seção 3: Partidas

O primeiro objetivo desse requisito, foi criar um endpoint `GET`, para que fosse possível retornar todas as partidas registradas, com um relacionamento entre a tabela **matches** e a tabela **teams**, utilizando o id homeTeam e o id awayTeam como foreignKeys. O endpoint é o (`/matches`) e caso seja chamado, ele terá um retorno parecido com este:

  **_status http:_ `200`**

  ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ]
  ```

O segundo objetivo foi criar um endpoint com `query string`, onde fosse possível filtrar as partidas com `inProgress: true`, o endpoint é o (`/matches?inProgress=true`) e quando chamado, ele trás esse retorno:

  **_status http:_ `200`**

  ```json
  [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "Ferroviária"
      },
      "teamAway": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ]
  ```

O terceiro objetivo foi criar um endpoint com `query string`, onde fosse possível filtrar as partidas com `inProgress: false`, o endpoint é o (`/matches?inProgress=false`) e quando chamado, ele trás esse retorno:

  **_status http:_ `200`**

  ```json
  [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "Internacional"
      },
      "teamAway": {
        "teamName": "Santos"
      }
    }
  ]
  ```

O quarto objetivo é criar um endpoint `POST` onde seja possível salvar uma partida no banco de dados, a partida será salva com o status de `inProgress: true` por padrão. A rota irá receber um body parecido com esse:

  ```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
  ```

Além disso será averiguado, se o header da requisição possuí uma chave `authorization`, com jsonwebtoken valido. Caso tudo esteja conforme o esperado, o retorno do endpoint será parecido com este:

  **_status http:_ `201`**

  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ```

<details close>
<summary>Regras de négocio:</summary>

<br>

## Regras de négocio para a rota `/matches`

Caso o body venha com dois times iguais o endpoint irá retornar:

  **_status http:_ `401`**

  ```json
  { "message": "It is not possible to create a match with two equal teams" }
  ```

<br />

Caso algum time não exista na tabela `teams`, o endpoint irá retornar:

  **_status http:_ `404`**

  ```json
  { "message": "There is no team with such id!" }
  ```

<br />

Caso o dentro do `header` não venha a chave `atuhorization` ou caso ela venha vazia, o endpoint irá retornar:

  **_status http:_ `400`**

  ```json
  { "message": "Token not found!" }
  ```

<br />

Caso o token n sejá um token valido, o endpoint irá retornar:

  **_status http:_ `401`**

  ```json
  { "message": "Token must be a valid token" }
  ```

</details>

O quinto objetivo foi criar um endpoint `PATCH`, onde fosse possível alterar o status `inProgress` para false, o endpoint é o (`/matches/:id/finish`) e quando chamado, ele irá retornar:

  **_status http:_ `200`**

  ```json
  { "message": "Finished" }
  ```

O sexto objetivo foi criar um endpoint `PATCH`, onde fosse possível atualizar as partidas em andamento, o endpoint é o (`/matches/:id`) e ele recebe um body com o seguinte formato:

  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

Enviado tudo corretamente, o endpoint irá ter uma resposta parecida com essa:

  **_status http:_ `200`**

  ```json
  {}
  ```

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

## Seção 4: Leaderboards (placares)

O objetivo aqui foi construir os `leaderboards`, eles são objetos com regras de négocio específicas a seguir as irei detalhar:

  - O endpoint vai ter que analisar essas regras de négocio para fazer o objeto:
    - `Classificação`: Posição na classificação;
    - `Time`: Nome do time;
    - `P`: Total de Pontos;
    - `J`: Total de Jogos;
    - `V`: Total de Vitórias;
    - `E`: Total de Empates;
    - `D`: Total de Derrotas;
    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos;
    - `SG`: Saldo total de gols;
    - `%`: Aproveitamento do time.

  - O `Total de Pontos` é um cálculo baseado no total de `Vitórias`, `Empates` e `Derrotas`
    - Em caso de `Vitória`, será adicionado +3 pontos
    - Em caso de `Empate`, será adicionado +1 ponto
    - Em caso de `Derrota`, não será adicionado ponto

  - O `Total de Jogos` é a quantidade de jogos que aquele time jogou

  - O `Total de Vitórias` é quantidade de jogos em que aquele time teve mais gols que time rival

  - O `Total de Empates` é a quantidade de jogos em que aquele time teve a mesma quantidade de jogos que o rival

  - O `Total de Derrotas` é a quantidade de jogos em que aquele time teve menos gols que o time rival

  - `Gols marcados a favor` é a quantidade de gols que aquele time fez em seus rivais, independente do resultado final

  - `Gols sofridos` é a quantidade de gols em que aquele time tomou de seus adversários, independente do resultado final

  - `Saldo total de gols` é um cálculo feito apartir de `GP` e `GC`
    - Este é o cálculo utilizado `GP - GC`

  - `Aproveitamento do time` é um cálculo feito apartir de `P` e `J`
    - Este é o cálculo utilizado `(P (J * 3)) * 100`

  - A `Classificação` se da pela ordem que vem no array o time, por padrão, eles devem vir de forma decrescente, os critérios de ordenação são os seguintes
    - O primeiro critério é o `P`
    - Caso `P` seja igual, ordenar por `V`
    - Caso `V` seja igual, ordernar por `SG`
    - Caso `SG` seja igual, ordernar por `GP`
    - Caso `GP` seja igual, ordernar por `GC`

> OBS: Ele irá retornar o resultado, apenas dos jogos marcados como `inProgress: false`

Um exemplo de retorno para esses enpoints é o seguinte:

  **_status http: `200`_**

  ```json
  [
    {
      "name": "Palmeiras",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "Corinthians",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    {
      "name": "Santos",
      "totalPoints": 11,
      "totalGames": 5,
      "totalVictories": 3,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 12,
      "goalsOwn": 6,
      "goalsBalance": 6,
      "efficiency": 73.33
    },
    ...
  ]
  ```

## Leaderboard Home

Caso o endpoint seja (`/leaderbord/home`), o endpoint irá retornar a lógica a cima, aplicando apenas nos times que estão jogando em casa, o retorno será igual ao abaixo:

  **_status http: `200`_**

 <details>
<summary><strong> Retorno esperado: </strong></summary> <br/>

```js
[
    {
      name: 'Santos',
      totalPoints: '9',
      totalGames: '3',
      totalVictories: '3',
      totalDraws: '0',
      totalLosses: '0',
      goalsFavor: '9',
      goalsOwn: '3',
      goalsBalance: '6',
      efficiency: '100'
    },
    {
      name: 'Palmeiras',
      totalPoints: '7',
      totalGames: '3',
      totalVictories: '2',
      totalDraws: '1',
      totalLosses: '0',
      goalsFavor: '10',
      goalsOwn: '5',
      goalsBalance: '5',
      efficiency: '77.78'
    },
    {
      name: 'Corinthians',
      totalPoints: '6',
      totalGames: '2',
      totalVictories: '2',
      totalDraws: '0',
      totalLosses: '0',
      goalsFavor: '6',
      goalsOwn: '1',
      goalsBalance: '5',
      efficiency: '100'
    },
    {
      name: 'Grêmio',
      totalPoints: '6',
      totalGames: '2',
      totalVictories: '2',
      totalDraws: '0',
      totalLosses: '0',
      goalsFavor: '4',
      goalsOwn: '1',
      goalsBalance: '3',
      efficiency: '100'
    },
    {
      name: 'Real Brasília',
      totalPoints: '6',
      totalGames: '2',
      totalVictories: '2',
      totalDraws: '0',
      totalLosses: '0',
      goalsFavor: '2',
      goalsOwn: '0',
      goalsBalance: '2',
      efficiency: '100'
    },
    {
      name: 'São Paulo',
      totalPoints: '4',
      totalGames: '2',
      totalVictories: '1',
      totalDraws: '1',
      totalLosses: '0',
      goalsFavor: '4',
      goalsOwn: '1',
      goalsBalance: '3',
      efficiency: '66.67'
    },
    {
      name: 'Internacional',
      totalPoints: '4',
      totalGames: '3',
      totalVictories: '1',
      totalDraws: '1',
      totalLosses: '1',
      goalsFavor: '4',
      goalsOwn: '6',
      goalsBalance: '-2',
      efficiency: '44.44'
    },
    {
      name: 'Botafogo',
      totalPoints: '4',
      totalGames: '3',
      totalVictories: '1',
      totalDraws: '1',
      totalLosses: '1',
      goalsFavor: '2',
      goalsOwn: '4',
      goalsBalance: '-2',
      efficiency: '44.44'
    },
    {
      name: 'Ferroviária',
      totalPoints: '3',
      totalGames: '2',
      totalVictories: '1',
      totalDraws: '0',
      totalLosses: '1',
      goalsFavor: '3',
      goalsOwn: '2',
      goalsBalance: '1',
      efficiency: '50'
    },
    {
      name: 'Napoli-SC',
      totalPoints: '2',
      totalGames: '2',
      totalVictories: '0',
      totalDraws: '2',
      totalLosses: '0',
      goalsFavor: '2',
      goalsOwn: '2',
      goalsBalance: '0',
      efficiency: '33.33'
    },
    {
      name: 'Cruzeiro',
      totalPoints: '1',
      totalGames: '2',
      totalVictories: '0',
      totalDraws: '1',
      totalLosses: '1',
      goalsFavor: '2',
      goalsOwn: '3',
      goalsBalance: '-1',
      efficiency: '16.67'
    },
    {
      name: 'Flamengo',
      totalPoints: '1',
      totalGames: '2',
      totalVictories: '0',
      totalDraws: '1',
      totalLosses: '1',
      goalsFavor: '1',
      goalsOwn: '2',
      goalsBalance: '-1',
      efficiency: '16.67'
    },
    {
      name: 'Minas Brasília',
      totalPoints: '1',
      totalGames: '3',
      totalVictories: '0',
      totalDraws: '1',
      totalLosses: '2',
      goalsFavor: '3',
      goalsOwn: '6',
      goalsBalance: '-3',
      efficiency: '11.11'
    },
    {
      name: 'Avaí/Kindermann',
      totalPoints: '1',
      totalGames: '3',
      totalVictories: '0',
      totalDraws: '1',
      totalLosses: '2',
      goalsFavor: '3',
      goalsOwn: '7',
      goalsBalance: '-4',
      efficiency: '11.11'
    },
    {
      name: 'São José-SP',
      totalPoints: '0',
      totalGames: '3',
      totalVictories: '0',
      totalDraws: '0',
      totalLosses: '3',
      goalsFavor: '2',
      goalsOwn: '5',
      goalsBalance: '-3',
      efficiency: '0'
    },
    {
      name: 'Bahia',
      totalPoints: '0',
      totalGames: '3',
      totalVictories: '0',
      totalDraws: '0',
      totalLosses: '3',
      goalsFavor: '0',
      goalsOwn: '4',
      goalsBalance: '-4',
      efficiency: '0'
    }
]
```
</details>

## Leaderboard away

Caso o endpoint seja (`/leaderbord/away`), o endpoint irá retornar a lógica a cima, aplicando apenas nos times que estão jogando fora de casa, o retorno será igual ao abaixo:

  **_status http: `200`_**
<details>
<summary><strong> Retorno esperado: </strong></summary> <br/>

```js
[
  {
    name: 'Palmeiras',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '7',
    goalsOwn: '0',
    goalsBalance: '7',
    efficiency: '100'
  },
  {
    name: 'Corinthians',
    totalPoints: '6',
    totalGames: '3',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '1',
    goalsFavor: '6',
    goalsOwn: '2',
    goalsBalance: '4',
    efficiency: '66.67'
  },
  {
    name: 'Internacional',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '3',
    goalsOwn: '0',
    goalsBalance: '3',
    efficiency: '100'
  },
  {
    name: 'São José-SP',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '3',
    goalsOwn: '1',
    goalsBalance: '2',
    efficiency: '100'
  },
  {
    name: 'São Paulo',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '5',
    goalsOwn: '5',
    goalsBalance: '0',
    efficiency: '44.44'
  },
  {
    name: 'Ferroviária',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '4',
    goalsOwn: '5',
    goalsBalance: '-1',
    efficiency: '44.44'
  },
  {
    name: 'Real Brasília',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '3',
    goalsOwn: '4',
    goalsBalance: '-1',
    efficiency: '44.44'
  },
  {
    name: 'Grêmio',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '5',
    goalsOwn: '7',
    goalsBalance: '-2',
    efficiency: '44.44'
  },
  {
    name: 'Flamengo',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '1',
    goalsOwn: '3',
    goalsBalance: '-2',
    efficiency: '44.44'
  },
  {
    name: 'Avaí/Kindermann',
    totalPoints: '3',
    totalGames: '2',
    totalVictories: '1',
    totalDraws: '0',
    totalLosses: '1',
    goalsFavor: '1',
    goalsOwn: '1',
    goalsBalance: '0',
    efficiency: '50'
  },
  {
    name: 'Cruzeiro',
    totalPoints: '3',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '0',
    totalLosses: '2',
    goalsFavor: '6',
    goalsOwn: '7',
    goalsBalance: '-1',
    efficiency: '33.33'
  },
  {
    name: 'Santos',
    totalPoints: '2',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '2',
    totalLosses: '0',
    goalsFavor: '3',
    goalsOwn: '3',
    goalsBalance: '0',
    efficiency: '33.33'
  },
  {
    name: 'Bahia',
    totalPoints: '2',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '2',
    totalLosses: '0',
    goalsFavor: '2',
    goalsOwn: '2',
    goalsBalance: '0',
    efficiency: '33.33'
  },
  {
    name: 'Minas Brasília',
    totalPoints: '1',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '1',
    goalsOwn: '3',
    goalsBalance: '-2',
    efficiency: '16.67'
  },
  {
    name: 'Botafogo',
    totalPoints: '0',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '0',
    totalLosses: '2',
    goalsFavor: '1',
    goalsOwn: '4',
    goalsBalance: '-3',
    efficiency: '0'
  },
  {
    name: 'Napoli-SC',
    totalPoints: '0',
    totalGames: '3',
    totalVictories: '0',
    totalDraws: '0',
    totalLosses: '3',
    goalsFavor: '1',
    goalsOwn: '10',
    goalsBalance: '-9',
    efficiency: '0'
  }
  ]
```
</details>

## Leaderboard

Caso o endpoint seja (`/leaderbord`), o endpoint irá retornar a lógica a cima, aplicando no placar geral, o retorno será igual ao abaixo:

  **_status http: `200`_**
<details>
<summary><strong> Retorno esperado: </strong></summary> <br/>

```js
 [
  {
    name: 'Palmeiras',
    totalPoints: '13',
    totalGames: '5',
    totalVictories: '4',
    totalDraws: '1',
    totalLosses: '0',
    goalsFavor: '17',
    goalsOwn: '5',
    goalsBalance: '12',
    efficiency: '86.67',
  },
  {
    name: 'Corinthians',
    totalPoints: '12',
    totalGames: '5',
    totalVictories: '4',
    totalDraws: '0',
    totalLosses: '1',
    goalsFavor: '12',
    goalsOwn: '3',
    goalsBalance: '9',
    efficiency: '80',
  },
  {
    name: 'Santos',
    totalPoints: '11',
    totalGames: '5',
    totalVictories: '3',
    totalDraws: '2',
    totalLosses: '0',
    goalsFavor: '12',
    goalsOwn: '6',
    goalsBalance: '6',
    efficiency: '73.33',
  },
  {
    name: 'Grêmio',
    totalPoints: '10',
    totalGames: '5',
    totalVictories: '3',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '9',
    goalsOwn: '8',
    goalsBalance: '1',
    efficiency: '66.67',
  },
  {
    name: 'Internacional',
    totalPoints: '10',
    totalGames: '5',
    totalVictories: '3',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '7',
    goalsOwn: '6',
    goalsBalance: '1',
    efficiency: '66.67',
  },
  {
    name: 'Real Brasília',
    totalPoints: '10',
    totalGames: '5',
    totalVictories: '3',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '5',
    goalsOwn: '4',
    goalsBalance: '1',
    efficiency: '66.67',
  },
  {
    name: 'São Paulo',
    totalPoints: '8',
    totalGames: '5',
    totalVictories: '2',
    totalDraws: '2',
    totalLosses: '1',
    goalsFavor: '9',
    goalsOwn: '6',
    goalsBalance: '3',
    efficiency: '53.33',
  },
  {
    name: 'Ferroviária',
    totalPoints: '7',
    totalGames: '5',
    totalVictories: '2',
    totalDraws: '1',
    totalLosses: '2',
    goalsFavor: '7',
    goalsOwn: '7',
    goalsBalance: '0',
    efficiency: '46.67',
  },
  {
    name: 'São José-SP',
    totalPoints: '6',
    totalGames: '5',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '3',
    goalsFavor: '5',
    goalsOwn: '6',
    goalsBalance: '-1',
    efficiency: '40',
  },
  {
    name: 'Flamengo',
    totalPoints: '5',
    totalGames: '5',
    totalVictories: '1',
    totalDraws: '2',
    totalLosses: '2',
    goalsFavor: '2',
    goalsOwn: '5',
    goalsBalance: '-3',
    efficiency: '33.33',
  },
  {
    name: 'Cruzeiro',
    totalPoints: '4',
    totalGames: '5',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '3',
    goalsFavor: '8',
    goalsOwn: '10',
    goalsBalance: '-2',
    efficiency: '26.67',
  },
  {
    name: 'Avaí/Kindermann',
    totalPoints: '4',
    totalGames: '5',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '3',
    goalsFavor: '4',
    goalsOwn: '8',
    goalsBalance: '-4',
    efficiency: '26.67',
  },
  {
    name: 'Botafogo',
    totalPoints: '4',
    totalGames: '5',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '3',
    goalsFavor: '3',
    goalsOwn: '8',
    goalsBalance: '-5',
    efficiency: '26.67',
  },
  {
    name: 'Bahia',
    totalPoints: '2',
    totalGames: '5',
    totalVictories: '0',
    totalDraws: '2',
    totalLosses: '3',
    goalsFavor: '2',
    goalsOwn: '6',
    goalsBalance: '-4',
    efficiency: '13.33',
  },
  {
    name: 'Minas Brasília',
    totalPoints: '2',
    totalGames: '5',
    totalVictories: '0',
    totalDraws: '2',
    totalLosses: '3',
    goalsFavor: '4',
    goalsOwn: '9',
    goalsBalance: '-5',
    efficiency: '13.33',
  },
  {
    name: 'Napoli-SC',
    totalPoints: '2',
    totalGames: '5',
    totalVictories: '0',
    totalDraws: '2',
    totalLosses: '3',
    goalsFavor: '3',
    goalsOwn: '12',
    goalsBalance: '-9',
    efficiency: '13.33',
  },
];
```
</details>

</details>
</details>

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---
