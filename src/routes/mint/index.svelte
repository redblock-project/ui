<script lang="ts">
    import Mint from '$lib/pages/Mint.svelte';
    import { AppStore }  from '$lib/utils/Store'
</script>

<div class:hide={$AppStore.showLoader}>
    <Mint />
</div>

<style>
    .hide {
        display: none;
    }
</style>