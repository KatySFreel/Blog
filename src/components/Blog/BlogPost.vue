<template>
	<article
		v-if="post"
		class="blog-post"
	>
		<div class="blog-post__wrapper">
			<div class="blog-post__title-wrap">
				<h1 class="blog-post__title f f--6 t t--32">
					{{ post.title }}
				</h1>

				<button
					:class="['blog-post__btn', isLiked ? 'blog-post__btn--like' : 'blog-post__btn--unlike']"
					@click="toggleLike"
				>
					<UiSvg
						class="blog-post__icon"
						name="like"
					/>
				</button>
			</div>

			<img
				v-if="post.image"
				:src="post.image"
				:alt="post.title"
				class="blog-post__img"
			>

			<p class="blog-post__text">
				{{ post.content }}
			</p>
		</div>
	</article>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { Post } from "@/types/types";
import UiSvg from "@/Ui/UiSvg.vue";

const route = useRoute()
const post = ref<Post | null>(null)
const isLiked = ref(false)

const fetchPost = () => {
	const postId = route.params.id
	axios.get(`https://61e90d89e1f16abe.mokky.dev/posts/${postId}`)
		.then(response => {
			post.value = response.data
			if (localStorage.getItem(`liked_${post.value.id}`)) {
				isLiked.value = true
			}

			if (post.value.likes === null || post.value.likes < 0) {
				post.value.likes = 0
			}
		})
		.catch(error => {
			console.log(error)
		})
}

const toggleLike = async () => {
	if (!post.value) return;

	try {
		if (isLiked.value) {
			if (post.value.likes > 0) {
				post.value.likes--
				isLiked.value = false
				localStorage.removeItem(`liked_${post.value.id}`)
			}
		} else {
			post.value.likes++
			isLiked.value = true
			localStorage.setItem(`liked_${post.value.id}`, 'true')
		}

		await axios.patch(`https://61e90d89e1f16abe.mokky.dev/posts/${post.value.id}`, { likes: post.value.likes })
	} catch (error) {
		console.error("Error updating likes", error)
	}
}

onMounted(fetchPost)
</script>

<style>
.blog-post {
	height: 100vh;
	max-height: calc(100vh - 120px);
}

.blog-post__wrapper {
	padding: 20px 32px;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	border: 1px solid var(--active-secondary-light-color);
	gap: 30px;
	height: 100%;
	overflow-y: auto;
}

.blog-post__title-wrap {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	column-gap: 20px;
}

.blog-post__title {
	width: 100%;
	max-width: 762px;
}

.blog-post__btn {
	flex-shrink: 0;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 100%;
	border: 1px solid var(--active-secondary-light-color);
	color: var(--active-secondary-dark-color);
	width: 40px;
	height: 40px;
	transition: all .3s ease-in-out;

	&:hover {
		color: var(--accent-red-light-color);
	}

	&:focus {
		border: 1px solid var(--active-secondary-dark-color);
	}
}

.blog-post__btn--like {
	color: var(--accent-red-light-color);

	&:hover {
		border: 1px solid var(--active-secondary-light-color);
	}
}

.blog-post__img {
	width: 100%;
	max-width: 700px;
	height: 100%;
	max-height: 500px;
	object-fit: cover;
}
</style>
