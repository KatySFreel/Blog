<template>
	<section class="blog-list">
		<transition-group
			name="list"
			tag="div"
			class="blog-list__container"
		>
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
		</transition-group>
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
.blog-list__container {
	display: grid;
	grid-template-columns: repeat(11, 1fr);
	grid-auto-columns: 1fr;
	grid-auto-rows: 1fr;
	gap: 20px;
	height: calc(100vh - 72px - 25px - 24px - 95px - 23px);
}

.blog-list__item {
	background: #f9f9f9;
	border-radius: 8px;
	overflow: hidden;
	transition: transform 0.3s ease;
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
