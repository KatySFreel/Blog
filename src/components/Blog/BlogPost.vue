<template>
	<article
		v-if="post"
		class="blog-post"
	>
		<h3 class="blog-post__title f f--6 t t--32">
			{{ post.title }}
		</h3>

		<p class="blog-post__text">
			{{ post.content }}
		</p>

		<div class="likes">
			<button @click="toggleLike">
				{{ post.likes }} {{ isLiked ? '❤️' : '♡' }}
			</button>
		</div>
	</article>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { Post } from "@/types/types";

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
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 8px;
	background: #f9f9f9;
}

.likes {
	margin-top: 20px;
}

.likes button {
	background: none;
	border: none;
	cursor: pointer;
	font-size: 16px;
}
</style>
