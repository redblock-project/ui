<script lang="ts">
    import Wallet from '$lib/pages/Wallet.svelte';
    import { AppStore }  from '$lib/utils/Store'
</script>

<div class="slot" class:hide={$AppStore.showLoader}>
    <Wallet />
</div>

<style>
    .slot {
        overflow: hidden;
    }
    .hide {
        display: none;
    }
</style>