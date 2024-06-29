<template>
	<section class="blog-list">
		<div class="blog-list__container">
			<div
				v-for="post in posts"
				:key="post.id"
				class="blog-list__item"
			>
				<BlogCard
					:post="post"
					class="blog-list__card"
				/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Post } from "@/types/types"
import BlogCard from "@/components/Blog/BlogCard.vue"

const props = defineProps<{
	posts: Post[]
}>()
</script>

<style lang="scss">
.blog-list {
	height: 100vh;
	max-height: calc(100vh - 230px);
	transition: all .3s ease-in-out;
}

.blog-list__container {
	display: grid;
	grid-template-columns: repeat(11, 1fr);
	grid-auto-rows: 1fr;
	gap: 20px;
	height: 100%;
}

.blog-list__item {
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&:first-child {
		grid-column: 1/5;
		grid-row: 1/4;
	}

	&:nth-child(2) {
		grid-column: 5/10;
		grid-row: 1/3;
	}

	&:nth-child(3) {
		grid-column: 10/12;
		grid-row: 1/3;
	}

	&:nth-child(4) {
		grid-column: 5/9;
		grid-row: 3/4;
	}

	&:nth-child(5) {
		grid-column: 9/12;
		grid-row: 3/4;
	}
}
</style>
