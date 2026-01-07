/**
 * Plugin Markdown para :::corp-code
 *
 * MODO SIMPLES (preview + codigo identicos):
 * :::corp-code
 * <CorpButton>Click</CorpButton>
 * :::
 *
 * MODO DISPLAY-CODE (preview diferente do codigo exibido):
 * :::corp-code
 * <CorpButton @click="count++">{{ count }}</CorpButton>
 *
 * <!-- @disp-code -->
 * ```vue
 * <script setup>
 * const count = ref(0)
 * </script>
 * <template>
 *   <CorpButton @click="count++">{{ count }}</CorpButton>
 * </template>
 * ```
 * :::
 *
 * MODO TABS (inspirado no code-group do VitePress):
 * :::corp-code{tabs}
 * ```vue [Template]
 * <CorpButton>Click</CorpButton>
 * ```
 * ```ts [Script]
 * import { CorpButton } from 'corp-components'
 * ```
 * :::
 *
 * OPCOES DISPONIVEIS:
 * - title="Titulo"     → Titulo do bloco
 * - lang=vue           → Linguagem (default: vue)
 * - no-preview         → Sem area de preview
 * - no-copy            → Sem botao de copiar
 * - no-header          → Sem header
 * - default-tab=1      → Tab inicial (0-indexed)
 * - tabs               → Ativa modo tabs
 */

import type MarkdownIt from 'markdown-it';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';

interface ICorpCodeMeta {
  language: string;
  title: string;
  noPreview: boolean;
  noCopy: boolean;
  noHeader: boolean;
  defaultTab: number;
  hasTabs: boolean;
}

interface ICorpCodeToken {
  type: string;
  tag: string;
  nesting: number;
  content: string;
  info: string;
  meta: ICorpCodeMeta;
}

interface ITabBlock {
  name: string;
  language: string;
  code: string;
}

interface IDispCodeResult {
  preview: string;
  displayCode: string;
  language: string;
}

/**
 * Separa conteudo em preview e display code
 * Detecta <!-- @disp-code --> como separador
 */
function parseDispCode(
  content: string,
  defaultLang: string
): IDispCodeResult | null {
  const separator = '<!-- @disp-code -->';
  const idx = content.indexOf(separator);

  if (idx === -1) return null;

  const preview = content.slice(0, idx).trim();
  const codeSection = content.slice(idx + separator.length).trim();

  // Extrai o bloco de codigo ```lang ... ```
  const codeMatch = codeSection.match(/```(\w+)?\n([\s\S]*?)```/);

  if (!codeMatch) return null;

  return {
    preview,
    language: codeMatch[1] || defaultLang,
    displayCode: codeMatch[2].trim(),
  };
}

/**
 * Extrai blocos de codigo no formato ```lang [TabName]
 */
function parseTabBlocks(content: string): ITabBlock[] {
  const blocks: ITabBlock[] = [];
  const regex = /```(\w+)\s*\[([^\]]+)\]\n([\s\S]*?)```/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    blocks.push({
      language: match[1],
      name: match[2],
      code: match[3].trim(),
    });
  }

  return blocks;
}

/**
 * Extrai opcoes do header :::corp-code{...}
 */
