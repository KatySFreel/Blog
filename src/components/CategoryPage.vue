<template>
	<section class="category-page">
		<div class="category-page__wrapper">
			<div class="category-page__title-wrap">
				<h1 class="category-page__title t t--32 f f--6">
					{{ title }}
				</h1>
				<p class="category-page__description">
					{{ description }}
				</p>
			</div>

			<div class="category-page__navigation">
				<UiSearch
					v-model="searchQuery"
					@input="searchPosts"
				/>

				<UiButton
					v-if="canShowMore && !searchQuery"
					type="button"
					theme="stroke"
					:text="`Показать еще ${remainingPostsCount} из ${totalPosts}`"
					@click="showMorePosts"
					is-view
				/>
			</div>
		</div>

		<BlogList
			:posts="paginatedPosts"
			class="category-page__list"
		/>
	</section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import BlogList from "@/components/Blog/BlogList.vue"
import UiButton from "@/Ui/UiButton.vue"
import UiSearch from "@/Ui/UiSearch.vue";
import type { Post } from "@/types/types";

const props = defineProps<{
	title: String,
	description: String
}>()

const posts = ref<Post[]>([])
const searchQuery = ref('')
const visiblePosts = ref(5)
const filteredPosts = ref<Post[]>([])
const totalPosts = ref(0)
const route = useRoute()

const paginatedPosts = computed(() => {
	return filteredPosts.value.slice(0, visiblePosts.value)
})

const canShowMore = computed(() => {
	return visiblePosts.value < filteredPosts.value.length
})

const remainingPostsCount = computed(() => {
	const remaining = filteredPosts.value.length - visiblePosts.value
	return remaining > 5 ? 5 : remaining
})

const fetchPosts = async () => {
	try {
		const response = await axios.get('https://61e90d89e1f16abe.mokky.dev/posts')
		posts.value = response.data
		filterPosts()
	} catch (error) {
		console.log(error)
	}
}

const showMorePosts = () => {
	visiblePosts.value += 5
}

const searchPosts = () => {
	filterPosts()
	visiblePosts.value = 5
}

const filterPosts = () => {
	const category = route.path === '/' ? '' : route.path.substring(1).toLowerCase()
	filteredPosts.value = posts.value.filter(post => {
		const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || post.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
		const matchesCategory = !category || post.category.toLowerCase() === category
		return matchesSearch && matchesCategory
	})
	totalPosts.value = filteredPosts.value.length
}

const handleCategoryChange = (event: CustomEvent) => {
	filterPosts()
	visiblePosts.value = 5
}

watch(() => route.path, () => {
	filterPosts()
	visiblePosts.value = 5
})

watch(searchQuery, (newQuery, oldQuery) => {
	if (newQuery === '') {
		visiblePosts.value = 5
		filterPosts()
	}
})

onMounted(() => {
	fetchPosts()
	window.addEventListener('filter-category', handleCategoryChange as EventListener)
})

onBeforeUnmount(() => {
	window.removeEventListener('filter-category', handleCategoryChange as EventListener)
})
</script>

<style lang="scss">
.category-page__wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 23px;
}

.category-page__title-wrap {
	width: 100%;
	max-width: 472px;
}

.category-page__title {
	margin-bottom: 8px;
}

.category-page__navigation {
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: 12px;
}
</style>
