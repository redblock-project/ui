<script lang="ts">
    import Pyatiletka from '$lib/pages/Pyatiletka.svelte';
    import { AppStore }  from '$lib/utils/Store'
</script>

<div class:hide={$AppStore.showLoader}>
    <Pyatiletka />
</div>

<style>
    .hide {
        display: none;
    }
</style>