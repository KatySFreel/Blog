<template>
	<router-link
		:class="['blog-card', hasImage ? 'blog-card--with-image' : 'blog-card--no-image']"
		:style="backgroundStyle"
		:to="`/post/${post.id}`"
	>
		<div class="blog-card__tags">
			<span
				v-for="tag in tags"
				:key="tag"
				class="blog-card__tag"
			>
				{{ tag }}
			</span>
		</div>

		<div
			v-if="hasImage"
			class="blog-card__img"
		>
			<img
				:src="post.image"
				:alt="post.title"
			>
		</div>

		<div class="blog-card__content">
			<span
				class="blog-card__info t t--12"
				:style="backgroundStyle"
			>
				{{ post.author + ' | ' + formatDate(post.date)}}
			</span>

			<h2 class="blog-card__title f f--6 t t--20">
				{{ post.title }}
			</h2>

			<p>
				{{ post.summary }}
			</p>
		</div>

		<UiSvg
			v-if="svgIcon"
			:class="['blog-card__icon', svgIconClass]"
			:name="svgIcon"
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
		svg: 'stars',
		svgClass: 'blog-card__icon--stars'
	},
	{
		background: 'var(--accent-blue-light-color)',
		text: 'var(--active-dark-color)',
		svg: null,
		svgClass: ''
	},
	{
		background: 'var(--accent-blue-dark-color)',
		text: 'var(--active-light-color)',
		svg: 'lines',
		svgClass: 'blog-card__icon--lines'
	},
	{
		background: 'var(--accent-green-light-color)',
		text: 'var(--active-dark-color)',
		svg: 'lines',
		svgClass: 'blog-card__icon--lines'
	},
	{
		background: 'var(--accent-green-dark-color)',
		text: 'var(--active-dark-color)',
		svg: null,
		svgClass: ''
	},
	{
		background: 'var(--accent-red-light-color)',
		text: 'var(--active-dark-color)',
		svg: 'stars',
		svgClass: 'blog-card__icon--stars'
	},
	{
		background: 'var(--accent-peach-color)',
		text: 'var(--active-dark-color)',
		svg: null,
		svgClass: ''
	},
	{
		background: 'var(--accent-pink-light-color)',
		text: 'var(--active-dark-color)',
		svg: 'lines',
		svgClass: 'blog-card__icon--lines'
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

const categoryNames = {
	'it': 'IT-темы',
	'management': 'Тайм-менеджмент',
	'design': 'Дизайн'
}

const tags = computed(() => {
	const categoryTag = categoryNames[props.post.category.toLowerCase()] || props.post.category;
	return props.post.likes > 1 ? ['Популярное', categoryTag] : [categoryTag];
})

const svgIcon = computed(() => {
	if (hasImage.value) {
		return null
	} else {
		const styleIndex = props.post.id % styles.length
		return styles[styleIndex].svg
	}
})

const svgIconClass = computed(() => {
	if (hasImage.value) {
		return ''
	} else {
		const styleIndex = props.post.id % styles.length
		return styles[styleIndex].svgClass
	}
})

const formatDate = (dateString: string): string => {
	const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
	return new Date(dateString).toLocaleDateString('ru-RU', options)
}
</script>

<style lang="scss">
.blog-card {
	width: 100%;
	height: 100%;
	border-radius: 20px;
	position: relative;
	color: var(--active-dark-color);
	transition: transform .3s ease-in-out;
	will-change: transform;

	&:hover,
	&:focus-within {
		transform: scale(1.01);
		outline: none;
	}

	&--with-image {
		background-color: var(--active-light-color);
		display: flex;
		flex-direction: column;
		gap: 8px;

		.blog-card__tags {
			top: 8px;
		}
	}

	&--no-image {
		padding: 16px;

		.blog-card__tags {
			bottom: 8px;
		}
	}
}

.blog-card__tags {
	position: absolute;
	left: 8px;
	display: flex;
	align-items: center;
	column-gap: 8px;
}

.blog-card__tag {
	background-color: var(--active-light-color);
	color: var(--active-dark-color);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4px 8px;
	border-radius: 500px;
}

.blog-card__img {
	overflow: hidden;
	border-radius: 20px;
}

.blog-card__content {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.blog-card__info {
	color: var(--active-dark-color);
	opacity: .5;
}

.blog-card__icon {
	position: absolute;
	color: var(--active-light-color);
	opacity: .5;
	z-index: -1;

	&--stars {
		width: 579.573px;
		height: 238.746px;
		transform: rotate(9.221deg);
	}

	&--lines {
		width: 482.309px;
		height: 171.753px;
		bottom: -25px;
		left: 107px;
	}
}
</style>
