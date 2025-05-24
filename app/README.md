This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Primeiro, inicie o servidor backend (json-server):

```bash
npm run json-server
```

Em seguida, em outro terminal, inicie o servidor de desenvolvimento Next.js:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) em seu navegador para ver o resultado.

Observações:

- O backend estará disponível em [http://localhost:3001](http://localhost:3001)
- É necessário que ambos os servidores estejam rodando para que a aplicação funcione corretamente

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## JSON Server Backend

Este projeto utiliza [json-server](https://github.com/typicode/json-server) como backend para simulação da API REST.

### Como executar o json-server

1. No terminal, execute o comando abaixo na raiz do projeto:

```bash
npm run json-server
```

2. O servidor será iniciado em http://localhost:3001 e irá utilizar o arquivo `db.json` para armazenar os dados.

### Endpoints disponíveis

#### Usuários

- `GET    /users` — Lista todos os usuários
- `GET    /users/:id` — Detalha um usuário
- `POST   /users` — Cria um novo usuário
- `PUT    /users/:id` — Atualiza um usuário existente
- `PATCH  /users/:id` — Atualiza parcialmente um usuário
- `DELETE /users/:id` — Remove um usuário

#### Transações de um usuário

- As transações ficam dentro do objeto do usuário, no campo `transactions`.
- Para adicionar uma transação a um usuário, faça um PATCH no usuário, atualizando o array `transactions`.
- Exemplo:

  PATCH /users/1

  ```json
  {
    "transactions": [
      { "id": "abc123", "type": "deposit", ... }
    ]
  }
  ```

### Como alterar o banco de dados

- O arquivo `db.json` armazena os usuários e suas transações. Para alterar a estrutura ou adicionar outros recursos, edite esse arquivo.

### Como alterar a porta ou nome do arquivo

- Para mudar a porta ou o arquivo de dados, edite o script `json-server` no `package.json`:

  ```json
  "json-server": "json-server --watch db.json --port 3001"
  ```

- Exemplo para mudar para a porta 4000 e arquivo `data.json`:

  ```json
  "json-server": "json-server --watch data.json --port 4000"
  ```

### Documentação

Para mais informações sobre o json-server, visite https://github.com/typicode/json-server
