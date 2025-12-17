# Calendário de Escala de Trabalho

Calendário interativo para controle de escala de trabalho (dia sim, dia não).

## Funcionalidades

- 📅 Visualização mensal do calendário
- ✕ Marcar dias trabalhados com um clique
- 📊 Contador de dias de trabalho restantes
- 📱 Totalmente responsivo (funciona em celular)
- 💾 Salva automaticamente os dias marcados
- 👆 Navegação por swipe no mobile
- ⌨️ Navegação por teclado (setas)

## Como usar

1. Clique nos dias de trabalho (azuis) para marcar como concluído
2. Use as setas ou deslize para navegar entre os meses
3. Os dados ficam salvos automaticamente no navegador

## Deploy na Vercel

1. Instale a Vercel CLI: `npm i -g vercel`
2. Execute: `vercel`
3. Siga as instruções

Ou faça deploy direto pelo site da Vercel importando este repositório.

## Analytics e variáveis de ambiente

Este projeto adiciona a integração do Vercel Web Analytics para sites estáticos. Para evitar expor chaves privadas (ex.: Supabase), siga estes passos:

1. No painel do seu projeto Vercel, abra **Settings > Environment Variables**.
2. Crie uma variável `SUPABASE_URL` e uma variável `SUPABASE_KEY` (use a chave ANON/publica se for necessário no cliente).
3. Não comite chaves secretas no repositório — use variáveis de ambiente e, quando possível, rotacione chaves.

Para habilitar o Analytics via painel Vercel: abra o projeto > aba **Analytics** > clique em **Enable**. Após deploy e algumas visitas, os dados começarão a aparecer.

## Integração com Supabase (salvamento de marcações)

Este projeto inclui funções serverless (`/api/getMarks` e `/api/upsertMark`) que fazem a comunicação segura com o Supabase.

Defina as seguintes variáveis em Vercel (Settings → Environment Variables):

- `SUPABASE_URL` — URL do seu projeto Supabase
- `SUPABASE_SERVICE_KEY` — chave de serviço (service_role) para uso apenas no servidor (não a exponha no cliente)

Crie a tabela SQL abaixo no editor SQL do Supabase:

```sql
create table if not exists public.workmarks (
	id uuid primary key default uuid_generate_v4(),
	user_id text,
	date date not null,
	status boolean not null default false,
	note text,
	created_at timestamp with time zone default timezone('utc', now())
);
create index if not exists workmarks_user_date_idx on public.workmarks(user_id, date);
```

Depois de configurar as variáveis e criar a tabela, faça um novo deploy na Vercel. O front-end chamará as rotas `/api/getMarks` e `/api/upsertMark` para ler e salvar marcações.
