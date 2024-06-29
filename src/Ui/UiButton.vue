<template>
	<button
		v-if="props.type === 'button' && props.isView"
		type="button"
		:class="[
      'ui-button f f--5 t t--14',
      `ui-button--${props.theme}`,
      { 'ui-button--icon' : props.iconPosition },
      props.iconPosition ? `ui-button--icon-${props.iconPosition}` : ''
    ]"
		@click="$emit('click', $event)"
	>
		{{ props.text }}

		<div
			v-if="props.icon"
			class="ui-button__icon-wrap"
		>
			<UiSvg
				:name="props.icon"
				class="ui-button__icon"
			/>
		</div>
	</button>

	<a
		v-if="props.type === 'link' && props.isView"
		:href="`/${props.link}`"
		:class="[
      'ui-button f f--5 t t--14',
      `ui-button--${props.theme}`,
      { 'ui-button--icon' : props.iconPosition },
      props.iconPosition ? `ui-button--icon-${props.iconPosition}` : ''
    ]"
	>
		{{ props.text }}

		<div
			v-if="props.icon"
			class="ui-button__icon-wrap"
		>
			<UiSvg
				:name="props.icon"
				class="ui-button__icon"
			/>
		</div>
	</a>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiSvg from '@/Ui/UiSvg.vue'

const props = defineProps<{
	text: string
	type: 'button' | 'link'
	theme?: string
	iconPosition?: string | null
	link?: string | null
	icon?: string | null
	isView: boolean
}>()

const emit = defineEmits(['click'])
</script>

<style lang="scss">
  .ui-button {
    display: inline-flex;
    align-items: center;
	  background-color: transparent;
    justify-content: space-between;
    column-gap: 8px;
    border-radius: 500px;
	  padding: 12px;
    border: 1px solid transparent;
	  cursor: pointer;
    transition: all .3s ease-in-out;

    &--secondary {
      background-color: var(--active-secondary-light-color);

      &:hover {
        background: none;
        border: 1px solid var(--active-secondary-light-color);
      }
    }

    &--stroke {
      border: 1px solid var(--active-secondary-dark-color);

      &:hover {
        background-color: var(--active-secondary-dark-color);
      }
    }

	  &--icon {
		  padding: 0;

		  &-left {
			  flex-direction: row-reverse;
			  padding-right: 12px;
		  }

		  &-right {
			  padding-left: 12px;
		  }
	  }
  }

  .ui-button__icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: var(--main-color);
    color: var(--main-color-invert);
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  flex-shrink: 0;
  }
</style>
