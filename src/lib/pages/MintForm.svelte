<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { AppStore, MintStore } from "$lib/utils/Store";
    import Loader from '$lib/components/Loader.svelte';
    import messages from "$lib/_locales/messages.json";
    import { mintConsole } from "$lib/utils/MintConsole/MintConsole";

    let walletLink = '/wallet/';
    let nftLoading = false, showSelect = false, currencyText = "ETH";
    let promiseAllowence;
    let mintPrice = 0;
    let nftList = [];
    let willRecieve = 0;
    onMount(async () => {
        $MintStore.loading = false;
        $MintStore.mintSucceed = false;
        if ("ru" === $AppStore.lang) walletLink = "/ru/wallet/";
        if ("cn" === $AppStore.lang) walletLink = "/cn/wallet/";
        changeCurrency('eth');
        mintPrice = await mintConsole.getPrice();
    });

    $: {
        switch ($MintStore.currency) {
            case "eth":
                currencyText = "ETH";
                break;
            case "dust":
                currencyText = "DUST";
                break;
            case "nct":
                currencyText = "NCT";
                break;
            case "whale":
                currencyText = "WHALE";
                break;
            case "artblock":
                currencyText = "Artblock";
                break;
            case "box":
                currencyText = "NFT Boxes";
                break;
        }


        if (0 > +$MintStore.amount) {
            $MintStore.amount = 0;
        } else if ($MintStore.maxAmount < +$MintStore.amount) {
            $MintStore.amount = $MintStore.maxAmount;
        }
        switch ($MintStore.currency) {
            case 'eth':
            case 'dust':
            case 'nct':
            case 'whale':
                $MintStore.price = (new BigNumber($MintStore.amount)).times(new BigNumber(mintPrice)).toNumber();
                break;
        }
    }
 
    const changeCurrency = async (currency) => {
        showSelect = false;
        $MintStore.loading = true;
        try {
            $MintStore.amount = 1;
            await mintConsole.changeCurrency(currency);
            mintPrice = await mintConsole.getPrice();
            if ('artblock' === $MintStore.currency) {
                nftList = await mintConsole.getNftList();
            } else if ('box' === $MintStore.currency) {
                nftList = await mintConsole.getNftList();
            }
        } catch (e) {
            console.log(e);
        }
        willRecieve = 0;
        $MintStore.nftSelected = [];
        $MintStore.loading = false;
    };

    const mint = async () => {
        $MintStore.loading = true;
        try {
            $MintStore.mintedCount = await mintConsole.mint();
            mintConsole.updateAvailable();
        } catch (e) {
            console.log(e);
        }
        $MintStore.loading = false;
    };

    const approveErc20 =  async () => {
        $MintStore.loading = true;
        try {
            await mintConsole.approve();
        } catch (e) {
            console.log(e);
        }
        $MintStore.loading = false;
    };

    const approveErc721 = async () => {
        $MintStore.loading = true;
        try {
            nftList = [];
            $MintStore.nftSelected = [];
            await mintConsole.approve();
            nftList = await mintConsole.getNftList();
        } catch(e) {
            console.log(e);
        }
        $MintStore.loading = false;
    };

    const changeSlected = (i, id) => {
        if (-1 === $MintStore.nftSelected.indexOf(id)) {
            $MintStore.nftSelected = [...$MintStore.nftSelected, id];
            nftList[i].selected = true;
        } else {
            $MintStore.nftSelected = $MintStore.nftSelected.filter(v => v != id);
            nftList[i].selected = false;
        }

        switch ($MintStore.currency) {
            case 'artblock':
                willRecieve = 3 * $MintStore.nftSelected.length;
                if ($MintStore.maxAmount < willRecieve) {
                    willRecieve = $MintStore.maxAmount;
                }
                break;
            case 'box':
                willRecieve = $MintStore.nftSelected.length;
                if ($MintStore.maxAmount < willRecieve) {
                    willRecieve = $MintStore.maxAmount;
                }
                break; 
        }
    }
</script>

