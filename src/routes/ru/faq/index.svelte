<script lang="ts">
     import Faq from '$lib/pages/Faq.svelte';
    import { AppStore }  from '$lib/utils/Store'
</script>

<div class:hide={$AppStore.showLoader}>
    <Faq />
</div>

<style>
    .hide {
        display: none;
    }
</style>