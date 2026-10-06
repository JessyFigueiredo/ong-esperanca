# Acessibilidade

## Escopo

Este documento registra as verificações implementadas no protótipo. Não representa certificação nem declaração de conformidade WCAG 2.1 AA.

## Medidas implementadas

- Documento em português brasileiro (`lang="pt-BR"`), landmarks semânticos, hierarquia de títulos e link para saltar diretamente ao conteúdo.
- Rotas SPA atualizam o conteúdo principal, o título da página e a indicação acessível da rota atual.
- Campos do formulário têm rótulos, instruções e mensagens de erro associadas; erros também são expostos com `aria-invalid`.
- Mensagens gerais usam região de status acessível.
- Elementos interativos exibem foco de teclado visível; animações e rolagem suave respeitam `prefers-reduced-motion`.
- Mensagens de erro de campos obrigatórios estão associadas aos respectivos controles por `aria-describedby`.
- Imagens de conteúdo têm texto alternativo.
- Texto pequeno usa cores verificadas com razão de contraste de pelo menos 4,5:1 nos fundos da interface:

| Texto | Fundo | Contraste aproximado |
|---|---|---:|
| Texto secundário `#4f6057` | creme `#e2eee3` | 5,59:1 |
| Texto secundário `#4f6057` | verde-claro `#d1e3d3` | 4,98:1 |
| Texto secundário `#4f6057` | rodapé `#ccdfce` | 4,78:1 |
| Destaque `#28644e` | creme `#e2eee3` | 5,81:1 |
| Destaque `#28644e` | verde-claro `#d1e3d3` | 5,17:1 |
| Botão principal: branco | verde `#28644e` | 6,95:1 |

## Verificações manuais pendentes

Uma execução local do axe-core 4.10.3 no Chromium, cobrindo os critérios automatizáveis WCAG 2.1 A/AA nas três rotas, não identificou violações. Permaneceram verificações de contraste incompletas em conteúdo decorativo ou parcialmente fora da área visível; elas não foram tratadas como aprovação automática.

Antes de declarar conformidade WCAG 2.1 AA, valide todas as rotas com leitor de tela; percorra todos os fluxos apenas por teclado; confirme a ordem de leitura, os estados de foco, erro e sucesso; teste zoom de 200% e reflow em 320 CSS px; e revise manualmente todas as verificações incompletas do axe/Lighthouse e os contrastes em todos os estados interativos. A automação e os testes de teclado/reflow no navegador não comprovam conformidade integral.

O formulário é apenas demonstrativo e guarda dados localmente no navegador. Não o use para coletar dados reais até existir backend e revisão de privacidade e segurança.
