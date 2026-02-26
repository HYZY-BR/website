# Guia de Deploy: HYZY.io no Cloudflare Pages

Este guia descreve o passo a passo completo para publicar o projeto no Cloudflare Pages, garantindo que as rotas do React e o build do TypeScript funcionem corretamente.

---

## 1. Preparação do Código (Local ✨)

Antes de subir para a nuvem, garantimos que o projeto está pronto para o comportamento de uma **SPA (Single Page Application)**.

### Arquivo de Redirecionamento
Para evitar erros 404 ao atualizar a página (F5) em rotas internas, já criamos o arquivo:
- **Caminho:** `public/_redirects`
- **Conteúdo:** `/*  /index.html  200`

---

## 2. Subindo para o GitHub 🚀

O Cloudflare Pages precisa estar conectado a um repositório Git para automatizar os deploys.

1.  Crie um repositório novo no seu **GitHub** (ex: `site-hyzy`).
2.  No terminal do projeto (na raiz `site-hyzy`), execute:
    ```powershell
    # Inicializa o Git (se ainda não tiver feito)
    git init

    # Adiciona todos os arquivos
    git add .

    # Cria o primeiro commit
    git commit -m "feat: setup para deploy no cloudflare"

    # Define a branch principal como main
    git branch -M main

    # Conecta ao seu repositório no GitHub
    # (Troque a URL abaixo pela URL do seu repositório)
    git remote add origin https://github.com/SEU_USUARIO/site-hyzy.git

    # Envia os arquivos
    git push -u origin main
    ```

---

## 3. Configuração no Painel Cloudflare ☁️

1.  Acesse o painel da [Cloudflare](https://dash.cloudflare.com/).
2.  Vá em **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3.  Selecione o repositório que você acabou de criar.
4.  Configure os **Build settings**:
    *   **Framework preset:** `Vite`
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`
5.  **Variáveis de Ambiente (Crítico ⚠️):**
    Para evitar erros de versão do Node, adicione:
    *   Vá em **Environment variables (setup)**.
    *   Clique em **Add variable**.
    *   **Variable name:** `NODE_VERSION`
    *   **Value:** `20` (ou `18`)
6.  Clique em **Save and Deploy**.

---

## 4. Domínio Customizado 🌐

Após o build completar com sucesso:

1.  No projeto do Pages, vá na aba **Custom Domains**.
2.  Clique em **Set up a custom domain**.
3.  Digite seu domínio (ex: `hyzy.io` ou `hyzy.com.br`).
4.  Como seu DNS já está na Cloudflare, a ativação será automática e o SSL (HTTPS) será gerado em instantes.

---

## 5. Manutenção e Atualizações 🔄

A partir de agora, qualquer alteração que você fizer localmente e enviar para o GitHub (`git push`), a Cloudflare detectará e fará o deploy de uma nova versão do site automaticamente em poucos segundos.

---

**Dúvidas comuns:**
*   **Por que `npm run build`?** Ele executa o `tsc` para validar o TypeScript e o `vite build` para gerar os arquivos otimizados em `dist`.
*   **O site deu 404 em uma subpágina?** Verifique se o arquivo `public/_redirects` foi enviado corretamente ao repositório.
