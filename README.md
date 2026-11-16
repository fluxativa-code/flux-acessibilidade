# Flux Acessibilidade — versão universal (1.5.1)

Botão de acessibilidade para **qualquer site ou sistema web**: um único arquivo JavaScript, **sem PHP, sem servidor, sem dependências, sem cookies e sem enviar dados**.

Feito por **Aislan Renedy** (https://fluxativa.com.br/) e **IA Claude** (Anthropic) · Licença: GPL-2.0-or-later

---

## Instalação (1 linha)

Cole antes do `</body>` do layout comum do sistema:

```html
<script src="https://cdn.jsdelivr.net/gh/fluxativa-code/flux-acessibilidade@1.5.1/flux-a11y.min.js" defer></script>
```

Só essa linha já entrega:

- **Todos os recursos ligados:** perfis, tamanho do texto, cores, daltonismo, leitura em voz, Libras e os demais.
- **Painel claro ou escuro automático:** segue o tema do sistema do visitante e muda junto se ele trocar. O visitante também pode trocar no interruptor ☀/☾ do painel.
- **Botão flutuante de 44 px,** no meio da tela, lado direito, longe do botão de WhatsApp, que costuma ficar embaixo.

Para mudar alguma coisa, acrescente só o que for diferente:

```html
<script src="https://cdn.jsdelivr.net/gh/fluxativa-code/flux-acessibilidade@1.5.1/flux-a11y.min.js"
        data-cor="#0b5394" data-esconder="/painel, /login" defer></script>
```

- **Escolher clicando:** abra o **[gerador.html](gerador.html)** no navegador. Ele mostra o botão ao vivo e gera a linha pronta.
- **Testar antes:** abra o **[exemplo.html](exemplo.html)**.

---

## O que o visitante encontra

| Categoria | Recursos |
|---|---|
| Perfis (um por vez) | Dislexia, Baixa visão, TDAH, Epilepsia |
| Texto | Tamanho do texto (110%, 130%, 150%), Fonte legível, Espaçamento, Destacar títulos |
| Cores e contraste | Alto contraste, Inverter cores, Escala de cinza, Daltonismo (correção de Protanopia, Deuteranopia e Tritanopia) |
| Leitura | Ler em voz alta (ao apontar o mouse ou tocar), Régua de leitura, Máscara de leitura (3 larguras), Cursor grande |
| Navegação e foco | Destacar links, Pausar animações, Esconder imagens, Silenciar sons |
| Libras | Botão das mãos (VLibras, do governo federal), carregado só quando a pessoa clica |

---

## Onde colar em cada sistema

- **HTML / PHP / ASP / Java:** no arquivo de rodapé (footer) ou no layout principal.
- **Laravel, Django, Rails:** no layout base (ex.: `layouts/app.blade.php`).
- **Moodle:** Administração do site → Aparência → HTML adicional → "Antes do fechamento de `</body>`".
- **React, Angular, Vue:** no `index.html` de entrada.
- **WordPress:** use o plugin **Flux Acessibilidade**, que tem painel de configuração.
- **Páginas com `<iframe>`:** o botão vale só para a página onde foi colado.

---

## Opções (atributos `data-*`)

| Atributo | Valores | Padrão |
|---|---|---|
| `data-cor` | cor hexadecimal (`#0b5394`) | `#1769e0` |
| `data-tema` | `auto` (segue o sistema), `claro` ou `escuro` | `auto` |
| `data-estilo` | `flutuante` ou `borda` (encaixado na lateral) | `flutuante` |
| `data-tamanho` | 40 a 72 (px) | `44` |
| `data-posicao` | `direita` ou `esquerda` | `direita` |
| `data-vertical` | `cima`, `meio` ou `baixo` | `meio` |
| `data-margem` | distância da borda (px) | `18` |
| `data-esconder` | endereços onde o botão não aparece, separados por vírgula | — |
| `data-recursos` | lista separada por vírgula (veja abaixo) | todos |
| `data-voz-modo` | `apontar` ou `clique` | `apontar` |
| `data-voz-vel` | `0.75`, `1`, `1.25` ou `1.5` | `1` |
| `data-voz-genero` | `auto`, `feminina` ou `masculina` | `auto` |
| `data-idioma` | `auto`, `pt`, `en` ou `es` | `auto` |
| `data-titulo` | título do painel | "Acessibilidade" |
| `data-declaracao` | link da declaração de acessibilidade | — |
| `data-icone` | URL de um logo no lugar do ícone | — |
| `data-desviar` | `false` desliga o desvio de botões flutuantes (WhatsApp, chat) | ligado |
| `data-config` | endereço de um JSON com as opções (configuração central) | — |

**Esconder por endereço:**
- `/painel` esconde em `/painel` e em tudo que vem depois (`/painel/alunos`), mas não em `/painelx`.
- `/` esconde só na página inicial.
- Funciona 100% no navegador.

**Recursos:** `perfis`, `fonte`, `contraste`, `inverter`, `cinza`, `daltonismo`, `links`, `titulos`, `legivel`, `espacamento`, `cursor`, `animacoes`, `regua`, `mascara`, `imagens`, `sons`, `voz`, `libras`.

**Pelo JavaScript:** `FluxA11y.init({ cor: '#0b5394', esconder: ['/painel'] })`, `FluxA11y.open()`, `FluxA11y.close()`, `FluxA11y.reset()`, `FluxA11y.destroy()`, `FluxA11y.version`. Para controlar o início por conta própria, use `data-manual` no `<script>`.

---

## Acessibilidade do próprio botão

O widget segue a norma W3C WAI-ARIA 1.2 com os padrões do APG, e também a WCAG 2.2 AA (ISO/IEC 40500:2025) e a ABNT NBR 17225. O cabeçalho do `flux-a11y.js` lista o padrão de cada controle. Na verificação automática axe-core, o painel teve zero violações.

O botão ajuda o visitante a adaptar a página, mas **não torna um site conforme por si só**. A acessibilidade do código do próprio sistema continua necessária.

---

## Se algo der errado

- **Desfazer tudo:** botão "Restaurar padrão" no painel, atalho **Alt+Shift+0**, ou abrir a página com **`?fxa=reset`** no fim do endereço.
- **Abrir ou fechar pelo teclado:** **Alt+Shift+A**.
- **Libras não abre:** aperte F12 → Console. A linha que começa com `[Flux Acessibilidade]` diz o motivo.
- **Testar tudo de uma vez:** cole o conteúdo de [autoteste.js](autoteste.js) no Console (F12).

---

## Publicar uma versão nova (GitHub + jsDelivr)

1. No repositório `fluxativa-code/flux-acessibilidade`, envie os arquivos desta pasta (Add file → Upload files → Commit).
2. Em **Releases → Draft a new release**, crie a tag **`1.5.1`** ("+ Create new tag … on publish") e publique.
   - **Atenção:** crie uma **tag**, nunca um *branch* com o nome da versão. Se existir um branch e uma tag com o mesmo nome, o jsDelivr pode pegar o branch errado e guardar essa escolha por vários dias.
   - **Nunca reaproveite um número de versão:** se algo der errado, publique o próximo (1.5.2, 1.5.3…).
3. Em alguns minutos, o endereço `https://cdn.jsdelivr.net/gh/fluxativa-code/flux-acessibilidade@1.5.1/flux-a11y.min.js` passa a funcionar. Sem a tag, o jsDelivr responde "Couldn't find the requested file".

---

## Licença

GPL-2.0-or-later. Qualquer pessoa pode usar, estudar, alterar e redistribuir, mantendo a mesma licença, o código aberto e os avisos de autoria. Copyright (C) 2026 Aislan Renedy. Feito com a IA Claude (Anthropic).