<div class="wrapper">
    <div class="lim">
        {#if $MintStore.loading}
            <h5>{messages[$AppStore.lang].loading}</h5>
            <Loader></Loader>
        {:else}
            {#if $MintStore.mintSucceed}
                <h5>Redblock comrades minted</h5>
                <h4>{$MintStore.mintedCount}</h4>
                <div href="{walletLink}" class="default-button" on:click={() => { window.location.href = walletLink }}>
                    <span>{messages[$AppStore.lang].nav_wallet}</span>
                </div>
            {:else if $MintStore.limitExceed}
                <h5>{messages[$AppStore.lang].amountExceed}</h5>
            {:else}
                <h5>{messages[$AppStore.lang].buyFor}</h5>
                <div class="select">
                    <div class="current" on:click={() => { if (!nftLoading) showSelect = !showSelect; } }>
                        <input type="text" readonly bind:value={currencyText} />
                    </div>
                    <div class="menu" class:show={showSelect}>
                        <div class="item" on:click={() => { changeCurrency('eth'); }}>ETH</div>
                        <div class="item" on:click={() => { changeCurrency('dust'); }}>DUST</div>
                        <div class="item" on:click={() => { changeCurrency('nct'); }}>NCT</div>
                        <div class="item" on:click={() => { changeCurrency('whale'); }}>WHALE</div>
                        <div class="item" on:click={() => { changeCurrency('artblock'); }}>Artblock</div>
                        <div class="item" on:click={() => { changeCurrency('box'); }}>NFT Boxes</div>
                    </div>
                </div>
                {#if 'eth' === $MintStore.currency || 'dust' === $MintStore.currency || 'nct' === $MintStore.currency || 'whale' === $MintStore.currency}
                    <h5 class="second_input_header">{messages[$AppStore.lang].amount}</h5>
                    <div class="amount">
                        <input type="number" bind:value={$MintStore.amount} min=0 max={$MintStore.maxAmount} />
                        <div class="inc" class:disabled={$MintStore.maxAmount <= $MintStore.amount} on:click={() => { $MintStore.maxAmount > $MintStore.amount ? $MintStore.amount++ : $MintStore.amount = $MintStore.maxAmount }}></div>
                        <div class="dec" class:disabled={1 >= $MintStore.amount} on:click={() => { 1 < $MintStore.amount ? $MintStore.amount-- : $MintStore.amount = 1 }}></div>
                    </div>
                    <div class="maxAmount">
                        {#if $MintStore.isWhitelistSale}
                            {messages[$AppStore.lang].reserve} {$MintStore.maxAmount}
                        {:else}
                            {messages[$AppStore.lang].max} {$MintStore.maxAmount}
                        {/if}
                    </div>
                    <div class="total">{$MintStore.price} {currencyText}</div>
                {:else}
                    <div class="maxAmount">
                        {#if $MintStore.isWhitelistSale}
                            {messages[$AppStore.lang].reserve} {$MintStore.maxAmount}
                        {:else}
                            {messages[$AppStore.lang].max} {$MintStore.maxAmount}
                        {/if}
                    </div>
                    <br /><br />
                {/if}
                {#if 'eth' === $MintStore.currencyType}
                    <div class="default-button" on:click={mint}>
                        <span>{messages[$AppStore.lang].mint_connected}</span>
                    </div>
                {:else if 'erc20' === $MintStore.currencyType}
                    {#await promiseAllowence}
                        <Loader></Loader>
                    {:then _}
                        {#if $MintStore.allowance >= $MintStore.price }
                            <div class="default-button" on:click={mint}>
                                <span>{messages[$AppStore.lang].mint_connected}</span>
                            </div>
                        {:else}
                            <div class="default-button" on:click={approveErc20}>
                                <span>{messages[$AppStore.lang].approve}</span>
                            </div>
                        {/if}
                    {/await}
                {:else}
                    {#if 1 === $MintStore.allowance}
                        {#if 'artblock' === $MintStore.currency}
                            {#if 0 === $MintStore.artblockBalance}
                                <h5>{messages[$AppStore.lang].noartblocks}</h5>
                            {:else}
                                <div class="gallery">
                                    {#each nftList as nft, i }
                                        <div class="box">
                                            <div class="border" class:selected={ nft.selected }>
                                                <img src="{nft.src}" class:show={undefined !== $MintStore.nftSelected[nft.id]} alt="Artblock {nft.id}" on:click|self={ () => { changeSlected(i, nft.id) } } />
                                            </div>
                                            <span>ID: {nft.id}</span>
                                        </div>
                                    {/each}
                                </div>
                                {#if 0 < $MintStore.nftSelected.length}    
                                    <div class="default-button" on:click={mint}>
                                        <span>{messages[$AppStore.lang].mint_connected}</span>
                                    </div>
                                    <h5 class="willMint">{messages[$AppStore.lang].willmint}</h5>
                                    <h4>{willRecieve}</h4>
                                {/if}
                            {/if}
                        {:else}
                            {#if 0 === $MintStore.boxBalance}
                                <h5>{messages[$AppStore.lang].noboxes}</h5>
                            {:else}
                                <div class="gallery">
                                    {#each nftList as nft, i }
                                        <div class="box">
                                            <div class="border" class:selected={ nft.selected }>
                                                <img src="{nft.src}" class:show={undefined !== $MintStore.nftSelected[nft.id]} alt="Artblock {nft.id}" on:click|self={ () => { changeSlected(i, nft.id) } } />
                                            </div>
                                            <span>ID: {nft.id}</span>
                                        </div>
                                    {/each}
                                </div>
                                {#if 0 < $MintStore.nftSelected.length}    
                                    <div class="default-button" on:click={mint}>
                                        <span>{messages[$AppStore.lang].mint_connected}</span>
                                    </div>
                                    <h5 class="willMint">{messages[$AppStore.lang].willmint}</h5>
                                    <h4>{willRecieve}</h4>
                                {/if}
                            {/if}
                        {/if}
                    {:else}
                        {#if 'artblock' === $MintStore.currency}
                            {#if 0 === $MintStore.artblockBalance}
                                <h5>{messages[$AppStore.lang].noartblocks}</h5>
                            {:else}
                                <div class="default-button" on:click={approveErc721}>
                                    <span>{messages[$AppStore.lang].approve}</span>
                                </div>
                            {/if}
                        {:else}
                            {#if 0 === $MintStore.boxBalance}
                                <h5>{messages[$AppStore.lang].noboxes}</h5>
                            {:else}
                                <div class="default-button" on:click={approveErc721}>
                                    <span>{messages[$AppStore.lang].approve}</span>
                                </div>
                            {/if}
                        {/if}   
                    {/if}
                {/if}
            {/if}
        {/if}
    </div>
</div>

<style>
    .gallery {
        display: flex;
        flex-wrap: wrap;
        user-select: none;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 64px;
    }
    .gallery .box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 50%;
        margin-bottom: 32px;
        flex-direction: column;
    }
    .box span {
        font-family: "Roboto Slab";
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        text-decoration-line: underline;
        display: inline-block;
        color: #181818;
        margin-top: 8px;
    }
    .item {
        justify-content: space-between;
        align-items: center;
    }
    .border {
        width: 160px;
        height: 160px;
        background: #FFFFFF;
        box-sizing: border-box;
        border-radius: 2px;
        cursor: pointer;   
    }
    .border.selected {
        border: 4px solid #5ed818 !important;
        border-radius: 10px;
    }
    .border:hover {
        border: 4px solid #D81828;
        border-radius: 10px;
    }
    .border img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    
    h4, h5 {
        text-align: center;
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
    h4 {
        color: #e01828;
        font-size: 2.875vw;
    }
    .err {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 1.2vw;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 780px;
        background: url(/img/modal.png);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        box-shadow: 0px 24px 48px rgba(0, 0, 0, 0.25);
        min-height: 733px;
    }
    .lim {
        width: 100%;
        max-width: 480px;
    }
    .total {
        font-family: 'Roboto Slab';
        font-style: normal;
        font-weight: normal;
        font-size: 72px;
        line-height: 86px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 48px 0;
        color: #181818;
    }
    .amount {
        position: relative;
        width: 480px;
        margin: 0 auto;
    }
    .inc {
        cursor: pointer;
        position: absolute;
        width: 32px;
        height: 16px;
        top: calc(50% - 24px);
        z-index: 9;
        right: 40px;
        transform: rotate(180deg);
        background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAzMiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMTZMMCAwSDMyTDE2IDE2WiIgZmlsbD0iI0UwMTgyOCIvPjwvc3ZnPg==");
    }
    .inc.disabled {
        background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAzMiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMTZMMCAwSDMyTDE2IDE2WiIgZmlsbD0iI0EwQTBBMCIvPjwvc3ZnPg==");
    }
    .dec {
        cursor: pointer;
        position: absolute;
        width: 32px;
        height: 16px;
        top: calc(50% + 8px);
        z-index: 9;
        right: 40px;
        background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAzMiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMTZMMCAwSDMyTDE2IDE2WiIgZmlsbD0iI0UwMTgyOCIvPjwvc3ZnPg==");
    }
    .dec.disabled {
        background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAzMiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMTZMMCAwSDMyTDE2IDE2WiIgZmlsbD0iI0EwQTBBMCIvPjwvc3ZnPg==");
    }
    .maxAmount {
        width: 480px;
        height: 48px;
        margin: 0 auto;
        font-family: 'Roboto Slab';
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 200%;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.24em;
        color: #181818;
    }
    input[type="number"] {
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
    }

    .second_input_header {
        margin-top: 48px;
        margin-bottom: 32px;
    }
    .select {
        width: 480px;
        margin: 0 auto;
        cursor: pointer;
    }
    .current {
        position: relative;
    }
    .select input {
        cursor: pointer;
    }
    .current::after {
        position: absolute;
        width: 32px;
        height: 16px;
        top: calc(50% - 8px);
        z-index: 9;
        right: 40px;
        content: " ";
        background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAzMiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMTZMMCAwSDMyTDE2IDE2WiIgZmlsbD0iI0UwMTgyOCIvPjwvc3ZnPg==");
    }
    .menu {
        display: none;
        margin: 0 auto;
        position: absolute;
    }
    .menu.show {
        z-index: 99;
        display: block;
    }
    .menu .item {
        width: 480px;
        height: 96px;
        background: #D8D8D8;
        border-radius: 2px;
        font-family: 'Roboto Slab';
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 32px;
        display: flex;
        align-items: center;
        padding-left: 32px;
        box-sizing: border-box; 
        color: #181818;
    }
    .menu .item:nth-child(2n) {
        background: #E8E8E8;
    }
    input {
        width: 480px;
        height: 96px;
        background: #FFFFFF;
        outline: 1px solid #C4C4C4;
        border: none;
        box-sizing: border-box;
        border-radius: 2px;
        font-family: 'Roboto Slab';
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        line-height: 43px;
        display: flex;
        align-items: center;
        color: #181818;
        margin: 0 auto;
        padding-left: 32px;
    }
    input:focus, input:active {
        outline: 1px solid #C4C4C4;
        border: none;
    }
    .select {
        
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
        margin: 0 auto;
        margin-bottom: 50px;
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
    .willMint {
        margin-bottom: -64px;
    }
    @media screen and (max-width: 640px) {
        .select, .amount, .maxAmount {
            width: 100%;
        }
        .total {
            font-size: 7vw;
            line-height: normal;
        }
        .menu {
            max-width: 91%;
        }
        input, .menu .item {
            max-width: 92%;
            height: 76px;
        }
        h5 {
            font-size: 5.625vw;
            text-align: center;
        }
        .default-button {
            margin-top: 40px;
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
        .willMint {
            margin-bottom: 0;
        }
        h4 {
            color: #e01828;
            font-size: 8.875vw;
        }
    }
</style>