# Fluxo de trabalho GitFlow

O repositório usa GitFlow para separar integração contínua, trabalho em andamento e código publicado. As branches permanentes são `main` e `develop`; branches de funcionalidade, preparação de versão e correção urgente são criadas para cada necessidade, integradas por pull request e removidas depois da integração.

## Responsabilidade das branches

| Branch | Origem | Destino do pull request | Responsabilidade |
|---|---|---|---|
| `main` | — | — | Linha estável de produção. Um push integrado nesta branch aciona o deploy do GitHub Pages. |
| `develop` | — | — | Linha de integração do próximo lançamento. Recebe funcionalidades concluídas e correções. |
| `feature/<nome>` | `develop` | `develop` | Implementar uma funcionalidade isolada sem afetar a linha de produção. |
| `release/<versao>` | `develop` | `main` e, depois, `develop` | Estabilizar e preparar uma versão; limitar as alterações a ajustes e documentação do lançamento. |
| `hotfix/<nome>` | `main` | `main` e, depois, `develop` | Corrigir uma falha urgente da versão publicada e levar a mesma correção à próxima versão. |

Branches `feature/*`, `release/*` e `hotfix/*` não são linhas permanentes: após a integração e a sincronização dos destinos indicados, podem ser excluídas. No trabalho individual, o pull request continua sendo útil como unidade de revisão, histórico e execução dos checks automatizados.

## Fluxo de uma funcionalidade

```powershell
git switch develop
git pull --ff-only origin develop
git switch -c feature/nome-da-funcionalidade
# implementar e verificar a mudança
git add .
git commit -m "feat: descreve a funcionalidade"
git push -u origin feature/nome-da-funcionalidade
```

Abra um pull request de `feature/nome-da-funcionalidade` para `develop`. Aguarde o workflow de validação e resolva os apontamentos antes de integrar. Depois do merge, atualize `develop` e remova a branch de feature.

## Preparação de versão

Crie `release/<versao>` a partir de `develop` quando o conjunto de mudanças estiver pronto para estabilização. Valide a versão e atualize somente os metadados e documentos necessários. Abra o pull request para `main`; depois de integrado, crie a tag anotada da versão, por exemplo `v1.0.0`, e abra outro pull request da release para `develop` para preservar ajustes de estabilização. Exclua a branch de release após sincronizar ambos os destinos.

```powershell
git switch develop
git pull --ff-only origin develop
git switch -c release/1.0.0
# estabilizar, validar e documentar a versão
git push -u origin release/1.0.0
# PR release/1.0.0 -> main; após o merge:
git switch main
git pull --ff-only origin main
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
# PR release/1.0.0 -> develop para sincronizar a versão
```

O deploy de produção é acionado pela integração em `main`, não pela criação da tag ou por pushes em branches de trabalho.

## Correção urgente

Crie `hotfix/<nome>` a partir da versão estável em `main`. Após validar a correção, abra um pull request para `main`; depois da integração e publicação, abra outro para `develop`, evitando que a falha reapareça na próxima release.

```powershell
git switch main
git pull --ff-only origin main
git switch -c hotfix/correcao-urgente
# corrigir e validar
git add .
git commit -m "fix: corrige falha urgente"
git push -u origin hotfix/correcao-urgente
# PR hotfix/correcao-urgente -> main e, depois, -> develop
```

## Automação e regras do GitHub

- `.github/workflows/validate.yml` executa a validação em pushes para `main`, `develop` e branches `feature/*`, `release/*`, `hotfix/*`; também valida pull requests destinados a `main` e `develop`.
- `.github/workflows/deploy-pages.yml` constrói e publica o artefato somente a partir de `main` (ou por execução manual desse workflow).
- Configure no GitHub regras de proteção para `main` e `develop`: exigir pull request, exigir que o check `validate` passe, bloquear force-push e exclusão dessas branches. Para trabalho individual, a aprovação por outro revisor pode ser dispensada; os checks devem continuar obrigatórios.
- As branches remotas `main` e `develop` existem, mas atualmente não têm proteção ativa no GitHub. Ative as regras em **Settings → Rules → Rulesets** (ou **Settings → Branches**, conforme a interface disponível) para que a integração por pull request seja efetivamente imposta.
- Antes de uma release, confira o estado dos checks e a URL publicada em **Actions**. Verificações e regras de branch não substituem a revisão funcional e de acessibilidade documentada em [`ACCESSIBILITY.md`](./ACCESSIBILITY.md).

As regras de proteção são configurações do repositório no GitHub e não são ativadas apenas por manter este documento ou os workflows no código. Não envie chaves, tokens ou dados pessoais reais para branches, commits, logs ou artefatos.
