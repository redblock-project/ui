<script lang="ts">
    import Wallet from '$lib/pages/Wallet.svelte';
    import { AppStore }  from '$lib/utils/Store'
</script>

<div class:hide={$AppStore.showLoader}>
    <Wallet />
</div>

<style>
    .hide {
        display: none;
    }
</style>