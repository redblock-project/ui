<script>
    import { AppStore } from "$lib/utils/Store";
    import { fade } from 'svelte/transition';

    const close = () => {
        $AppStore.showModal = false;
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
            <h6>COMING SOON</h6>
        </div>
    </div>
{/if}

<style>
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
    }
    .close {
        position: absolute;
        right: -16px;
        top: -16px;
        cursor: pointer;
    }
    h6 {
        font-family: "Rubik";
        font-style: normal;
        font-weight: 900;
        font-size: min(1.875vw, 36px);
        letter-spacing: 0.24em;
        margin: 64px 0 64px 0;
        color: #181818;
    }
    @media screen and (max-width: 640px) {
        h6 {
            font-size: 5.625vw;
            line-height: 6.71875vw;
            text-align: center;
        }
    }
</style>