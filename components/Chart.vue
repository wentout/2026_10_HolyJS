<script setup>
import { onMounted, ref } from 'vue';
import tree from './Chart/tree';
import pie from './Chart/pie';

// d3 chart wrapper. Usage in a slide:
//   <Chart type="tree" :data="{ name: 'User', children: [...] }"
//     :opts="{ dy: 20, dx: 59, width: 320, margin: {...} }" />
// `data` is a d3.hierarchy-shaped object ({ name, children }).
const props = defineProps({
	type : { type : String, default : 'tree' },
	data : { type : Object, required : true },
	opts : { type : Object, default : () => ({}) },
});

const charts = { tree, pie };

const chartRoot = ref(null);

onMounted(() => {
	const svg = charts[props.type]({ chartData : props.data, ...props.opts });
	chartRoot.value.append(svg);
});
</script>

<template>
  <div ref="chartRoot" class="chart-root" />
</template>

<style scoped>
.chart-root svg {
	display: block;
	width: 100%;
	height: auto;
}
</style>
