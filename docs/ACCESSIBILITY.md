# Acessibilidade

## Escopo

O projeto aplica boas práticas baseadas nas WCAG 2.2, com prioridade para os critérios de nível AA aplicáveis a um site estático com navegação SPA por hash e formulário demonstrativo. Este documento não é uma certificação nem uma declaração de conformidade WCAG completa.

## Melhorias e verificações

- Documento em português brasileiro (`lang="pt-BR"`), título atualizado por rota, landmarks semânticos, hierarquia de títulos, meta viewport sem restrição de zoom e link para saltar ao conteúdo.
- A navegação identifica a rota atual por `aria-current="page"` e por sublinhado visível, não apenas pela cor. A mudança de rota move o foco para o conteúdo principal.
- Imagens dos projetos estão associadas à iniciativa correspondente, têm texto alternativo adequado e variantes WebP responsivas.
- Campos do formulário têm rótulos, instruções e erros textuais associados. A validação atualiza `aria-invalid`, anuncia o estado geral e move o foco para o primeiro campo inválido. Grupos de opções usam `fieldset` e `legend`.
- Botões, links e opções de formulário têm alvos com pelo menos 24 CSS px de altura; botões de ação mantêm altura maior. Foco de teclado é visível e não há conteúdo fixo que o encubra.
- Não há modais, menus expansíveis, conteúdo de áudio/vídeo nem controlos personalizados. A navegação e os controlos usam elementos HTML nativos.
- O CSS respeita `prefers-reduced-motion`. A aplicação mantém a paleta clara existente; não oferece alternância de tema ou modo escuro.
- A versão do cache do Service Worker foi incrementada para que visitantes recorrentes recebam os estilos e textos alternativos corrigidos, em vez de continuarem a usar recursos antigos em cache.
- Os textos pequenos abaixo foram verificados contra os respetivos fundos; todos excedem 4,5:1. Os estados de erro têm mensagem textual e não dependem apenas de cor.

| Texto | Fundo | Contraste aproximado |
|---|---|---:|
| Texto principal `#22342c` | creme `#e2eee3` | 11,01:1 |
| Texto secundário `#4f6057` | creme `#e2eee3` | 5,59:1 |
| Texto secundário `#4f6057` | verde-claro `#d1e3d3` | 4,98:1 |
| Texto secundário `#4f6057` | rodapé `#ccdfce` | 4,78:1 |
| Destaque `#28644e` | creme `#e2eee3` | 5,81:1 |
| Destaque `#28644e` | verde-claro `#d1e3d3` | 5,17:1 |
| Botão principal: branco | verde `#28644e` | 6,95:1 |
| Erro `#a4362a` | branco `#ffffff` | 6,69:1 |
| Borda de campos `#75877c` | branco `#ffffff` | 3,81:1 |

## Ferramentas e limites

Nesta etapa, `html-validate` foi executado nos documentos de entrada; também foram verificadas a sintaxe JavaScript, a build de produção, a navegação por teclado, o foco nos campos inválidos, os rótulos e referências ARIA das rotas renderizadas, as imagens carregadas e a ausência de rolagem horizontal a 320 CSS px. Os contrastes da tabela foram calculados a partir das cores CSS. O workflow `.github/workflows/validate.yml` executa `html-validate` nos documentos de entrada, verifica sintaxe JavaScript e confirma os arquivos e o artefato de produção. O HTML das rotas principais é montado dinamicamente a partir de templates JavaScript, portanto a validação estática de documentos não cobre por si só todo o DOM renderizado.

Os cálculos de contraste documentados cobrem as combinações listadas, não cada elemento, estado hover/foco, imagem ou cenário de alto contraste. Permanecem pendentes testes com leitores de ecrã, em diferentes navegadores, zoom real de 200%, espaçamento de texto ampliado e preferências de alto contraste. Não foi realizada nesta etapa uma auditoria formal nem uma análise automatizada completa de axe/Lighthouse.

O formulário é demonstrativo e guarda dados localmente no navegador. Não deve ser usado para recolher dados reais sem backend e revisão de privacidade e segurança.
