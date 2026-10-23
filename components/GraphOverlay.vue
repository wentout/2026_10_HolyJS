<script setup>
import { onMounted, onUnmounted, unref } from 'vue';
import { useSlideContext } from '@slidev/client';

// Full-screen graph overlay, hosted outside the scaled slide stage.
// Usage on a slide: <GraphOverlay src="/mnemographica-graph.html" title="…" />
// The iframe sits above ALL slidev chrome and is shown only while the
// slide this component sits on is the current page in the main deck
// ($page from useSlideContext — the slide's own number, so the slide
// can move anywhere). visibility (not display) keeps the iframe fully
// laid out while hidden, so arriving is instant — no reload/refit
// flash. Arrow keys pressed inside the graph are forwarded back to the
// deck so navigation never gets stuck.
const props = defineProps({
	src   : { type : String, required : true },
	title : { type : String, default : 'Mnemonica Graph' },
});

const { $page } = useSlideContext();

let iframe = null;
let timer = null;

const pageFromRoute = () => {
	const m = /#\/(\d+)/.exec(window.location.hash);
	if (m) { return Number(m[1]); }
	const p = /\/(\d+)\/?$/.exec(window.location.pathname);
	if (p) { return Number(p[1]); }
	return (window.location.pathname === '/' && !window.location.hash) ? 1 : 0;
};

const update = () => {
	if (!iframe) { return; }
	const path = window.location.pathname;
	const mainDeck = !/\/(presenter|overview|export)/.test(path);
	const active = mainDeck && pageFromRoute() === unref($page);
	// visibility, NOT display: the iframe keeps its full-window layout
	// and stays rendered while hidden — no reload/refit flash on arrival
	iframe.style.visibility = active ? 'visible' : 'hidden';
};

onMounted(() => {
	iframe = document.createElement('iframe');
	// Resolve leading-slash srcs against the app base so the same build
	// works served from / (dev, Netlify) and from a subpath (GitHub Pages
	// with --base ./): BASE_URL is '/' in dev, './' in the pages build.
	iframe.src = props.src.startsWith('/')
		? import.meta.env.BASE_URL + props.src.slice(1)
		: props.src;
	iframe.title = props.title;
	iframe.setAttribute('allow', 'autoplay');
	iframe.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;border:0;background:#1e1e1e;z-index:9999;visibility:hidden';
	document.body.appendChild(iframe);
	iframe.addEventListener('load', () => {
		try {
			// keyup must be forwarded too: Slidev tracks held keys
			// (useMagicKeys) and auto-repeats while one is pressed —
			// a keydown without its keyup leaves the key stuck and
			// the deck runs away through the slides
			const forward = (event) => {
				if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') { return; }
				event.preventDefault();
				window.dispatchEvent(new KeyboardEvent(event.type, { key: event.key, bubbles: true }));
			};
			iframe.contentWindow.addEventListener('keydown', forward);
			iframe.contentWindow.addEventListener('keyup', forward);
		} catch (e) { /* cross-origin: deck nav resumes on focus outside */ }
	});
	window.addEventListener('hashchange', update);
	timer = window.setInterval(update, 500);
	update();
});

onUnmounted(() => {
	window.removeEventListener('hashchange', update);
	if (timer) { window.clearInterval(timer); timer = null; }
	if (iframe) { iframe.remove(); iframe = null; }
});
</script>

<template>
  <div>{{ title }} (mounted on body while this slide is active)</div>
</template>
