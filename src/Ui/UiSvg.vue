<template>
	<Component :is="name" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
	name: {
		type: String,
		required: true
	}
})

const name = defineAsyncComponent(() => import(`../assets/svg/${props.name}.svg`))
</script>
