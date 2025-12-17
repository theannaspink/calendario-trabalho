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
