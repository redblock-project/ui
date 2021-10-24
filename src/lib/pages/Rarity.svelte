<script>
    import { onMount } from "svelte";
    import { AppStore } from "$lib/utils/Store";
    import { scale, fade } from "svelte/transition";
    import messages from "$lib/_locales/messages.json";
    let ready = false, mobile = false;
    onMount(() => {
        document.body.style.overflowY = "scroll";
        ready = true;
        if (1280 >= screen.availWidth) {
            mobile = true;
        }
        window.onresize = () => {
            1280 >= screen.availWidth ? mobile = true : mobile = false;
        };
    });
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].rarity_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
        <div class="rarity-content">
            <h1 class="sub-title">
                <span>rarity</span>
            </h1>
            <div class="rarity">
                <div class="left">
                    <div class="combs">
                        <h3>{messages[$AppStore.lang].rarity_total}</h3>
                        <span>9917</span>
                    </div>
                    <div class="combs">
                        <h3>{messages[$AppStore.lang].rarity_men}</h3>
                        <span>5654</span>
                    </div>
                    <div class="combs">
                        <h3>{messages[$AppStore.lang].rarity_women}</h3>
                        <span>3320</span>
                    </div>
                    {#if !mobile}
                        <div class="desc">
                            {messages[$AppStore.lang].rarity_desc}
                        </div>
                    {/if}
                </div>
                {#if mobile}
                    <div class="desc">
                        {messages[$AppStore.lang].rarity_desc}
                    </div>
                {/if}
                <div class="legend" id="lenin">
                    {#if ready}
                        <img src="/img/bear.png" alt="" in:scale|local={{ duration: 1000 }} />
                    {/if}
                </div>
                <div class="right">
                    <div class="combs">
                        <h3>{messages[$AppStore.lang].rarity_adolescent}</h3>
                        <span>800{#if !mobile}&nbsp;{/if}</span>
                    </div>
                    <div class="combs">
                        <h3>{messages[$AppStore.lang].rarity_bears}</h3>
                        <span>80{#if !mobile}&nbsp;{/if}</span>
                    </div>
                    <div class="combs">
                        <h3>{messages[$AppStore.lang].rarity_muzzles}</h3>
                        <span>50{#if !mobile}&nbsp;{/if}</span>
                    </div>
                    <div class="combs">
                        <h3>{messages[$AppStore.lang].rarity_legendary}</h3>
                        <span>13{#if !mobile}&nbsp;{/if}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<h2 class="second-title d-mb">Октябрьская революция</h2>

<style>
    .rarity {
        display: flex;
        z-index: 99;
        justify-content: space-between;
        margin-top: 32px;
    }
    .left, .right {
        max-width: 360px;
    }
    .combs h3{
        font-family: "Rubik";
        font-style: normal;
        font-weight: 900;
        font-size: 1.875vw;
        display: flex;
        align-items: center;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        margin-bottom: 8px;
        color: #181818;
        width: 100%;
    }
    .combs span {
        font-family: Painting With Chocolate;
        font-style: normal;
        font-weight: normal;
        font-size: 2.5vw;
        display: flex;
        align-items: center;
        color: #D81828;
        width: 100%;
        display: inline-block;
    }
    .right .combs h3 {
        display: inline-block;
        text-align: right;
    }
    .right .combs span {
        display: inline-block;
        text-align: right;
    }
    .desc {
        margin-top: 48px;
        font-style: normal;
        font-weight: normal;
        font-size: 0.9375vw;
        line-height: 200%;
        color: #181818;
    }
    .wrapper {
        width: 100%;
        max-width: 83.3333333333vw;
        margin: 0 auto;
    }

    .sub-title {
        position: absolute;
        margin-top: 10vw;
        z-index: 10;
    }
    .sub-title span {
        font-family: "Painting With Chocolate";
        font-style: normal;
        font-weight: normal;
        font-size: 22.5vw;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
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

    .rarity-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 20;
        color: #181818;
    }
    .rarity-content .main-title span {
        margin-bottom: 0;
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
    

    @media screen and (max-width: 1280px) {
        .rarity {
            flex-wrap: wrap;
            margin-top: 0;
        }
        .legend {
            justify-content: center;
            display: flex;
            width: 100%;
        }
        .rarity .left {
            display: flex;
            justify-content: space-around;
            width: 100%;
            max-width: 99vw;
        }
        .rarity .right {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            max-width: 99vw;
        }
        .right .combs h3 {
            display: inline-block;
            text-align: center;
        }
        .right .combs span {
            display: inline-block;
            text-align: center;
        }
        .rarity .combs {
            width: 100%;
            text-align: center;
        }
        .combs h3 {
            display: inline-block;
        }
        .combs h3{
            font-size: 3.625vw;
        }
        .combs span {
            font-size: 5.5vw;
        }
        .desc {
            text-align: center;
            font-size: 1.8125vw;
            margin-top: 16px;
            margin-bottom: 24px;
        }
    }
    @media screen and (min-width: 2560px) {
        .left, .right {
            max-width: 480px;
        }
    }
    @media screen and (min-width: 3200px) {
        .left, .right {
            max-width: 800px;
        }
    }
    @media screen and (max-width: 640px) {
        .rarity {
            flex-wrap: wrap;
            margin-top: 90px;
        }
        .rarity .left {
            display: flex;
            justify-content: space-around;
            width: 100%;
            max-width: 99vw;
        }
        .rarity .right {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            max-width: 99vw;
        }
        .right .combs h3 {
            display: inline-block;
            text-align: center;
        }
        .right .combs span {
            display: inline-block;
            text-align: center;
        }
        .rarity .combs {
            width: 100%;
            text-align: center;
        }
        .combs h3 {
            display: inline-block;
        }
        .rarity img {
            width: 90vw;
        }       
        .combs h3{
            font-size: 5.625vw;
        }
        .combs span {
            font-size: 7.5vw;
        }
        .desc {
            text-align: center;
            font-size: 3.8125vw;
            margin-top: 16px;
            margin-bottom: 24px;
        }
        .sub-title {
            margin-top: 124vw;
            transform: rotate(90deg);
        }
        .sub-title span {
            font-size: 50vw;
            line-height: 10.03125vw;
            margin-bottom: 3.6875vw;
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
        .d-mb {
            display: inline;
        }
    }
</style>
