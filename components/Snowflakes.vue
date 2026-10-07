<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let snowflakes = null

onMounted(async () => {
	const mod = await import('magic-snowflakes')
	const Snowflakes = mod.default
	snowflakes = new Snowflakes({
		color : '#ffffff',
		count : 80,
		speed : 0.5,
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
