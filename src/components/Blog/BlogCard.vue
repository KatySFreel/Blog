<template>
	<router-link
		:class="['blog-card', hasImage ? 'with-image' : 'no-image']"
		:style="backgroundStyle"
		:to="`/post/${post.id}`"
	>
		<div
			v-if="hasImage"
			class="blog-card__img"
		>
			<img :src="post.image" alt="Post image">
		</div>
		<div class="content">
			<h2 class="blog-card__title">{{ post.title }}</h2>
			<p>{{ post.summary }}</p>
		</div>

		<UiSvg
			v-if="backgroundSvg"
			class="svg-container"
			:name="backgroundSvg"
		/>
	</router-link>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { defineProps } from 'vue'
import type { Post } from "@/types/types"
import UiSvg from "@/Ui/UiSvg.vue"

const props = defineProps<{
	post: Post
}>()

const styles = [
	{
		background: 'var(--accent-yellow-color)',
		text: 'var(--active-dark-color)',
		svg: null
	},
	{
		background: 'var(--accent-blue-light-color)',
		text: 'var(--active-dark-color)',
		svg: null
	},
	{
		background: 'var(--accent-blue-dark-color)',
		text: 'var(--active-light-color)',
		svg: null
	},
	{
		background: 'var(--accent-green-light-color)',
		text: 'var(--active-dark-color)',
		svg: null
	},
	{
		background: 'var(--accent-green-dark-color)',
		text: 'var(--active-dark-color)',
		svg: null
	},
	{
		background: 'var(--accent-red-light-color)',
		text: 'var(--active-dark-color)',
		svg: null
	},
	{
		background: 'var(--accent-peach-color)',
		text: 'var(--active-dark-color)',
		svg: null
	},
	{

		background: 'var(--accent-pink-light-color)',
		text: 'var(--active-dark-color)',
		svg: null
	}
]

const hasImage = computed(() => !!props.post.image)
const backgroundStyle = computed(() => {
	if (hasImage.value) {
		return ''
	} else {
		const colorIndex = props.post.id % styles.length
		return { backgroundColor: styles[colorIndex].background, color: styles[colorIndex].text }
	}
})


const backgroundSvg = computed(() => {
	if (hasImage.value) {
		return null
	} else {
		const styleIndex = props.post.id % styles.length
		return styles[styleIndex].svg
	}
})
</script>

<style lang="scss">
.blog-card {
	width: 100%;
	height: 100%;
}


///////////////////////////////////////

.with-image .image-container {
	height: 150px;
	overflow: hidden;
}

.with-image img {
	width: 100%;
	height: auto;
	object-fit: cover;
}

.no-image {
	padding: 16px;
}
</style>
