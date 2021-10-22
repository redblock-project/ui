<script>
    import { onMount } from "svelte";
    import { AppStore } from "$lib/utils/Store";
    import { scale, fade } from "svelte/transition";
    import messages from "$lib/_locales/messages.json";
    let ready = false;
    onMount(() => {
        document.body.style.overflowY = "scroll";
        ready = true;
    });
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].hall_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
        <div class="kolhoz-content">
            <h1 class="main-title">
                <span>{messages[$AppStore.lang].hall_header}</span>
            </h1>
            <h1 class="sub-title">
                <span>legendary</span>
            </h1>
            <div class="legends">
                <div class="legend" id="che">
                    {#if ready}
                        <img src="/img/CHE.png" alt="" in:fade|local={{ duration: 1200 }} />
                    {/if}
                    <span>Ernesto Che Guevara</span>
                </div>
                <div class="legend" id="lenin">
                    {#if ready}
                        <img src="/img/LENIN.png" alt="" in:scale|local={{ duration: 1000 }} />
                    {/if}
                    <span>Vladimir Ilyich Ulyanov</span>
                </div>
                <div class="legend" id="mao">
                    {#if ready}
                        <img src="/img/MAO.png" alt="" in:fade|local={{ duration: 1200 }} />
                    {/if}
                    <span>毛澤東</span>
                </div>
            </div>
        </div>
    </div>
</main>
<h2 class="second-title d-mb">Октябрьская революция</h2>
<img src="/img/mark.png" alt="coin" class="mark-image d-dt" />

<style>
    .legends {
        display: flex;
        z-index: 99;
        margin-top: -100px;
        justify-content: center;
    }
    .legend span {
        font-family: "Roboto Slab";
        font-style: normal;
        font-weight: normal;
        font-size: 1.25vw;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        color: #181818;
        margin-top: -39px;
    }
    @media screen and (max-width: 1280px) {
        .legends {
            flex-wrap: wrap;
        }
        #lenin {
            order: 1;
        }
        #che {
            order: 2;
        }
        #mao {
            order: 3;
        }
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
    .sub-title {
        position: absolute;
        margin-top: 18vw;
        z-index: 10;
    }
    .sub-title span {
        font-family: "Painting With Chocolate";
        font-style: normal;
        font-weight: normal;
        font-size: 15vw;
        line-height: 15vw;
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
    }

    .kolhoz-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 20;
        color: #181818;
    }
    .kolhoz-content .main-title {
        margin-top: 3.3333333333vw;
        margin-bottom: 3.6458333333vw;
    }
    .kolhoz-content .main-title span {
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
    @media screen and (max-width: 640px) {
        .legends {
            margin-top: -54px;
        }
        .legend img {
            width: 90vw;
        }       
        .legend span {
            font-size: 4.75vw;
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
        .sub-title {
            margin-top: 180vw;
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
        .default-text {
            padding-left: 0;
            font-size: 2.8125vw;
            text-align: center;
        }
        .kolhoz-content .main-title {
            margin-top: 31.25vw;
            margin-bottom: 8.125vw;
        }
        .d-mb {
            display: inline;
        }
    }
</style>
