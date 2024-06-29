<template>
	<div
		class="post-page"
		ref="postPage"
	>
		<div class="blog-page__wrapper">
			<UiButton
				is-view
				text="На главную"
				icon="btn"
				icon-position="left"
				type="link"
				link=""
				theme="stroke"
				class="blog-page__btn"
			/>

			<section class="blog-page__content">
				<BlogPost />
			</section>

			<nav class="blog-post__nav">
				Контент
			</nav>
		</div>
	</div>
</template>

<script setup>
import BlogPost from "@/components/Blog/BlogPost.vue";
import UiButton from "@/Ui/UiButton.vue";
import { gsap } from 'gsap'
import { onMounted, ref } from "vue";

const postPage = ref(null)

const animateEnter = () => {
	if (postPage.value) {
		gsap.fromTo(postPage.value,
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
.blog-page__wrapper {
	display: grid;
	grid-template-columns: 1fr 275px;
	grid-template-rows: auto 1fr;
	grid-gap: 20px;

	.ui-button {
		grid-row: 1/2;
		width: max-content;
	}
}

.blog-page__content {
	grid-column: 1/2;
	grid-row: 2/4;
}

.blog-post__nav {
	grid-column: 2/3;
	grid-row: 2/4;
}
</style>
