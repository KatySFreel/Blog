<template>
	<header class="ui-header">
		<div class="container">
			<div class="ui-header__wrapper">
				<router-link
					to="/"
					class="ui-header__logo"
				>
					<UiSvg
						name="logo"
						class="ui-header__logo-icon"
					/>
				</router-link>

				<nav class="ui-header__nav">
					<router-link
						v-for="(item, i) in categories"
						:key="i"
						:to="`/${item.name}`"
						exact-active-class="active"
						class="ui-header__link"
						@click.native="filterCategory(item.name)"
					>
						{{ item.title }}
					</router-link>
				</nav>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import {ref} from "vue"
import UiSvg from "@/Ui/UiSvg.vue"
import type { Category } from "@/types/types";

const categories = ref<Category[]>([])

categories.value = [
	{
		name: '',
		title: 'Популярное'
	},
	{
		name: 'it',
		title: 'IT-темы'
	},
	{
		name: 'management',
		title: 'Тайм-менеджмент'
	},
	{
		name: 'design',
		title: 'Дизайн'
	}
]

const filterCategory = (category: string) => {
	const event = new CustomEvent('filter-category', { detail: category.toLowerCase() })
	window.dispatchEvent(event)
}
</script>

<style lang="scss">
	.ui-header {
		width: 100%;
	}

	.ui-header__wrapper {
		display: flex;
		align-items: center;
	}

	.ui-header__logo {
		margin-right: 25px;
		color: var(--main-color);
	}

	.ui-header__nav {
		display: flex;
		align-items: center;
		column-gap: 8px;
		background-color: var(--active-secondary-light-color);
		padding: 4px;
		border-radius: 500px;
	}

	.ui-header__link {
		text-decoration: none;
		padding: 8px;
		background-color: var(--active-light-color);
		color: var(--active-dark-color);
		border-radius: 500px;
		cursor: pointer;
		transition: background-color .3s ease-in-out, color .3s ease-in-out;

		&.active,
		&:hover.active{
			background-color: var(--active-dark-color);
			color: var(--active-light-color);
			cursor: default;
		}

		&:hover {
			background-color: var(--active-secondary-dark-color);
		}
	}
</style>
