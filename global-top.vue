<template>
  <Snowflakes v-if="$nav.currentLayout === 'cover' || $nav.currentLayout === 'end'" />
  <footer
    v-if="$nav.currentLayout !== 'cover' && $nav.currentLayout !== 'end'"
    class="absolute bottom-2 right-4 text-xs opacity-40 select-none pointer-events-none z-50"
  >
    {{ $nav.currentPage }} / {{ $nav.total }}
  </footer>
</template>
