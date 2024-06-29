<template>
	<div
		class="ui-search"
		:class="{ active: isActive || inputValue }"
	>
		<UiSvg
			name="search"
			class="ui-search__icon ui-search__icon-search"
		/>
		<input
			type="text"
			v-model="inputValue"
			placeholder="Поиск"
			class="ui-search__input"
			@input="onInput"
			@focus="isActive = true"
			@blur="onBlur"
			@click.stop
		/>
		<button
			v-if="inputValue"
			type="button"
			class="ui-search__icon ui-search__icon--clear"
			@click.stop="clearSearch"
		>
			<UiSvg name="close" />
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import UiSvg from './UiSvg.vue'

const emit = defineEmits(['input'])

const isActive = ref(false)
const inputValue = ref('')

const onInput = () => {
	emit('input', inputValue.value)
}

const clearSearch = () => {
	isActive.value = false
	inputValue.value = ''
	emit('input', inputValue.value)
}

const onBlur = () => {
	if (!inputValue.value) {
		isActive.value = false
	}
}
</script>

<style lang="scss">
.ui-search {
	border: 1px solid var(--active-secondary-dark-color);
	border-radius: 500px;
	width: fit-content;
	min-width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	position: relative;
	cursor: pointer;
	transition: all .3s ease-in-out;

	&.active,
	&:focus-within,
	&:hover {
		padding: 12px 42px 12px 42px;
		cursor: default;

		.ui-search__icon {
			left: 12px;
			transform: translate(0, -50%);

			&--clear {
				left: inherit;
				right: 12px;
				cursor: pointer;
			}
		}

		.ui-search__input {
			width: 150px;
			opacity: 1;
		}
	}
}

.ui-search__icon {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: var(--active-secondary-dark-color);
	transition: all .3s ease-in-out;

	&--clear {
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover,
		&:focus {
			outline: none;
			color: var(--active-secondary-light-color);
		}
	}
}

.ui-search__input {
	border: none;
	background-color: transparent;
	opacity: 0;
	width: 0;
	transition: all .3s ease-in-out;

	&:focus {
		outline: none;
	}
}
</style>
