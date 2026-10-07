import { defineShikiSetup } from '@slidev/types';

// Code highlighting matches viktor's editor: VS Code "GitHub Dark Default".
export default defineShikiSetup(() => {
	const result = {
		themes : {
			dark  : 'github-dark-default',
			light : 'github-light-default',
		},
	};
	return result;
});
