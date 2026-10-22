import { defineShikiSetup } from '@slidev/types';

// Code highlighting matches viktor's editor: VS Code "GitHub Dark Default".
// The flow-arrows transformer wraps ↓/→ characters inside code blocks
// in .flow-arrow spans so CSS can make them stand out (execution-flow
// slides). These chars never occur in shiki markup itself, so a plain
// text replace is safe.
export default defineShikiSetup(() => {
	const result = {
		themes : {
			dark  : 'github-dark-default',
			light : 'github-light-default',
		},
		transformers : [
			{
				name : 'flow-arrows',
				postprocess (html) {
					return html.replace(/([↓↑→])/g, '<span class="flow-arrow">$1</span>');
				},
			},
			{
				// ⟪token⟫ inside code fences is stripped and the token gets
				// the hl-token class (see styles/index.css). Works on the token
				// stream, NOT the final HTML: the grammar may split a marked
				// word across several spans (e.g. `const ⟪user⟫ =` splits the
				// brackets away from the word), so an HTML text replace would
				// silently miss those. Tokens that only partially overlap the
				// markers are split so surrounding text keeps its own styling.
				name : 'hl-token',
				tokens (lines) {
					for (const line of lines) {
						const text = line.map((t) => t.content).join('');
						if (!text.includes('⟪')) continue;
						const hl = new Array(text.length).fill(false);
						const marker = new Array(text.length).fill(false);
						let depth = 0;
						for (let i = 0; i < text.length; i++) {
							if (text[i] === '⟪') { depth++; marker[i] = true; continue; }
							if (text[i] === '⟫') { depth--; marker[i] = true; continue; }
							hl[i] = depth > 0;
						}
						const out = [];
						let pos = 0;
						for (const tok of line) {
							const end = pos + tok.content.length;
							let i = pos;
							while (i < end) {
								const state = marker[i] ? 0 : hl[i] ? 2 : 1;
								let j = i + 1;
								while (j < end && (marker[j] ? 0 : hl[j] ? 2 : 1) === state) j++;
								if (state !== 0) {
									const content = text.slice(i, j).replace(/[⟪⟫]/g, '');
									if (content) {
										const clone = { ...tok, content, offset: tok.offset + (i - pos) };
										if (state === 2) clone.htmlAttrs = { ...(tok.htmlAttrs || {}), class : 'hl-token' };
										out.push(clone);
									}
								}
								i = j;
							}
							pos = end;
						}
						line.length = 0;
						line.push(...out);
					}
				},
			},
		],
	};
	return result;
});
