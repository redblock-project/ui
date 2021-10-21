<script>
    import { onMount } from "svelte";
    import { AppStore } from "$lib/utils/Store";
    import messages from "$lib/_locales/messages.json";
    onMount(() => {
        document.body.style.overflowY = "scroll";
    });
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].kolhoz_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
        <div class="kolhoz-content">
            <h1 class="main-title">
                <span>{messages[$AppStore.lang].kolhoz_header}</span>
            </h1>
            <h1 class="sub-title">
                <span>{messages[$AppStore.lang].coming}</span>
            </h1>
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
<img src="/img/mark.png" alt="coin" class="mark-image d-dt" />

<style>
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
    .sub-title span {
        font-family: "Painting With Chocolate";
        font-style: normal;
        font-weight: normal;
        font-size: 2.25vw;
        line-height: 2.25vw;
        display: flex;
        align-items: center;
        text-align: center;
        color: #d81828;
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
        .sub-title span {
            font-size: 8vw;
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
