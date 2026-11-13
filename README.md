# Flux Acessibilidade — versão universal (1.0.6)

Botão de acessibilidade para **qualquer site ou sistema web**: um único arquivo JavaScript, sem dependências, sem cookies e sem enviar dados.

Autor: Aislan Renedy — https://fluxativa.com.br/ · Licença: GPL-2.0-or-later

Recursos: tamanho do texto, alto contraste, inverter cores, escala de cinza, destacar links e títulos, fonte legível, espaçamento, cursor grande, pausar animações, régua de leitura, leitura em voz alta e **Libras (VLibras)** num botão duplo.

---

## Instalação rápida (1 linha)

Cole antes do `</body>` do layout comum do sistema:

```html
<script src="https://cdn.jsdelivr.net/gh/SEU-USUARIO/flux-acessibilidade@1.0.6/flux-a11y.min.js"
        data-cor="#1769e0"
        data-recursos="fonte,contraste,inverter,cinza,links,titulos,legivel,espacamento,cursor,animacoes,regua,voz,libras"
        defer></script>
```

Quer escolher cores e recursos clicando? Abra o **[gerador.html](gerador.html)** no navegador: ele mostra o botão ao vivo e gera a linha pronta.

Para testar antes, abra o **[exemplo.html](exemplo.html)**.

---

## Onde colar em cada sistema

- **HTML / PHP / ASP / Java:** no arquivo de rodapé (footer) ou layout principal.
- **Laravel, Django, Rails:** no layout base (ex.: `layouts/app.blade.php`).
- **Moodle:** Administração do site → Aparência → HTML adicional → "Antes do fechamento de `</body>`".
- **React, Angular, Vue:** no `index.html` de entrada.
- **WordPress:** use o plugin **Flux Acessibilidade** (tem painel de configuração).
- **Páginas com `<iframe>`:** o botão vale só para a página onde foi colado.

---

## Opções (atributos `data-*`)

| Atributo | Valores | Padrão |
|---|---|---|
| `data-cor` | cor hexadecimal (`#0b5394`) | `#1769e0` |
| `data-estilo` | `borda` (encaixado na lateral) ou `flutuante` | `borda` |
| `data-tema` | `claro`, `escuro` ou `auto` | `claro` |
| `data-posicao` | `direita` ou `esquerda` | `direita` |
| `data-vertical` | `cima`, `meio` ou `baixo` | `baixo` |
| `data-tamanho` | 40 a 72 (px) | `52` |
| `data-margem` | distância da borda de cima/baixo (px) | `18` |
| `data-recursos` | lista separada por vírgula (veja abaixo) | todos, menos `libras` |
| `data-idioma` | `auto`, `pt`, `en`, `es` | `auto` |
| `data-titulo` | título do painel | "Acessibilidade" |
| `data-declaracao` | link da declaração de acessibilidade | — |
| `data-icone` | URL de um logo no lugar do ícone | — |
| `data-desviar` | `false` desliga o desvio de botões flutuantes (WhatsApp, chat) | ligado |
| `data-config` | endereço de um JSON com as opções (configuração central) | — |

**Recursos:** `fonte`, `contraste`, `inverter`, `cinza`, `links`, `titulos`, `legivel`, `espacamento`, `cursor`, `animacoes`, `regua`, `voz`, `libras`.

Com `libras`, o botão vira uma peça dupla: acessibilidade em cima e mãos (VLibras) embaixo. O VLibras só é carregado quando a pessoa clica nas mãos, e enquanto a janela dele está aberta o botão sai da frente.

---

## Se algo der errado

- **Desfazer tudo:** botão "Restaurar padrão" no painel, atalho **Alt+Shift+0**, ou abrir a página com **`?fxa=reset`** no fim do endereço.
- **Abrir/fechar o painel pelo teclado:** **Alt+Shift+A**.
- **Libras não abre:** aperte F12 → Console; a linha que começa com `[Flux Acessibilidade]` diz o motivo.
- **Testar tudo de uma vez:** cole o conteúdo de [autoteste.js](autoteste.js) no Console (F12). Aparece uma tabela com OK/FALHOU.

## Segurança (CSP) e privacidade (LGPD)

- Se o sistema usa *Content-Security-Policy*, liberar `cdn.jsdelivr.net` (o arquivo) e, para o Libras, `vlibras.gov.br`.
- Sem cookies e sem envio de dados. As escolhas ficam no navegador da pessoa (`localStorage`, chave `fxa_prefs_v1`).
- Libras carrega o serviço do governo federal (vlibras.gov.br) **só quando a pessoa clica**. Vale citar na política de privacidade.

## API JavaScript (opcional)

```js
FluxA11y.init({ cor: '#0b5394', recursos: ['fonte', 'contraste', 'libras'] });
FluxA11y.open();  FluxA11y.close();  FluxA11y.reset();  FluxA11y.destroy();
```

## Limitações

O botão ajuda a pessoa a adaptar a leitura, mas **não torna o sistema acessível sozinho** (textos alternativos, contraste do projeto, formulários com rótulo e navegação por teclado dependem do próprio sistema). Não prometa conformidade total (WCAG/eMAG) só por instalar.
