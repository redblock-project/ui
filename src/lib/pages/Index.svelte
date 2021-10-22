<script>
    import { onMount } from "svelte";
    import { slide, fade } from "svelte/transition";
    import { AppStore } from "$lib/utils/Store";
    import { delay } from "$lib/utils/utils";
    import messages from "$lib/_locales/messages.json";

    let mintLink = "/mint";

    const fixInterSection = () => {
        let target = "header";
        let width = "48.9583333333vw";
        if (640 >= screen.availWidth) {
            target = ".default-button";
            width = "75vw";
        }
        setTimeout(async () => {
            const btn = document.querySelector(target).getBoundingClientRect();
            if (null !== document.querySelector(".person-image")) {
                const img = document.querySelector(".person-image").getBoundingClientRect();
                if ((btn.y + btn.height + 10) >= img.y) {
                    const diff = (btn.y + btn.height + 10) - img.y;
                    for (let i = 1; i < diff; i += 5) {
                        const el = document.querySelector(".person-image");
                        if (null !== el) {
                            el.style.width = `calc(${width} - ${(i)}px)`;
                        }
                        await delay(10);
                    }
                }
            }
        }, 9e2);
    }

    let ready = false, mobile = false;
    onMount(async () => {
        document.body.style.overflowY = "hidden";
        setTimeout(() => {
            ready = true;
            if (640 >= screen.availWidth) {
                mobile = true;
            }
            fixInterSection();
        }, 1e2);
        if ("ru" === $AppStore.lang) mintLink = "/ru/mint";
    });

    const paperText = `отставанию от других государств и установлению в России тоталитарной системы правления (либо, наоборот, к гибели Великой России как империи). Для этой школы историков Октябрьская революция была «путчем, который силой навязала пассивному обществу кучка циничных заговорщиков, не имевших какой-либо реальной опоры в стране».`;
    const mobileText = `Октя́брьская револю́ция (полное официальное название в СССР — «Вели́кая Октя́брьская социалисти́ческая револю́ция»; иные названия, получившие распространение в историографии: Октя́брьский переворот, «Октябрьское восстание», «Красный Октябрь», «Великий Октябрь», «большевистский переворот») — социалистическая революция в октябре (по новому стилю — в ноябре) 1917 года, итогом которой стало свержение Временного правительства и установление советской власти, что существенным образом повлияло на дальнейший ход мировой истории. В историографии рассматривается либо как самостоятельное историческое событие, либо как продолжение Февральской революции.`;
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].index_title}</title>
</svelte:head>
<img src="/img/image.jpg" alt="" class="main-image" />
<main>
    <div class="wrapper">
        <h1 class="main-title" class:title_en={"en" === $AppStore.lang}>
            <span>{messages[$AppStore.lang].index_h1_1}</span>
            {messages[$AppStore.lang].index_h1_2}
            <mark>soon</mark>
        </h1>
    </div>
    <div class="content">
        <p class="default-text">
            Единственным безусловным свершением Февральской революции было
            отречение Николая II от престола; свержение монархии не может быть
            названо непосредственным результатом революции, так как форма
            устройства России, монархического или республиканского, должна была
            быть определена Учредительным собранием. Однако ни для рабочих,
            совершавших революцию, ни для солдат, перешедших на их сторону, ни
            для крестьян, письменно и устно благодаривших петроградских
            рабочих[27], свержение Николая II не было самоцелью. Революция
            непосредственно началась с демонстрации петроградских работниц 23
            февраля (8 марта по григорианскому календарю).
        </p>
        <p class="default-text">
            Существует широкий спектр оценок Октябрьской революции и её последствий для страны. Для одних это была национальная катастрофа, перечеркнувшая естественный ход развития предреволюционной России и приведшая к Гражданской войне, 
            {#if ready && !mobile}
                {#each paperText as char, i}
                    <span in:fade={{ delay: 1000 + i * 100, duration: 50 }}>{char}</span>
                {/each}
            {/if}
        </p>
        <p class="default-text">
            {mobileText}
        </p>
        <a href={mintLink} class="default-button">
            <span>{messages[$AppStore.lang].index_btn}</span>
        </a>
    </div>
</main>
<h2 class="second-title">Октябрьская революция</h2>
{#if ready}
    <img src="/img/person.png" alt="" class="person-image" in:slide|local={{ duration: 300 }} />
{/if}

<style>
    .wrapper {
        width: 100%;
        max-width: 83.3333333333vw;
        margin: 0 auto;
    }
    .main-image {
        position: absolute;
        right: -21.3541666667vw;
        top: -3.3333333333vw;
        width: 58.8541666667vw;
        z-index: 20;
    }
    .person-image {
        position: fixed;
        right: 0;
        bottom: -6.7708333333vw;
        width: 48.9583333333vw;
        z-index: 20;
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
    .title_en {
        letter-spacing: 1.42em;
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
    .main-title mark {
        background: none;
        font-family: "Painting With Chocolate";
        font-weight: normal;
        font-size: 9vw;
        line-height: 10vw;
        color: #d81828;
        letter-spacing: initial;
        margin-top: 2.0833333333vw;
        display: inline-block;
        width: 100%;
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
    .content {
        padding-left: 7.8125vw;
        display: flex;
        align-items: flex-start;
        gap: 2.1875vw;
        position: absolute;
        content: "";
        height: 17.1875vw;
        overflow-y: hidden;
    }
    .content .default-text:first-child {
        width: 13.75vw;
    }
    .content .default-text:nth-child(2) {
        width: 36.25vw;
    }
    .content .default-text:nth-child(3) {
        width: 41.6666666667vw;
    }
    .content .default-button {
        position: absolute;
        top: 0.5208333333vw;
        left: 7.8125vw;
    }
    .default-button {
        text-decoration: none;
        width: 100%;
        max-width: 13.3333333333vw;
        height: 4.1666666667vw;
        position: relative;
        z-index: 20;
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
    .default-button span:hover {
        background: linear-gradient(180deg, #d81828, #ac1020);
    }
    .default-button:active {
        transform: scale(0.95);
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
    @media screen and (max-width: 640px) {
        .main-image {
            display: none;
        }
        .person-image {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 75vw;
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
        .main-title mark {
            font-size: 11.25vw;
            line-height: 11.25vw;
            margin-top: 4.6875vw;
            text-align: center;
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
        .content {
            padding: 0 0.78125vw;
            height: auto;
        }
        .content .default-text:first-child {
            display: none;
        }
        .content .default-text:nth-child(2) {
            display: none;
        }
        .content .default-text:nth-child(3) {
            width: 100%;
        }
        .content .default-button {
            top: 7.03125vw;
            left: 50%;
            transform: translateX(-50%);
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
