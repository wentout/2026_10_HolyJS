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
		],
	};
	return result;
});
