<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let snowflakes = null

onMounted(async () => {
	const mod = await import('magic-snowflakes')
	const Snowflakes = mod.default
	// Mount inside the end slide's layout instead of <body>: on <body> the
	// flakes sit in the root stacking context above the whole slide tree,
	// and no in-slide z-index can beat them. Inside the layout, CSS lifts
	// the slide content above the flakes (see .slidev-layout.end rules in
	// styles/index.css), so the flakes fly behind the QR code. Layouts are
	// async components — wait for this one to appear.
	let container = null
	for (let i = 0; i < 40 && !container; i++) {
		container = document.querySelector('.slidev-layout.end')
		if (!container) await new Promise((r) => setTimeout(r, 50))
	}
	snowflakes = new Snowflakes({
		color : '#ffffff',
		count : 80,
		speed : 0.5,
		zIndex : 0,
		...(container ? { container } : {}),
	})
	snowflakes.start()
})

onBeforeUnmount(() => {
	if (snowflakes) {
		snowflakes.stop()
		snowflakes.destroy()
		snowflakes = null
	}
})
</script>

<template>
  <div class="snowflakes-anchor" />
</template>
