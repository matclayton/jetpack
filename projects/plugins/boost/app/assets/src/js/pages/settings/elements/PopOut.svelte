<!--
	This component pops out and shows a message based on the props passed to it
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { __ } from '@wordpress/i18n/';
	import CloseButton from '../../../elements/CloseButton.svelte';
	import { dismissedPopOuts } from '../../../stores/config';
	import slideRightTransition from '../../../utils/slide-right-transition';

	export let id = '';
	export let title = '';
	export let message = '';
	export let ctaLink = '';
	export let cta = '';

	const dispatch = createEventDispatcher();

	async function disablePrompt() {
		await dismissedPopOuts.dismiss( id );
		dispatch( 'dismiss' );
	}
</script>

{#if ! $dismissedPopOuts.includes( id )}
	<div class="jb-rating-card__wrapper">
		<div class="jb-rating-card" transition:slideRightTransition>
			<CloseButton on:click={() => dispatch( 'dismiss' )} />
			<h3 class="jb-rating-card__headline">
				{title}
			</h3>
			<p class="jb-rating-card__paragraph">
				{message}
			</p>
			<a
				class="jb-button--primary"
				href={ctaLink}
				target="_blank"
				on:click={() => {
					disablePrompt();
				}}
			>
				{cta}
			</a>

			<a
				class="jb-link"
				href={ctaLink}
				target="_blank"
				on:click|preventDefault={() => {
					disablePrompt();
				}}
			>
				{__( 'Do not show me again', 'jetpack-boost' )}
			</a>
		</div>
	</div>
{/if}
