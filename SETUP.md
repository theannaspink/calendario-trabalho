# 📋 Guia de Configuração - Calendário com Supabase + Vercel + GitHub

## 🎯 Passo a Passo Completo

### 1️⃣ Criar conta no Supabase

1. Acesse: https://supabase.com
2. Clique em "Start your project"
3. Faça login com GitHub
4. Clique em "New Project"
5. Preencha:
   - **Name**: calendario-trabalho
   - **Database Password**: Crie uma senha forte (anote!)
   - **Region**: South America (São Paulo)
6. Clique em "Create new project" (aguarde 2-3 minutos)

---

### 2️⃣ Criar a tabela no Supabase

1. No painel do Supabase, clique em **"SQL Editor"** (ícone de banco de dados no menu lateral)
2. Clique em **"New query"**
3. Cole este código SQL:

```sql
-- Criar tabela para dias marcados
CREATE TABLE completed_days (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, date)
);

-- Criar índice para melhor performance
CREATE INDEX idx_completed_days_user_id ON completed_days(user_id);

-- Habilitar Row Level Security (segurança)
ALTER TABLE completed_days ENABLE ROW LEVEL SECURITY;

-- Política: Permitir que qualquer um insira/leia/delete seus próprios dados
CREATE POLICY "Permitir acesso aos próprios dados"
ON completed_days
FOR ALL
USING (true)
WITH CHECK (true);
```

4. Clique em **"Run"** (ou pressione Ctrl+Enter)
5. Deve aparecer "Success. No rows returned"

---

### 3️⃣ Pegar as credenciais do Supabase

1. No menu lateral, clique em **"Settings"** (ícone de engrenagem)
2. Clique em **"API"**
3. Você verá duas informações importantes:

   **Project URL** (algo como):
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   **anon public** (em "Project API keys"):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **COPIE ESSES DOIS VALORES** (vamos usar no próximo passo)

---

### 4️⃣ Configurar o código

1. Abra o arquivo **index.html**
2. Procure estas linhas (no início do JavaScript):

```javascript
const SUPABASE_URL = 'SUA_URL_AQUI'
const SUPABASE_KEY = 'SUA_CHAVE_AQUI'
```

3. Substitua pelos valores que você copiou:

```javascript
const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

4. Salve o arquivo

---

### 5️⃣ Subir para o GitHub

1. Crie um repositório no GitHub:
   - Acesse: https://github.com/new
   - Nome: `calendario-trabalho`
   - Deixe como **Public**
   - Clique em "Create repository"

2. No seu computador, abra o terminal na pasta do projeto e execute:

```bash
git init
git add .
git commit -m "Calendário de trabalho com Supabase"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/calendario-trabalho.git
git push -u origin main
```

(Substitua `SEU-USUARIO` pelo seu usuário do GitHub)

---

### 6️⃣ Fazer deploy na Vercel

**Opção A - Pelo site (mais fácil):**

1. Acesse: https://vercel.com
2. Clique em "Sign Up" e faça login com GitHub
3. Clique em "Add New" > "Project"
4. Selecione o repositório `calendario-trabalho`
5. Clique em "Deploy"
6. Aguarde 1-2 minutos
7. Pronto! Você receberá um link tipo: `https://calendario-trabalho.vercel.app`

**Opção B - Por CLI:**

```bash
npm i -g vercel
vercel login
vercel
```

---

### 7️⃣ Testar

1. Acesse o link da Vercel
2. Clique em um dia de trabalho (azul) para marcar com X
3. Abra em outro dispositivo ou navegador
4. Os dados devem estar sincronizados! ✨

---

## 🔧 Solução de Problemas

**Erro ao carregar dados:**
- Verifique se copiou corretamente a URL e a chave do Supabase
- Confirme que a tabela foi criada (vá em "Table Editor" no Supabase)

**Dados não sincronizam:**
- Abra o Console do navegador (F12) e veja se há erros
- Verifique se as políticas de segurança foram criadas corretamente

**Deploy falhou:**
- Certifique-se que todos os arquivos foram commitados no GitHub
- Tente fazer deploy novamente

---

## 📱 Como usar

- **Marcar dia**: Clique no dia de trabalho (azul)
- **Desmarcar**: Clique novamente no X
- **Navegar**: Use as setas ou deslize (mobile)
- **Contador**: Atualiza automaticamente

Os dados ficam salvos na nuvem e sincronizam entre todos os seus dispositivos! 🎉
