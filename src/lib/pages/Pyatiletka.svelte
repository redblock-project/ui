<script lang="ts">
    import { onMount } from "svelte";
    import { AppStore } from "$lib/utils/Store";
    import messages from "$lib/_locales/messages.json";

    onMount(() => {
        document.body.style.overflowY = "scroll";
    });

    const showModal = () => {
        $AppStore.showModal = true;
    };
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].pyatiletka_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
        <div class="pyatiletka-content">
            <h1 class="main-title">
                <span>{messages[$AppStore.lang].pyatiletka_header}</span>
            </h1>
            <div class="timeline">
                <div class="card">
                    <div class="step">1</div>
                    <div class="title">KOLHOZ</div>
                    <div class="quote">
                        "Who does not work shall not eat" <br />
                        VLADIMIR LENIN
                    </div>
                    <div class="content">
                        <p>You can go to KOLHOZ to farm USSR tokens.</p>
                        <p>When you stake your NFTs, a proportional amount of daily emissioned USSR tokens will be credited to your wallet. Put your Comrade to work and get income, which you can later spend on our future drops and props.</p>
                        <p>Token emission is limited and staking will only last for 5 years. Come early!</p>
                    </div>
                </div>
                <div class="card">
                    
                </div>
            </div>
            <div class="default-button" on:click={showModal}>
                <span>{messages[$AppStore.lang].mint_connect}</span>
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

<img src="/img/kolhoz.png" alt="kolhoz" class="kolhoz d-dt" />
<img src="/img/newspaper.png" alt="gazeta" class="newspaper d-dt" />

<style>
    .timeline {
        position:relative;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        margin: 0 auto;
    }
    .timeline::after {
        z-index: 1;
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        border-left: 4px solid #ffffff;
    }
    .timeline .card {
        position: relative;
        width: 100%;
        text-align: center;
        max-width: 400px;
        left: -50%;
        padding-right: 180px;
    }
    .timeline .card:before {
        z-index: 6;
        content: "";
        position: absolute;
        right: -20px;
        background: url('/img/logo_small.png');
        width: 40px;
        height: 40px;
    }
    .timeline .card .step {
        position: absolute;
        z-index: 2;
        font-family: 'Painting With Chocolate';
        font-style: normal;
        font-weight: normal;
        font-size: 22.5vw;
        line-height: 432px;
        color: #FFFFFF;
        top: 40px;
        left: 200px;
    }
    .timeline .card .title {
        position: relative;
        z-index: 3;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 900;
        font-size: 1.875vw;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: #181818;
    }
    .timeline .card .quote {
        font-weight: bold;
    }
    .timeline .card .quote, .timeline .card .content {
        position: relative;
        z-index: 3;
        font-family: 'Roboto Slab';
        font-style: normal;
        font-size: 0.9375vw;
        line-height: 200%;
        color: #181818;
    }
    @media screen and (max-width: 2560px) {
        .timeline .card {
            max-width: 600px;
        }
        .timeline .card .quote, .timeline .card .content {
            line-height: 175%;
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
    .pyatiletka-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 20;
        color: #181818;
    }
    .pyatiletka-content .main-title {
        margin-top: 3.3333333333vw;
        margin-bottom: 3.6458333333vw;
    }
    .pyatiletka-content .main-title span {
        margin-bottom: 0;
    }
    .pyatiletka-content__columns {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 5.2083333333vw;
    }
    .pyatiletka-content__column {
        width: 100%;
        max-width: 31.25vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .pyatiletka-content__title {
        font-family: "Rubik";
        font-style: normal;
        font-weight: 900;
        font-size: 1.875vw;
        line-height: 2.2395833333vw;
        letter-spacing: 0.24em;
        margin-bottom: 0.5208333333vw;
        display: inline-block;
    }
    .pyatiletka-content__sub-title {
        font-style: normal;
        font-weight: normal;
        font-size: 1.875vw;
        line-height: 200%;
        text-align: center;
    }
    .pyatiletka-content__group, .pyatiletka-content__group_ru {
        display: flex;
        width: 100%;
        position: relative;
    }
    .pyatiletka-content__group::before {
        position: absolute;
        content: "Now Available";
        font-size: 0.9375vw;
        line-height: 200%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }    
    .pyatiletka-content__group_ru::before {
        position: absolute;
        content: "Доступные в данный момент";
        font-size: 0.9375vw;
        line-height: 200%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .pyatiletka-content__item {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
    }
    .pyatiletka-content__item .pyatiletka-content__sub-title {
        display: inline-block;
        padding-bottom: 3.125vw;
    }
    .pyatiletka-content__value {
        font-family: "Painting With Chocolate";
        font-style: normal;
        font-weight: normal;
        font-size: 1.875vw;
        line-height: 1.875vw;
        color: #d81828;
    }
    .pyatiletka-content .default-text {
        position: fixed;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-66%);
        font-size: 2.8125vw;
        opacity: 0.3;
    }

    .kolhoz {
        position: fixed;
        left: 0;
        top: 17vw;
        z-index: 20;
    }

    .newspaper {
        position: fixed;
        right: 0;
        bottom: 2.0833333333vw;
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
        .pyatiletka-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 20;
            color: #181818;
            top: 31.25vw;
        }
        .pyatiletka-content .main-title {
            margin-bottom: 8.125vw;
        }
        .pyatiletka-content__columns {
            flex-direction: column;
            align-items: center;
            margin-bottom: 17.1875vw;
        }
        .pyatiletka-content__column {
            max-width: 93.75vw;
        }
        .pyatiletka-content__column:first-child {
            margin-bottom: 11.25vw;
        }
        .pyatiletka-content__title {
            font-size: 5.625vw;
            line-height: 6.71875vw;
            margin-bottom: 1.5625vw;
        }
        .pyatiletka-content__sub-title {
            font-size: 5.625vw;
        }
        .pyatiletka-content__group::before {
            font-size: 2.8125vw;
        }
        .pyatiletka-content__item .pyatiletka-content__sub-title {
            padding-bottom: 9.375vw;
        }
        .pyatiletka-content__value {
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
