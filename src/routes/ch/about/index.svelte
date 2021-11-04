<script lang="ts">
    import About from '$lib/pages/About.svelte';
    import { AppStore }  from '$lib/utils/Store'
</script>

<div class:hide={$AppStore.showLoader}>
    <About />
</div>

<style>
    .hide {
        display: none;
    }
</style>