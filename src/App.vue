<template>
	<div
		id="app"
		class="index"
		ref="app"
	>
		<UiHeader class="index__header"/>

		<main class="index__main">
			<div class="container">
				<router-view />
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import UiHeader from './Ui/UiHeader.vue'

const app = ref(null)

const animateEnter = () => {
	if (app.value) {
		gsap.fromTo(app.value,
			{ opacity: 0, y: 60 },
			{ opacity: 1, y: 0, duration: 1 }
		)
	}
}

onMounted(() => {
	animateEnter()
})
</script>

<style lang="scss">
.index {
	height: 100vh;
	padding-top: 24px;
}

.index__header {
	margin-bottom: 25px;
}
</style>
