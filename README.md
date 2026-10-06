# ONG Esperança

Site estático de apresentação da ONG Esperança, com navegação SPA por hash e formulário demonstrativo para interesse em voluntariado.

## Estrutura

- `index.html`: shell da aplicação e ponto de entrada.
- `css/style.css`: estilos responsivos e estados de acessibilidade.
- `js/app.js`: roteamento e inicialização.
- `js/templates/`: templates das rotas de projetos e cadastro, carregados sob demanda; a página inicial estática fica em `index.html`.
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

O projeto aplica boas práticas baseadas nas WCAG 2.2 AA, incluindo idioma e landmarks semânticos, link para saltar ao conteúdo, navegação por teclado, rótulos e erros associados aos campos, foco visível, alvos interativos ampliados e suporte a `prefers-reduced-motion`. As cores de texto foram verificadas para contraste nos principais fundos. Consulte [`docs/ACCESSIBILITY.md`](./docs/ACCESSIBILITY.md) para os detalhes, ferramentas e verificações manuais pendentes. Isso não constitui declaração de conformidade WCAG completa.

## Versionamento Git

O projeto adota GitFlow: `main` mantém a versão estável e publica em produção; `develop` integra o trabalho destinado à próxima versão. Branches `feature/*`, `release/*` e `hotfix/*` são temporárias e integradas por pull request. O histórico já contém a integração da feature de documentação do fluxo. Consulte [`docs/GITFLOW.md`](./docs/GITFLOW.md) para o fluxo, os comandos, a estratégia de releases e as proteções recomendadas no GitHub.

Não inclua segredos, credenciais, dados pessoais reais ou arquivos de build (`dist/`) no controle de versão. O `.gitignore` cobre saídas de build, dependências locais e arquivos de ambiente.

## Publicação no GitHub Pages

O workflow `.github/workflows/validate.yml` verifica sintaxe JavaScript, valida os documentos HTML com html-validate e monta o artefato de produção em pushes para `main`, `develop`, `feature/*`, `release/*` e `hotfix/*`, além de pull requests destinados a `main` ou `develop`. O workflow `.github/workflows/deploy-pages.yml` prepara uma cópia enxuta do site em `dist/` e publica apenas em pushes ou execuções manuais na branch `main`. Para ativar ou confirmar o deploy:

1. Em **Settings → Pages**, selecione **GitHub Actions** como fonte de publicação.
2. Acompanhe o workflow na aba **Actions**; após sucesso, abra a URL informada pelo job de deploy.

O deploy publica um protótipo estático, não um serviço de recebimento de inscrições. O formulário continuará armazenando dados somente no navegador de cada visitante.

## Otimização e verificação

O workflow de deploy monta o site em `dist/` e minifica CSS, módulos JavaScript e Service Worker com esbuild 0.25.5; preserva o HTML e a estrutura dos módulos. As fotografias são servidas em WebP com variantes `srcset`/`sizes`; o navegador escolhe a resolução adequada à viewport, a imagem principal é priorizada e as imagens dos projetos são carregadas sob demanda. Templates das rotas e o código do formulário são carregados sob demanda. Os JPEG originais permanecem no repositório, mas não são copiados para o artefato de produção. Antes de cada release, faça auditoria visual e funcional e confira o tamanho dos recursos e o desempenho em dispositivos móveis.

O carregamento das fontes externas usa `preconnect`, stylesheet não bloqueante e `display=swap`. Se o provedor de fontes estiver indisponível, a pilha de fontes alternativas do sistema mantém o conteúdo utilizável.