function parseOptions(optionsStr: string): Partial<ICorpCodeMeta> {
  const opts: Partial<ICorpCodeMeta> = {};

  if (!optionsStr) return opts;

  // lang=vue ou lang="vue"
  const langMatch = optionsStr.match(/lang=["']?(\w+)["']?/);
  if (langMatch) opts.language = langMatch[1];

  // title="Exemplo" ou title='Exemplo'
  const titleMatch = optionsStr.match(/title=["']([^"']+)["']/);
  if (titleMatch) opts.title = titleMatch[1];

  // default-tab=1
  const defaultTabMatch = optionsStr.match(/default-tab=(\d+)/);
  if (defaultTabMatch) opts.defaultTab = parseInt(defaultTabMatch[1], 10);

  // Flags booleanas
  if (/no-preview/.test(optionsStr)) opts.noPreview = true;
  if (/no-copy/.test(optionsStr)) opts.noCopy = true;
  if (/no-header/.test(optionsStr)) opts.noHeader = true;
  if (/\btabs\b/.test(optionsStr)) opts.hasTabs = true;

  return opts;
}

export function corpCodePlugin(md: MarkdownIt): void {
  const marker = 'corp-code';

  // Regra para detectar :::corp-code
  md.block.ruler.before(
    'fence',
    'corp_code',
    (state, startLine, endLine, silent) => {
      const startPos = state.bMarks[startLine] + state.tShift[startLine];
      const maxPos = state.eMarks[startLine];
      const line = state.src.slice(startPos, maxPos);

      // Verifica se comeca com :::corp-code
      if (!line.startsWith(':::' + marker)) {
        return false;
      }

      if (silent) {
        return true;
      }

      // Extrai opcoes
      const optionsMatch = line.match(/:::corp-code\s*(\{[^}]*\})?/);
      const optionsStr = optionsMatch?.[1]?.slice(1, -1) || ''; // Remove { }
      const parsedOpts = parseOptions(optionsStr);

      // Defaults
      const meta: ICorpCodeMeta = {
        language: parsedOpts.language ?? 'vue',
        title: parsedOpts.title ?? '',
        noPreview: parsedOpts.noPreview ?? false,
        noCopy: parsedOpts.noCopy ?? false,
        noHeader: parsedOpts.noHeader ?? false,
        defaultTab: parsedOpts.defaultTab ?? 0,
        hasTabs: parsedOpts.hasTabs ?? false,
      };

      // Encontra o fechamento :::
      let nextLine = startLine + 1;
      const contentLines: string[] = [];

      while (nextLine < endLine) {
        const lineStart = state.bMarks[nextLine] + state.tShift[nextLine];
        const lineEnd = state.eMarks[nextLine];
        const currentLine = state.src.slice(lineStart, lineEnd);

        if (currentLine.trim() === ':::') {
          break;
        }

        contentLines.push(currentLine);
        nextLine++;
      }

      const content = contentLines.join('\n').trim();

      // Cria token
      const token = state.push(
        'corp_code',
        'div',
        0
      ) as unknown as ICorpCodeToken;
      token.content = content;
      token.meta = meta;
      token.info = marker;

      state.line = nextLine + 1;
      return true;
    }
  );

  // Renderizador
  const defaultRender: RenderRule = (tokens, idx) => {
    const token = tokens[idx] as unknown as ICorpCodeToken;
    const content = token.content;
    const meta = token.meta;

    // Monta config object
    const configParts: string[] = [];
    if (meta.title) configParts.push(`title: '${meta.title}'`);
    if (meta.noPreview) configParts.push('preview: false');
    if (meta.noCopy) configParts.push('copyable: false');
    if (meta.noHeader) configParts.push('hideHeader: true');
    if (meta.defaultTab > 0) configParts.push(`defaultTab: ${meta.defaultTab}`);

    // MODO TABS
    if (meta.hasTabs) {
      const tabBlocks = parseTabBlocks(content);

      if (tabBlocks.length > 0) {
        // Adiciona tabs ao config
        const tabNames = tabBlocks.map(t => `'${t.name}'`).join(', ');
        configParts.push(`tabs: [${tabNames}]`);

        const configAttr = ` :config="{ ${configParts.join(', ')} }"`;

        // Gera slots para cada tab
        const tabSlots = tabBlocks
          .map(tab => {
            const codeBlock = `\`\`\`${tab.language}\n${tab.code}\n\`\`\``;
            const renderedCode = md.render(codeBlock);
            return `<template #code-${tab.name}>${renderedCode}</template>`;
          })
          .join('\n');

        // Preview usa o primeiro bloco de codigo
        const previewContent = meta.noPreview ? '' : tabBlocks[0].code;

        return `<CorpCode${configAttr}>
${previewContent}
${tabSlots}
</CorpCode>`;
      }
    }

    // MODO DISPLAY-CODE (preview diferente do codigo)
    const dispCode = parseDispCode(content, meta.language);
    if (dispCode) {
      const codeBlock = `\`\`\`${dispCode.language}\n${dispCode.displayCode}\n\`\`\``;
      const renderedCode = md.render(codeBlock);

      const configAttr =
        configParts.length > 0
          ? ` :config="{ ${configParts.join(', ')} }"`
          : '';

      return `<CorpCode${configAttr}>
${dispCode.preview}
<template #code>
${renderedCode}
</template>
</CorpCode>`;
    }

    // MODO SIMPLES (preview = codigo)
    const codeBlock = `\`\`\`${meta.language}\n${content}\n\`\`\``;
    const renderedCode = md.render(codeBlock);

    const configAttr =
      configParts.length > 0 ? ` :config="{ ${configParts.join(', ')} }"` : '';

    return `<CorpCode${configAttr}>
${content}
<template #code>
${renderedCode}
</template>
</CorpCode>`;
  };

  md.renderer.rules['corp_code'] = defaultRender;
}
