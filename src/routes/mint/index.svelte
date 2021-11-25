<script lang="ts">
    import Mint from '$lib/pages/Mint.svelte';
    import { AppStore }  from '$lib/utils/Store'
</script>

<div class="slot" class:hide={$AppStore.showLoader}>
    <Mint />
</div>

<style>
    .slot {
        overflow: hidden;
    }
    .hide {
        display: none;
    }
</style>