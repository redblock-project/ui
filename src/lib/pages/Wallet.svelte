<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { AppStore } from "$lib/utils/Store";
    import messages from "$lib/_locales/messages.json";
    import { fly } from "svelte/transition";
    import Loader from "$lib/components/Loader.svelte";
    import { connectWallet, WalletStatus } from "$lib/utils/wallet";
    import { walletConsole } from "$lib/utils/MintConsole/WalletConsole";

    let value = "0", redblocks = [], showLoader = true, wasLoaded = false, nftToShow = null, srcList = {}, nameList = {}, currentIndex;
    onMount(async () => {

    });

    const init = async () => {
        showLoader = true;
        try {
            await walletConsole.init(window);
            redblocks = await walletConsole.getNftList($AppStore.walletAddress);
        } catch (e) {
            console.log(e);
        }
        showLoader = false;
    }

    $: {
        if (0 < $AppStore.walletAddress.length) {
            init();
        }
    }

    const selectNft = (nft, i) => {
        nftToShow = nft;
        currentIndex = i;
        
        document.querySelector('#ussr').scrollIntoView({
            behavior: 'smooth'
        });
    };

    const back = () => {
        nftToShow = null;
        document.querySelector('#ussr').scrollIntoView({
            behavior: 'smooth'
        });
    };
    let directionX = 200; 

    const left = () => {
        directionX = 200;
        currentIndex--;
        if (0 > currentIndex)
            currentIndex = redblocks.length - 1;
        nftToShow = redblocks[currentIndex];
    };

    const right = () => {
        directionX = -200;
        currentIndex++;
        if (redblocks.length === currentIndex)
            currentIndex = 0;
        nftToShow = redblocks[currentIndex];
    };

    const makeConnect = async () => {
        showLoader = true;
        await connectWallet(window);
        showLoader = false;
    }
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].wallet_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
        <div class="wallet">
            <div class="text-block" id="ussr">
                {#if null === nftToShow}
                    <h2 class="default-h2">{messages[$AppStore.lang].wallet_header}</h2>
                {:else}
                    <h2 class="default-h2">ID: {nftToShow.id}</h2>
                {/if}
                {#if WalletStatus.connected === $AppStore.walletStatus}
                    <div class="token_block">
                        <div class="token_title">U$$R BALANCE</div>
                        <div class="token_value">{value} <img src="/img/logo2.png" alt="" /></div>
                    </div>
                {/if}
            </div>
            <div class="content-block">
                {#if WalletStatus.connected === $AppStore.walletStatus}
                    {#if showLoader}
                        <h5>{messages[$AppStore.lang].loading}</h5>
                        <Loader />
                    {:else}
                        {#if null !== nftToShow }
                            <div class="item">
                                <div class="left" class:disabled={1 === redblocks.length } on:click={left}>
                                    <div class="arr"></div>
                                </div>
                                {#each [redblocks[currentIndex]] as nft (currentIndex)}
                                    <div class="img">
                                        <div class="close" on:click={back}>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="28.4443" width="5.02831" height="40.2265" transform="rotate(45 28.4443 0)" fill="#E01828"/>
                                                <rect y="3.55566" width="5.02831" height="40.2265" transform="rotate(-45 0 3.55566)" fill="#E01828"/>
                                            </svg>                    
                                        </div>
                                        
                                        <img src={nft.src} alt="Reblock comrade {nft.id}" in:fly={{ x: directionX, duration: 512 }}  />
                                    </div>
                                {/each}
                                <!-- {#key nftToShow.id}
                                    <img src={srcList[nftToShow.id]} alt="Reblock comrade {nftToShow.id}" in:fly|local={{ x: 200, duration: 256 }} out:fly|local={{ x: -200, duration: 256 }} animate:flip="{{duration: 256}}" />
                                {/key} -->
                                <div class="right" class:disabled={1 === redblocks.length }  on:click="{right}">
                                    <div class="arr"></div>
                                </div>
                            </div>
                        {:else}
                            <div class="gallery">
                                {#each redblocks as nft, i }
                                    <div class="box">
                                        <div class="border" on:click={ () => { selectNft(nft, i)} }>
                                            <img src="{nft.src}" id="nft_{nft.id}" alt="Reblock comrade {nft.id}" />
                                        </div>
                                        <span>
                                            ID: {nft.id}
                                            <a href="https://opensea.io/assets/0xe4ed29f64b45a2c01f63b537a2c05ff57f81099c/{nft.id}" target="_blank" title="See on Opensea">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                            </a>
                                        </span>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    {/if}
                {:else}
                    <div class="default-button" on:click={makeConnect}>
                        <span>{messages[$AppStore.lang].mint_connect}</span>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</main>
<h2 class="second-title d-mb">Октябрьская революция</h2>

<style>
    .left.disabled, .right.disabled {
        cursor: default;
    }
    .left.disabled .arr {
        background: url('/img/arrowg.png') !important;
        transform: rotate(0deg);
    }
    .right.disabled .arr {
        background: url('/img/arrowg.png') !important;
        transform: rotate(180deg);
    }
    .left .arr {
        width: 72px;
        height: 16px;
        background: url('/img/arrowb.png');
        transform: rotate(180deg);
    }
    .right .arr {
        width: 72px;
        height: 16px;
        background: url('/img/arrowb.png');
    }
    .arr:hover {
        background: url('/img/arrowr.png');
    }
    .img {
        position: relative;
    }
    .close {
        position: absolute;
        top: -10px;
        right: -10px;
        cursor: pointer;
        z-index: 999;
    }


    .default-button {
        text-decoration: none;
        width: 100%;
        max-width: 13.3333333333vw;
        height: 4.1666666667vw;
        position: relative;
        z-index: 20;
        cursor: pointer;
        transition: transform 0.1;
        margin: 64px auto;
    }

    .default-button span:hover {
        background: linear-gradient(180deg, #d81828, #ac1020);
    }
    .default-button:active {
        transform: scale(0.95);
    }
    .default-button::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: -0.4166666667vw;
        right: -0.4166666667vw;
        background: #f85060;
        z-index: -1;
    }
    .default-button span {
        width: 100%;
        max-width: 100%;
        height: 100%;
        font-family: "Rubik";
        font-weight: 900;
        font-size: 1.25vw;
        line-height: 1.4583333333vw;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #ffffff;
        background: #e01828;
    }
    .default-button span::before {
        position: absolute;
        width: 0;
        height: 0;
        right: -0.4166666667vw;
        top: 0;
        border-bottom: 0.4166666667vw solid #f85060;
        border-right: 0.4166666667vw solid transparent;
        content: "";
        display: block;
    }
    .default-button span::after {
        position: absolute;
        width: 0;
        height: 0;
        left: 0;
        bottom: -0.4166666667vw;
        border-top: 0.4166666667vw solid #f85060;
        border-left: 0.4166666667vw solid transparent;
        content: "";
        display: block;
    }

    .show {
        visibility: visible !important;
    }
    .left {
        cursor: pointer;
    }
    .right {
        cursor: pointer;
        display: flex;
        flex-direction: column;
    }
    .right img {
        margin: 24px;
    }
    .back {
        font-family: "Roboto Slab";
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        text-decoration-line: underline;
        color: #181818;
        cursor: pointer;
        box-sizing: border-box;
        position: relative;
        padding-left: 24px;
        display: inline-block;
        top: -24px;
        z-index: 100;
    }
    .back::before {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 8px 16px 8px 0;
        position: absolute;
        top: 5px;
        left: 0;
        border-color: transparent #e01828 transparent transparent;
    }
    .content-block {
        margin-bottom: 256px;
        margin-top: 54px;
    }
    .box {
        display: flex;
        flex-direction: column;
        margin: 32px;
        align-items: center;
    }
    .box span {
        font-family: "Roboto Slab";
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        display: inline-block;
        color: #181818;
        margin-top: 8px;
        width: 133px;
        text-align: center;
    }
    .box span a {
        display: inline;
    }
    .box span a svg {
        max-width: 18px;
        display: inline;
        position: relative;
        top: 3px;
    }
    .gallery, .item {
        display: flex;
        flex-wrap: wrap;
        user-select: none;
    }
    .gallery {
        margin: 0 -32px;
    }
    .item {
        justify-content: space-between;
        align-items: center;
    }
    .item img {
        max-width: 680px;
    }
    .border {
        width: 133px;
        height: 160px;
        background: #FFFFFF;
        box-sizing: border-box;
        border-radius: 2px;
        cursor: pointer;   
    }
    .border:hover {
        border: 4px solid #D81828;
        border-top: 5px solid #D81828;
        border-bottom: 5px solid #D81828;
        border-radius: 10px;
    }
    .border img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    h5 {
        font-family: "Rubik";
        font-style: normal;
        font-weight: 900;
        font-size: 1.875vw;
        letter-spacing: 0.24em;
        color: #181818;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .token_value {
        font-family: "Roboto Slab";
        font-style: normal;
        font-weight: 900;
        font-size: 36px;
        line-height: 47px;
        display: flex;
        align-items: center;
        text-transform: uppercase;
        margin-right: 16px;
        color: #FFFFFF;
    }
    .token_title {
        font-family: "Arkhip";
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 22px;
        display: flex;
        align-items: center;
        margin-left: 16px;
        width: 128px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
    }
    .token_block {
        width: 352px;
        height: 80px;
        background: #D81828;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
    }
    .wallet {
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
        position: relative;
        z-index: 49;
    }
    .wrapper {
        width: 100%;
        max-width: 83.3333333333vw;
        margin: 0 auto;
    }
    .d-mb {
        display: none;
    }
    .default-h2 {
        font-family: "Arkhip";
        font-style: normal;
        font-weight: normal;
        font-size: 2.5vw;
        text-transform: uppercase;
        color: #181818;
        max-width: 44vw;
        margin-top: 0;
    }
    .text-block {
        margin-top: 3.75vw;
        position: relative;
        z-index: 20;
        display: flex;
        justify-content: space-between;
    }
    .second-title {
        font-family: "Izvestija";
        font-style: normal;
        font-weight: normal;
        font-size: 5vw;
        line-height: 160%;
        color: #686060;
        position: absolute;
        right: -7.03125vw;
        top: 31.7708333333vw;
        margin: 0;
        text-transform: uppercase;
        mix-blend-mode: difference;
        opacity: 0.5;
        z-index: 2;
    }
    .second-title--multi {
        position: absolute;
        max-width: 50vw;
        right: -16.6666666667vw;
    }
    @media screen and (max-width: 1200px) {
        .item {
            justify-content: center;
        }
        .left, .right {
            display: none;
        }
        .img {
            margin: 32px;
        }
    }
    @media screen and (max-width: 640px) {
        .item {
            justify-content: center;
        }
        .left, .right {
            display: none;
        }
        .img {
            margin: 32px;
        }
        .img img {
            width: 85vw;
        }
        .gallery {
            justify-content: center;
        }
        h5 {
            font-size: 5.625vw;
            text-align: center;
        }
        .d-mb {
            display: inline;
        }
        .default-h2 {
            font-size: 5.625vw;
            line-height: 6.71875vw;
            text-align: center;
            max-width: 70.3125vw;
        }
        .d-dt {
            display: none;
        }
        .text-block {
            margin-top: 31.25vw;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .second-title {
            right: auto;
            left: 0;
            top: 0;
            font-size: 15vw;
            mix-blend-mode: difference;
            opacity: 0.4;
            white-space: nowrap;
            width: 100vw;
            overflow-x: hidden;
        }

        .default-button {
            max-width: 40vw;
            height: 12.5vw;
        }
        .default-button::before {
            bottom: -1.25vw;
            right: -1.25vw;
        }
        .default-button span {
            font-size: 5.625vw;
            line-height: 6.71875vw;
        }
        .default-button span::before {
            right: -1.25vw;
            border-width: 1.25vw;
        }
        .default-button span::after {
            bottom: -1.25vw;
            border-width: 1.25vw;
        }
    }
</style>
