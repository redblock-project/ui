<script>
    import { AppStore, MintStore } from "$lib/utils/Store";
    import { fade } from 'svelte/transition';
    import ComingSoon from '$lib/components/Modal/ComingSoon.svelte';
    import MetamaskNotFound from '$lib/components/Modal/MetamaskNotFound.svelte';
    import MetamaskDisconnected from '$lib/components/Modal/MetamaskDisconnected.svelte';
    import Error from '$lib/components/Modal/Error.svelte';
    import { WalletStatus } from "$lib/utils/wallet";

    const close = () => {
        $AppStore.showModal = false;
    }

    $: {
        console.log($AppStore.someError)
        console.log($AppStore.walletStatus)
    }
</script>

{#if $AppStore.showModal}
    <div class="backdrop" transition:fade={{ duration: 100 }} on:click|self={close}>
        <div class="modal">
            <div class="close" on:click={close}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="28.4443" width="5.02831" height="40.2265" transform="rotate(45 28.4443 0)" fill="#E01828"/>
                    <rect y="3.55566" width="5.02831" height="40.2265" transform="rotate(-45 0 3.55566)" fill="#E01828"/>
                </svg>                    
            </div>
            <div class="modal_content">
                {#if $AppStore.someError}
                    <Error err="{$AppStore.err}"  />
                {:else}
                    {#if WalletStatus.notFound === $AppStore.walletStatus}
                        <MetamaskNotFound />
                    {:else}
                        {#if 'mint' === $AppStore.contract && $MintStore.mintStarted}
                            {#if WalletStatus.disconnected === $AppStore.walletStatus}
                                <MetamaskDisconnected />
                            {/if}
                        {:else}
                            <ComingSoon />
                        {/if}
                    {/if}
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    .modal_content {
        padding: 64px 64px 16px 64px;
        word-wrap: break-word;
        overflow-wrap: anywhere;
    }
    .backdrop {
        top: 0;
        left: 0;
        z-index: 9999999999999999999;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background:rgba(24, 24, 24, 0.8);
        mix-blend-mode: normal;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .modal {
        max-width: 800px;
        background: url(/img/modal.png);
        background-size: 100% 100%;
        position: absolute;
        text-align: center;
        width: 90%;
        word-wrap: break-word;
        overflow-wrap: anywhere;
    }
    .close {
        position: absolute;
        right: -16px;
        top: -16px;
        cursor: pointer;
    }
</style>