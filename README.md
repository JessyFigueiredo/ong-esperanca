# ONG Esperança

Site estático de apresentação da ONG Esperança, com navegação SPA por hash e formulário demonstrativo para interesse em voluntariado.

## Estrutura

- `index.html`: shell da aplicação e ponto de entrada.
- `css/style.css`: estilos responsivos e estados de acessibilidade.
- `js/app.js`: roteamento e inicialização.
- `js/templates.js`: templates HTML das rotas.
- `js/modules/validation.js`: formatação e validação dos campos.
- `js/modules/volunteer-form.js`: interação e feedback do formulário.
- `js/modules/storage.js`: persistência local no navegador.
- `imagens/`: recursos gráficos locais.
- `service-worker.js`: cache para uso offline após a primeira visita online.

## Desenvolvimento local

ES Modules e Service Workers precisam de uma origem HTTP segura. Abra a pasta do projeto no VS Code, instale a extensão Live Server e inicie o servidor com `index.html` aberto. Não use duplo clique no HTML (`file://`).

## Formulário e privacidade

O formulário é uma demonstração client-side. Os cadastros são gravados no `localStorage` do navegador e não são transmitidos à ONG. O armazenamento no browser não é apropriado para dados reais sensíveis. Antes de receber cadastros reais, implemente uma API com controles de acesso, retenção e proteção de dados; evite coletar CPF se ele não for estritamente necessário. Limpar os dados do site remove os registros locais.

## Acessibilidade

O projeto inclui idioma declarado, landmarks semânticos, link para pular ao conteúdo, navegação por teclado, rótulos e mensagens associadas aos campos, foco visível e suporte a `prefers-reduced-motion`. As cores de texto foram ajustadas para atingir a razão mínima WCAG AA de 4,5:1 nos fundos principais. Consulte [`docs/ACCESSIBILITY.md`](./docs/ACCESSIBILITY.md) para os contrastes verificados e a lista de auditorias manuais ainda necessárias; não se declara conformidade WCAG integral sem essas validações.

## Versionamento Git

O repositório usa GitFlow. A branch `main` contém versões estáveis e é a única que pode acionar o deploy de produção. `develop` recebe funcionalidades integradas para a próxima versão. Cada `feature/*` parte de `develop` e volta a ela por pull request; branches de feature não publicam diretamente em produção.

Fluxo recomendado:

```powershell
# Nova funcionalidade: partir de develop e trabalhar em uma feature
git switch develop
git pull origin develop
git switch -c feature/nome-da-funcionalidade
git add .
git commit -m "feat: descreva a funcionalidade"
git push -u origin feature/nome-da-funcionalidade

# Abrir pull request feature/* -> develop; após revisão e aprovação, integrar.
# O workflow .github/workflows/validate.yml valida sintaxe e arquivos necessários nos PRs.

# Preparar versão: partir de develop
git switch develop
git switch -c release/1.0.0
# validar, corrigir versão/documentação e testar nesta branch
git push -u origin release/1.0.0
# abrir pull request release/1.0.0 -> main e, após publicar, integrar também em develop

# Correção urgente: partir de main
git switch main
git switch -c hotfix/correcao-urgente
# corrigir e testar
git push -u origin hotfix/correcao-urgente
# abrir pull request hotfix/* -> main e integrar a mesma correção em develop
```

Não inclua segredos, credenciais, dados pessoais reais ou arquivos de build (`dist/`) no controle de versão. O `.gitignore` cobre saídas de build, dependências locais e arquivos de ambiente. Para um repositório GitHub novo, configure o remoto `origin` e publique `main` e `develop`; as branches de feature devem ser publicadas ao abrir seus pull requests. O deploy manual também é restrito a `main`; executar o workflow em outra branch não publica em produção. Ainda não há remoto configurado.

## Publicação no GitHub Pages

O workflow `.github/workflows/validate.yml` verifica a sintaxe JavaScript e os arquivos de produção em pushes para `main`/`develop` e em pull requests para essas branches. O workflow `.github/workflows/deploy-pages.yml` prepara uma cópia enxuta do site em `dist/` e publica somente em pushes ou execuções manuais na branch `main`. Para ativar o deploy:

1. Crie um repositório GitHub e envie a branch `main`.
2. Em **Settings → Pages**, selecione **GitHub Actions** como fonte de publicação.
3. Acompanhe o workflow na aba **Actions**; após sucesso, abra a URL informada pelo job de deploy.

O deploy publica um protótipo estático, não um serviço de recebimento de inscrições. O formulário continuará armazenando dados somente no navegador de cada visitante.

## Otimização e verificação

O artefato de deploy inclui apenas os HTML de entrada/redirecionamento, CSS, JavaScript, imagens JPG referenciadas e o Service Worker; arquivos locais não usados e metadados do Git ficam fora do `dist/`. Não há etapa de minificação, pois não existe bundler configurado. Faça auditoria visual, funcional, de acessibilidade e de tamanho de imagens antes de cada release.
