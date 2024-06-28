<template>
	<div
		id="app"
		class="index"
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
import UiHeader from './Ui/UiHeader.vue'
</script>

<style lang="scss">
	.index {
		height: 100vh;
	}

	.index__header {
		margin-top: 24px;
		margin-bottom: 25px;
	}
</style>
