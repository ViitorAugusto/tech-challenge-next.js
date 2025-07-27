# Prime Bank

Este é um projeto baseado em [Next.js](https://nextjs.org), inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), estruturado em um monorepo para facilitar o desenvolvimento e o deploy do frontend e backend de forma independente.

## 📁 Estrutura do Projeto (Monorepo)

**O que é um Monorepo?**  
Um _monorepo_ (repositório monolítico) é uma abordagem onde múltiplos projetos (como frontend e backend) são armazenados dentro do mesmo repositório. Isso facilita o compartilhamento de código, a gestão de dependências e o deploy conjunto ou separado de serviços.

```
├── packages/
│ ├── frontend/ → Aplicação Next.js
│ └── backend/ → json-server e arquivos de mock
├── docker-compose.yml
├── package.json → Scripts e dependências raiz
```

- A **pasta `root`** contém os arquivos de configuração gerais (como `docker-compose`, `package.json`, etc.).
- A **pasta `packages/`** agrupa os módulos do projeto (neste caso: frontend e backend).

## 🚀 Primeiros Passos

### 1. Instalar dependências

Execute o comando abaixo a partir da raiz do projeto para instalar todas as dependências necessárias:

```bash
npm run install:all
```

### 2. Executando backend(json-server)
```bash
npm run start:backend
```

### 2. Executando frontend
```bash
npm run start:frontend
```

### 3. Rodar tudo com Docker (opcional)
```bash
npm run docker:compose
```
  OBS: Todos os comandos descritos acima devem ser executados na raiz do projeto. 


## 📁 Acesso
Frontend: http://localhost:3000

Backend (API JSON): http://localhost:3001

Ambos os serviços precisam estar rodando para que a aplicação funcione corretamente.

### Endpoints disponíveis

#### Usuários

    * GET    /users — Lista todos os usuários
    * GET    /users/:id — Detalha um usuário
    * POST   /users — Cria um novo usuário
    * PUT    /users/:id — Atualiza um usuário existente
    * PATCH  /users/:id — Atualiza parcialmente um usuário
    * DELETE /users/:id — Remove um usuário

#### Transações de um usuário

* As transações ficam dentro do objeto do usuário, no campo transactions.
* Para adicionar uma transação a um usuário, faça um PATCH no usuário, atualizando o array transactions.
* Exemplo:

  PATCH /users/1

  ```
  json
    {
      "transactions": [
        { "id": "abc123", "type": "deposit", ... }
      ]
    }
    ```

### Como alterar o banco de dados

* O arquivo `db.json` armazena os usuários e suas transações. Para alterar a estrutura ou adicionar outros recursos, edite esse arquivo.

### Como alterar a porta ou nome do arquivo

* Para mudar a porta ou o arquivo de dados, edite o script `json-server` no `package.json`:

  ```json
  "json-server": "json-server --watch db.json --port 3001"
  ```

* Exemplo para mudar para a porta 4000 e arquivo `data.json`:

  ```json
  "json-server": "json-server --watch data.json --port 4000"
  ```

### Documentação

Para mais informações sobre o json-server, visite [https://github.com/typicode/json-server](https://github.com/typicode/json-server)
