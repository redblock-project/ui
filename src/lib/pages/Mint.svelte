<script lang="ts">
    // @ts-nocheck
    import { onMount } from "svelte";
    import { AppStore, MintStore } from "$lib/utils/Store";
    import messages from "$lib/_locales/messages.json";
    import { connectWallet, WalletStatus } from "$lib/utils/wallet";
    import Loader from "$lib/components/Loader.svelte";
    import MintForm from "./MintForm.svelte";
    import { mintConsole } from "$lib/utils/MintConsole/MintConsole";
    import { alchemyConsole } from "$lib/utils/MintConsole/AlchemyConsole";

    const init = async () => {
        if (showLoader)
            return;

        showLoader = true;
        if (undefined === window.ethereum) {
            await alchemyConsole.init(window);
            $MintStore.mintStarted = await alchemyConsole.isSaleInPprogess();
            await alchemyConsole.updateAvailable();
        } else {
            await mintConsole.init(window);
            await mintConsole.isMintStarted();
            await mintConsole.updateAvailable();
            await mintConsole.isWhitelistSaleEnabled();
            if (0 < $AppStore.walletAddress.length) {
                await mintConsole.checkMaxAmount();
            }
        }

        showLoader = false;
    };

    let showLoader = false;
    onMount(async () => {
        init();
    });

    $: {
        if (0 < $AppStore.walletAddress.length) {
            init();
        }
    }

    const showModal = () => {
        $AppStore.contract = "mint";
        $AppStore.showModal = true;
    };

    const makeConnect = async () => {
        showLoader = true;
        await connectWallet(window);
        showLoader = false;
    }
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].mint_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
        <div class="mint-content">
            <h1 class="main-title">
                <span>{messages[$AppStore.lang].mint_header}</span>
                {#if showLoader}
                    <div class="titleWhitelist">
                        loading
                    </div>
                {:else}
                    {#if $MintStore.isWhitelistSale}
                        <div class="titleWhitelist">
                            {messages[$AppStore.lang].nav_whitelist}
                        </div>
                    {:else}
                        {#if $MintStore.mintStarted}
                            {#if 0 < $AppStore.walletAddress.length}
                                <div class="titleWhitelist">
                                    public
                                </div>
                            {/if}
                        {:else}
                            <div class="titleWhitelist">
                                <!-- {messages[$AppStore.lang].coming} -->
                                Mint is over
                            </div>
                        {/if}
                    {/if}
                {/if}
            </h1>
            <div class="mint-content__columns" style="margin-bottom: 16px;">
                <div class="mint-content__column">
                    <span class="mint-content__title">ETHEREUM</span>
                    <div class="mint-content__group">
                        <div class="mint-content__item">
                            <span class="mint-content__sub-title">0.05 ETH {messages[$AppStore.lang].mint_unit}</span>
                            <span class="mint-content__value">{$MintStore.ethAvailable}/9917</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mint-content__columns">
                <div class="mint-content__column">
                    <span class="mint-content__title">ERC721 {messages[$AppStore.lang].mint_tokens}</span>
                    <div class="mint-content__group">
                        <div class="mint-content__item">
                            <span class="mint-content__sub-title">Artblock</span>
                            <span class="mint-content__value">{$MintStore.artblockAvailable}/100</span>
                        </div>
                        <div class="mint-content__item">
                            <span class="mint-content__sub-title">NFT Box</span>
                            <span class="mint-content__value">{$MintStore.boxAvailable}/100</span>
                        </div>
                    </div>
                </div>
                <div class="mint-content__column">
                    <span class="mint-content__title">ERC20 {messages[$AppStore.lang].mint_tokens}</span>
                    <div class="mint-content__group">
                        <div class="mint-content__item">
                            <span class="mint-content__sub-title">NCT</span>
                            <span class="mint-content__value">{$MintStore.nctAvailable}/100</span>
                        </div>
                        <div class="mint-content__item">
                            <span class="mint-content__sub-title">DUST</span>
                            <span class="mint-content__value">{$MintStore.dustAvailable}/100</span>
                        </div>
                        <div class="mint-content__item">
                            <span class="mint-content__sub-title">WHALE</span>
                            <span class="mint-content__value">{$MintStore.whaleAvailable}/100</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mint_process">
                <!-- {#if showLoader}
                    <h5>{messages[$AppStore.lang].loading}</h5>
                    <Loader />
                {:else}
                    <div class="mint_form">
                        {#if WalletStatus.connected === $AppStore.walletStatus}
                            {#if $MintStore.mintStarted}
                                <MintForm />
                            {/if}
                        {:else}
                            <div class="default-button" on:click={makeConnect}>
                                <span>{messages[$AppStore.lang].mint_connect}</span>
                            </div>
                        {/if}
                    </div>
                {/if} -->
            </div>
            <p class="default-text d-mb">
                Октя́брьская револю́ция (полное официальное название в СССР —
                «Вели́кая Октя́брьская социалисти́ческая револю́ция»; иные названия,
                получившие распространение в историографии: Октя́брьский
                переворот, «Октябрьское восстание», «Красный Октябрь», «Великий
                Октябрь», «большевистский переворот») — социалистическая
                революция в октябре (по новому стилю — в ноябре) 1917 года,
                итогом которой стало свержение Временного правительства и
                установление советской власти, что существенным образом повлияло
                на дальнейший ход мировой истории. В историографии
                рассматривается либо как самостоятельное историческое событие,
                либо как продолжение Февральской революции.
            </p>
        </div>
    </div>
</main>
<h2 class="second-title d-mb">Октябрьская революция</h2>

<img src="/img/coin.png" alt="coin" class="coin-blur d-dt" />
<img src="/img/coin.png" alt="coin" class="coin-image" />
<img src="/img/mark.png" alt="coin" class="mark-image d-dt" />

<style>
    main {
        position: relative;
        z-index: 49;
    }
    .titleWhitelist {
        font-family: 'Painting With Chocolate';
        font-style: normal;
        font-weight: normal;
        font-size: 2.5vw;
        align-items: center;
        text-align: center;
        color: #D81828;
        letter-spacing: normal;
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
    .mint_form {
        width: 100%;
        display: flex;
        justify-content: center;
        
        z-index: 100;
    }
    .mint_process {
        margin-bottom: 256px;
        display: flex;
        justify-content: center;
        width: 100%;
        flex-direction: column;
    }
    .wrapper {
        width: 100%;
        max-width: 83.3333333333vw;
        margin: 0 auto;
    }

    .main-title {
        font-family: "Rubik";
        font-weight: 900;
        font-size: 2.5vw;
        line-height: 2.96875vw;
        letter-spacing: 1.12em;
        color: #181818;
        z-index: 20;
        position: relative;
        margin: 0;
        margin-bottom: 5.7291666667vw;
        margin-top: 4.375vw;
        display: block;
        text-align: center;
    }
    .main-title span {
        font-family: "Arkhip";
        font-weight: normal;
        font-size: 6.25vw;
        line-height: 6.7708333333vw;
        letter-spacing: initial;
        margin-bottom: 2.0833333333vw;
        display: inline-block;
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

    .default-text {
        font-family: "Times New Roman";
        font-style: normal;
        font-weight: normal;
        font-size: 0.9375vw;
        line-height: 160%;
        color: #686060;
        overflow: hidden;
        mix-blend-mode: difference;
        opacity: 0.5;
        z-index: 2;
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
        margin-bottom: 32px;
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
    .mint-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 20;
        color: #181818;
    }
    .mint-content .main-title {
        margin-top: 3.3333333333vw;
        margin-bottom: 3.6458333333vw;
    }
    .mint-content .main-title span {
        margin-bottom: 0;
    }
    .mint-content__columns {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 5.2083333333vw;
    }
    .mint-content__column {
        width: 100%;
        max-width: 31.25vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .mint-content__title {
        font-family: "Rubik";
        font-style: normal;
        font-weight: 900;
        font-size: 1.875vw;
        line-height: 2.2395833333vw;
        letter-spacing: 0.24em;
        margin-bottom: 0.5208333333vw;
        display: inline-block;
    }
    .mint-content__sub-title {
        font-style: normal;
        font-weight: normal;
        font-size: 1.875vw;
        line-height: 200%;
        text-align: center;
    }
    .mint-content__group, .mint-content__group_ru {
        display: flex;
        width: 100%;
        position: relative;
    }
    .mint-content__group::before {
        position: absolute;
        content: "minted";
        font-size: 0.9375vw;
        line-height: 200%;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
    }    
    .mint-content__item {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
    }
    .mint-content__item .mint-content__sub-title {
        display: inline-block;
        padding-bottom: 2.125vw;
    }
    .mint-content__value {
        font-family: "Painting With Chocolate";
        font-style: normal;
        font-weight: normal;
        font-size: 1.875vw;
        line-height: 1.875vw;
        color: #d81828;
    }
    .mint-content .default-text {
        position: fixed;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-66%);
        font-size: 2.8125vw;
        opacity: 0.3;
    }

    .coin-blur {
        width: 16.6666666667vw;
        position: fixed;
        left: -3.75vw;
        top: 8.0208333333vw;
        filter: blur(0.2083333333vw);
        z-index: 20;
        transform: rotate(-30deg);
    }

    .coin-image {
        width: 8.3333333333vw;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        bottom: -2.0833333333vw;
        z-index: 20;
    }
    .mark-image {
        width: 37.5vw;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        z-index: 10;
        mix-blend-mode: darken;
    }

    .d-mb {
        display: none;
    }
    @media screen and (max-width: 640px) {
        .titleWhitelist {
            font-size: 5.625vw;
        }
        h5 {
            font-size: 5.625vw;
            text-align: center;
        }
        main {
            margin-top: 100px;
        }
        .wrapper {
            position: initial;
        }
        .main-title {
            margin-top: 33.75vw;
            margin-bottom: 1.5625vw;
            display: flex;
            align-items: center;
            flex-direction: column;
            font-size: 3.75vw;
            line-height: 4.375vw;
        }
        .main-title span {
            font-size: 10vw;
            line-height: 12.03125vw;
            margin-bottom: 4.6875vw;
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
        .default-text {
            padding-left: 0;
            font-size: 2.8125vw;
            text-align: center;
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
        .mint-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: initial;
            z-index: 20;
            color: #181818;
            top: 31.25vw;
        }
        .mint-content .main-title {
            margin-bottom: 8.125vw;
        }
        .mint-content__columns {
            flex-direction: column;
            align-items: center;
            margin-bottom: 17.1875vw;
        }
        .mint-content__column {
            max-width: 93.75vw;
        }
        .mint-content__column:first-child {
            margin-bottom: 11.25vw;
        }
        .mint-content__title {
            font-size: 5.625vw;
            line-height: 6.71875vw;
            margin-bottom: 1.5625vw;
        }
        .mint-content__sub-title {
            font-size: 5.625vw;
        }
        .mint-content__group::before {
            font-size: 2.8125vw;
        }
        .mint-content__item .mint-content__sub-title {
            padding-bottom: 9.375vw;
        }
        .mint-content__value {
            font-size: 5.625vw;
            line-height: 5.625vw;
        }
        .coin-image {
            left: auto;
            bottom: auto;
            right: -9.375vw;
            top: 32.8125vw;
            width: 25vw;
            transform: none;
        }
        .d-mb {
            display: inline;
        }
    }
</style>
