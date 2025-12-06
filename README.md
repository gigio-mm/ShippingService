<div align="center">
  <h1>📦 SalesFlow - Shipping Service</h1>
  <p><strong>Microsserviço de Logística e Cálculo de Frete</strong></p>
  
  ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
</div>

---

## 📋 Sobre o Projeto

O **SalesFlow - Shipping Service** é um microsserviço de logística que atua como **Gateway de Integração** para cálculo de frete. Ele oferece uma solução completa para validação de CEP e cálculo de valores de envio baseados em regras regionais.

### Funcionalidades Principais

- 🔍 **Validação de CEP**: Integração com a [BrasilAPI](https://brasilapi.com.br/) para validar e obter informações de localização
- 💰 **Cálculo de Frete**: Aplicação de regras de negócio regionais para definição de valores e prazos
- 📊 **Histórico de Consultas**: Armazenamento de todas as consultas em banco de dados PostgreSQL
- 🎨 **Frontend Embutido**: Interface web desenvolvida com HTML e Bootstrap para facilitar o uso
- 🚀 **API REST**: Endpoints bem definidos para integração com outros sistemas

---

## 🛠️ Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo para aplicações server-side
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para Node.js e TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional robusto
- **[HTML/Bootstrap](https://getbootstrap.com/)** - Frontend responsivo e moderno
- **[BrasilAPI](https://brasilapi.com.br/)** - API pública para validação de CEP

---

## 💼 Regras de Negócio

O serviço aplica tarifas diferenciadas por região, seguindo a tabela abaixo:

| Região | Estado(s) | Valor do Frete | Prazo de Entrega |
|--------|-----------|----------------|------------------|
| **Ceará** | CE | **GRÁTIS** 🎉 | 3 dias úteis |
| **Nordeste** | AL, BA, MA, PB, PE, PI, RN, SE | R$ 20,00 | 5 dias úteis |
| **Sudeste** | ES, MG, RJ, SP | R$ 35,00 | 7 dias úteis |
| **Centro-Oeste** | DF, GO, MS, MT | R$ 40,00 | 8 dias úteis |
| **Sul** | PR, RS, SC | R$ 45,00 | 9 dias úteis |
| **Norte** | AC, AM, AP, PA, RO, RR, TO | R$ 60,00 | 12 dias úteis |

---

## 🚀 Instalação e Uso

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- PostgreSQL (local ou remoto)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/gigio-mm/ShippingService.git
   cd ShippingService
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/shipping_db?schema=public"
   PORT=3000
   ```

4. **Configure o banco de dados**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Inicie o servidor em modo de desenvolvimento**
   ```bash
   npm run start:dev
   ```

6. **Acesse a aplicação**
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3000/shipping`

---

## 📡 Endpoints da API

### 1. Calcular Frete

Calcula o valor e prazo de entrega baseado no CEP informado.

**Endpoint:** `POST /shipping`

**Request Body:**
```json
{
  "cep": "60000000"
}
```

**Response (200 OK):**
```json
{
  "cep": "60000-000",
  "cidade": "Fortaleza",
  "estado": "CE",
  "regiao": "Nordeste",
  "valorFrete": 0,
  "prazoEntrega": 3,
  "mensagem": "Frete grátis para o Ceará!"
}
```

**Erros Possíveis:**
- `400 Bad Request` - CEP inválido ou não encontrado
- `500 Internal Server Error` - Erro ao processar a requisição

---

### 2. Histórico de Consultas

Retorna os últimos 10 registros de consultas realizadas.

**Endpoint:** `GET /shipping/history`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "cep": "60000-000",
    "cidade": "Fortaleza",
    "estado": "CE",
    "regiao": "Nordeste",
    "valorFrete": 0,
    "prazoEntrega": 3,
    "createdAt": "2025-12-06T10:30:00.000Z"
  }
]
```

---

## 🌐 Deploy

O projeto está hospedado e rodando em produção no **[Render](https://shippingservice-jh6x.onrender.com/)**.

### Configuração para Deploy

1. Conecte seu repositório GitHub ao Render
2. Configure as variáveis de ambiente no painel do Render:
   - `DATABASE_URL` - URL do PostgreSQL
   - `PORT` - Porta da aplicação (configurada automaticamente pelo Render)
3. O Render executará automaticamente:
   - `npm install`
   - `npx prisma generate`
   - `npx prisma db push`
   - `npm run build`
   - `npm run start:prod`

---

## 📂 Estrutura do Projeto

```
shipping-service/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── public/
│   └── index.html             # Frontend da aplicação
├── src/
│   ├── shipping/
│   │   ├── dto/
│   │   │   └── create-shipping.dto.ts
│   │   ├── entities/
│   │   │   └── shipping.entity.ts
│   │   ├── shipping.controller.ts
│   │   ├── shipping.module.ts
│   │   └── shipping.service.ts
│   ├── app.module.ts
│   ├── main.ts
│   └── prisma.service.ts
├── .env                       # Variáveis de ambiente
├── package.json
└── README.md
```

---

## 👨‍💻 Autor

Desenvolvido com 💙 por **gigio-mm**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gigio-mm)

---

