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
					class="category-page__search"
					@input="handleSearchInput"
				/>

				<UiButton
					v-if="canShowPrevious"
					type="button"
					theme="stroke"
					icon="btn"
					icon-position="left"
					:text="`Показать предыдущие ${previousPostsCount}`"
					is-view
					class="category-page__btn"
					@click="showPreviousPosts"
				/>

				<UiButton
					v-if="canShowMore"
					type="button"
					theme="stroke"
					:text="`Показать еще ${remainingPostsCount} из ${totalPosts}`"
					is-view
					class="category-page__btn"
					@click="showMorePosts"
				/>
			</div>
		</div>

		<BlogList
			v-if="posts.length"
			:posts="posts"
			class="category-page__list"
		/>

		<UiLoader v-else />
	</section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPosts, searchPosts as apiSearchPosts } from '@/api'
import BlogList from "@/components/Blog/BlogList.vue"
import UiButton from "@/Ui/UiButton.vue"
import UiSearch from "@/Ui/UiSearch.vue"
import type { Post } from "@/types/types"
import UiLoader from "@/Ui/UiLoader.vue";

const props = defineProps<{
	title: String,
	description: String
}>()

const posts = ref<Post[]>([])
const searchQuery = ref('')
const visiblePosts = ref(5)
const totalPosts = ref(0)
const route = useRoute()
const currentPage = ref(1)

const canShowMore = computed(() => currentPage.value * visiblePosts.value < totalPosts.value)

const remainingPostsCount = computed(() => Math.min(5, totalPosts.value - currentPage.value * visiblePosts.value))

const canShowPrevious = computed(() => currentPage.value > 1)

const previousPostsCount = computed(() => visiblePosts.value)

const loadPosts = async (search = '', page = 1)  => {
	const category = routeCategory()
	if (search) {
		const { posts: fetchedPosts, totalPosts: fetchedTotal } = await apiSearchPosts(search, visiblePosts.value, page, ['-date', `-likes`])
		posts.value = fetchedPosts
		totalPosts.value = fetchedTotal
	} else {
		const { posts: fetchedPosts, totalPosts: fetchedTotal } = await fetchPosts(visiblePosts.value, page, category, ['-date', `-likes`])
		posts.value = fetchedPosts
		totalPosts.value = fetchedTotal
	}
	currentPage.value = page
}

const showMorePosts = async () => {
	await loadPosts(searchQuery.value, currentPage.value + 1)
}

const showPreviousPosts = async () => {
	if (currentPage.value > 1) {
		await loadPosts(searchQuery.value, currentPage.value - 1)
	}
}

const searchPosts = async () => {
	await loadPosts(searchQuery.value)
}

const handleSearchInput = (searchValue: string) => {
	searchQuery.value = searchValue
	searchPosts()
}

const routeCategory = () => route.path === '/' ? '*' : route.path.substring(1).toLowerCase()

watch(() => route.path, () => {
	loadPosts(searchQuery.value)
})

onMounted(() => loadPosts(searchQuery.value))
</script>

<style lang="scss">
.category-page__wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 23px;
	column-gap: 20px;
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
