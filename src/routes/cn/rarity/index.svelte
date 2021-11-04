<script lang="ts">
    import Rarity from '$lib/pages/Rarity.svelte';
    import { AppStore }  from '$lib/utils/Store'
</script>

<div class:hide={$AppStore.showLoader}>
    <Rarity />
</div>

<style>
    .hide {
        display: none;
    }
</style>