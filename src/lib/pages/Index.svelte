<script>
    import { onMount, onDestroy } from "svelte";
    import { slide, fade, scale } from "svelte/transition";
    import { AppStore } from "$lib/utils/Store";
    import { delay } from "$lib/utils/utils";
    import messages from "$lib/_locales/messages.json";

    let mintLink = "/mint";

    const scrollToRoadmap = () => {
        if (!$AppStore.roadmap) return;
        if ('#roadmap' === document.location.hash || $AppStore.roadmap) {
            $AppStore.roadmap = false;
            document.querySelector('#roadmap2').scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
    const scrollToAbout = () => {
        if (!$AppStore.about) return;
        if ('#about' === document.location.hash || $AppStore.about) {
            $AppStore.about = false;
            document.querySelector('#about2').scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    let ready = false, mobile = false, unique = 0, interval;
    onMount(async () => {
        setTimeout(() => {
            ready = true;
            unique++;
            if (640 >= screen.availWidth) {
                mobile = true;
                // setTimeout(() => {
                //     if (null !== document.querySelector(".person-image")) {
                //         document.querySelector(".person-image").style.display = 'none';
                //     }
                // }, 2e3);
            }
        }, 6e2);
        if ("ru" === $AppStore.lang) mintLink = "/ru/mint";
        if ("cn" === $AppStore.lang) mintLink = "/cn/mint";
 
        if ('#roadmap' === document.location.hash) {
            $AppStore.roadmap = true;
        }
        if ('#about' === document.location.hash) {
            $AppStore.about = true;
        }
        scrollToRoadmap();
        scrollToAbout();
        interval = setInterval(() => {
            scrollToRoadmap();
            scrollToAbout();
        }, 1e2);
    });

    onDestroy(() => {
        clearInterval(interval);
    })

    const paperText = `отставанию от других государств и установлению в России тоталитарной системы правления (либо, наоборот, к гибели Великой России как империи). Для этой школы историков Октябрьская революция была «путчем, который силой навязала пассивному обществу кучка циничных заговорщиков, не имевших какой-либо реальной опоры в стране».`;
    const mobileText = `Октя́брьская револю́ция (полное официальное название в СССР — «Вели́кая Октя́брьская социалисти́ческая револю́ция»; иные названия, получившие распространение в историографии: Октя́брьский переворот, «Октябрьское восстание», «Красный Октябрь», «Великий Октябрь», «большевистский переворот») — социалистическая революция в октябре (по новому стилю — в ноябре) 1917 года, итогом которой стало свержение Временного правительства и установление советской власти, что существенным образом повлияло на дальнейший ход мировой истории. В историографии рассматривается либо как самостоятельное историческое событие, либо как продолжение Февральской революции.`;
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].index_title}</title>
</svelte:head>
<img src="/img/image.jpg" alt="" class="main-image" />
<main>
    <div class="wrapper">
        <h1 class="main-title" class:title_en={"en" === $AppStore.lang || "cn" === $AppStore.lang}>
            <span>{messages[$AppStore.lang].index_h1_1}</span>
            {messages[$AppStore.lang].index_h1_2}
            <mark>Nov 25th</mark>
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
    <section class="roadmap" id="roadmap2">
        <div class="pyatiletka-content">
            <h1 class="main-title">
                <span>{@html messages[$AppStore.lang].pyatiletka_header}</span>
            </h1>
            <h2 class="sub-title">
                <span>RoadMap</span>
            </h2>
            <div class="desc">
                {@html messages[$AppStore.lang].pyatiletka_desc}
            </div>
            <div class="timeline">
                <div class="card">
                    <div class="step">1</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s1_title}<br/><span>Q4 2021</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s1_quote}</div>
                    <div class="content2">{@html messages[$AppStore.lang].pyatiletka_s1_desc}</div>
                </div>
                <div class="card">
                    <div class="step">2</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s2_title}<br/><span>Q1 2022</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s2_quote}</div>
                    <div class="content2">{@html messages[$AppStore.lang].pyatiletka_s2_desc}</div>
                </div>
                <div class="card">
                    <div class="step">3</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s3_title}<br/><span>Q1 2022</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s3_quote}</div>
                    <div class="content2">{@html messages[$AppStore.lang].pyatiletka_s3_desc}</div>
                </div>
                <div class="card">
                    <div class="step">4</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s4_title}<br/><span>Q2 2022</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s4_quote}</div>
                    <div class="content2">{@html messages[$AppStore.lang].pyatiletka_s4_desc}</div>
                </div>
                <div class="card">
                    <div class="step">5</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s5_title}<br/><span>Q2 2022</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s5_quote}</div>
                    <div class="content2">{@html messages[$AppStore.lang].pyatiletka_s5_desc}</div>
                </div>
                <div class="card">
                    <div class="step">6</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s6_title}<br/><span>Q3 2022</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s6_quote}</div>
                    <div class="content2">{@html messages[$AppStore.lang].pyatiletka_s6_desc}</div>
                </div>
                <div class="card">
                    <div class="step">7</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s7_title}<br/><span>Q1 1917</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s7_quote}</div>
                    <div class="content2">{@html messages[$AppStore.lang].pyatiletka_s7_desc}</div>
                </div>
                <div class="card">
                    <div class="step">8</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s8_title}<br/></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s8_quote}</div>
                    <div class="content2">{@html messages[$AppStore.lang].pyatiletka_s8_desc}</div>
                </div>
            </div>
        </div>
    </section>
    <section class="about" id="about2">
        <div class="text-block">
            <h2 class="default-h2">{messages[$AppStore.lang].about_header}</h2>
            <p class="text">
                {@html messages[$AppStore.lang].about_text}
            </p>
      
        </div>
    </section>
    <img src="/img/girl.png" alt="" class="girl-person" class:showImg={0 < unique} in:scale={{ duration: 250 }} />
</main>
<h2 class="second-title">Октябрьская революция</h2>
{#key unique}
    <img src="/img/person.png" alt="" class="person-image" class:showImg={0 < unique} in:slide={{ duration: 250 }} />
{/key}

<style>
    main {
        position: absolute;
    }
    .roadmap {
        z-index: 99;
        margin: 0 auto !important;
        margin-top: 200px !important;
    }
    .roadmap .main-title {
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
    .roadmap .main-title span {
        font-family: "Arkhip";
        font-weight: normal;
        font-size: 6.25vw;
        line-height: 6.7708333333vw;
        letter-spacing: initial;
        margin-bottom: 2.0833333333vw;
        display: inline-block;
    }
    .roadmap .sub-title {
        font-family: 'Painting With Chocolate';
        font-style: normal;
        font-weight: normal;
        font-size: 2.5vw;
        align-items: center;
        text-align: center;
        color: #D81828;
    }
    .roadmap .desc {
        font-style: normal;
        font-weight: normal;
        font-size: 0.9375vw;
        line-height: 200%;
        text-align: center;
        color: #181818;
        max-width: 640px;
        margin-bottom: 60px;
    }
    .roadmap .second-title {
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
    .roadmap .pyatiletka-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 20;
        color: #181818;
    }
    .roadmap .pyatiletka-content .main-title {
        margin-top: 3.3333333333vw;
        margin-bottom: 3.6458333333vw;
    }
    .roadmap .pyatiletka-content .main-title span {
        margin-bottom: 0;
    }
    .roadmap .kolhoz {
        position: fixed;
        left: 0;
        top: 17vw;
        z-index: 19;
        opacity: 0.4;
    }
    .roadmap .newspaper {
        position: fixed;
        right: 0;
        bottom: 2.0833333333vw;
        z-index: 19;
        opacity: 0.4;
    }
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
    .timeline .card:nth-child(even) {
        right: -50%;
        left: unset;
        padding-left: 180px;
        padding-right: unset;
    }
    .timeline .card:nth-child(2) {
        top: -13.020833333333334vw;
    }
    .timeline .card:nth-child(3) {
        top: -20.4375vw;
    }
    .timeline .card:nth-child(4) {
        top: -28.25vw;
    }
    .timeline .card:nth-child(5) {
        top: -38.66666666666667vw;
    }
    .timeline .card:nth-child(6) {
        top: -33.85416666666667vw;
    }
    .timeline .card:nth-child(7) {
        top: -33.85416666666667vw;
    }
    .timeline .card:nth-child(8) {
        top: -33.85416666666667vw;
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
    .timeline .card:nth-child(even):before {
        left: -20px;
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
        left: 100px;
    }
    .timeline .card:nth-child(even)  .step{
        left: unset;
        right: 100px;
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
    .timeline .card .title span {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 900;
        font-size: 1.25vw;
        text-align: center;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: #D81828;
        position: relative;
        top: -10px;
    }
    .timeline .card .quote {
        font-weight: bold;
    }
    .timeline .card .quote, .timeline .card .content2 {
        position: relative;
        z-index: 3;
        font-family: 'Roboto Slab';
        font-style: normal;
        font-size: 0.9375vw;
        line-height: 200%;
        color: #181818;
    }
    @media screen and (min-width: 2560px) {
        .timeline .card {
            max-width: 600px;
        }
        .timeline .card .quote, .timeline .card .content {
            line-height: 175%;
        }
        .timeline .card .step {
            top: 140px;
            left: 150px;
        }
        .timeline .card:nth-child(even)  .step{
            left: unset;
            right: 150px;
        }
    }
    @media screen and (min-width: 3200px) {
        .timeline .card {
            max-width: 800px;
        }
        .timeline .card .quote, .timeline .card .content {
            line-height: 175%;
        }
        .timeline .card .step {
            top: 240px;
            left: 200px;
        }
        .timeline .card:nth-child(even)  .step{
            left: unset;
            right: 200px;
        }
        .timeline .card:nth-child(2) {
            top: -10.020833333333334vw;
        }
        .timeline .card:nth-child(3) {
            top: -20.4375vw;
        }
        .timeline .card:nth-child(4) {
            top: -28.25vw;
        }
        .timeline .card:nth-child(5) {
            top: -38.66666666666667vw;
        }
        .timeline .card:nth-child(6) {
            top: -30.85416666666667vw;
        }
        .timeline .card:nth-child(7) {
            top: -30.85416666666667vw;
        }
        .timeline .card:nth-child(8) {
            top: -30.85416666666667vw;
        }
    }
    @media screen and (min-width: 3840px) {
        .timeline .card {
            max-width: 1000px;
        }
        .timeline .card .quote, .timeline .card .content {
            line-height: 175%;
        }
        .timeline .card .step {
            top: 340px;
            left: 300px;
        }
        .timeline .card:nth-child(even)  .step{
            left: unset;
            right: 300px;
        }
        .timeline .card:nth-child(2) {
            top: -10.020833333333334vw;
        }
        .timeline .card:nth-child(3) {
            top: -20.4375vw;
        }
        .timeline .card:nth-child(4) {
            top: -24.25vw;
        }
        .timeline .card:nth-child(5) {
            top: -34.66666666666667vw;
        }
        .timeline .card:nth-child(6) {
            top: -26.85416666666667vw;
        }
        .timeline .card:nth-child(7) {
            top: -26.85416666666667vw;
        }
        .timeline .card:nth-child(8) {
            top: -26.85416666666667vw;
        }
    }









    .about {
        z-index: 22;
        margin: 0 auto !important;
        margin-top: 200px !important;
        position: relative;
    }
    .about .text {
        font-size: 0.9375vw;
        line-height: 200%;
        color: #181818;
    }
    .about .default-h2 {
        font-family: "Arkhip";
        font-style: normal;
        font-weight: normal;
        font-size: 2.5vw;
        line-height: 3.0208333333vw;
        text-transform: uppercase;
        color: #181818;
        max-width: 44vw;
    }
    .about .text-block {
        margin-top: 3.75vw;
        position: relative;
        z-index: 20;
        margin-left: 42vw;;
    }
    .about .text-block .text {
        max-width: 41.6666666667vw;
        margin-bottom: 2.0833333333vw;
    }
    .about .text-block .default-text {
        max-width: 41.6666666667vw;
    }
    .girl-person {
        width: 41.75vw;
        position: absolute;
        bottom: -6.25vw;
        z-index: 11;
        left: 1vw;
        visibility: hidden;
    }

    .wrapper, .about {
        width: 100%;
        max-width: 83.3333333333vw;
        margin: 0 auto;
        overflow: hidden;
    }
    .main-image {
        position: absolute;
        right: -21.3541666667vw;
        top: -3.3333333333vw;
        width: 58.8541666667vw;
        z-index: 20;
    }
    .person-image {
        position: absolute;
        right: 0;
        top: 6.7708333333vw;
        width: 45.9583333333vw;
        z-index: 20;
        visibility: hidden;
    }
    .showImg {
        visibility: visible;
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
        position: relative;
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
            display: none;
            top: auto;
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

    
        .about {
            margin-top: 50px !important;
        }
        .about .text {
            font-size: 3.75vw;
        }
        .about .default-h2 {
            font-size: 5.625vw;
            line-height: 6.71875vw;
            text-align: center;
            max-width: 70.3125vw;
        }
        .about .text-block {
            margin-top: 31.25vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: auto;
        }
        .about .text-block .text {
            max-width: 87.5vw;
            text-align: center;
        }
        .girl-person {
            /* width: 87.5vw;
            position: static;
            display: block;
            margin: 0 auto; */
            width: 87.5vw;
            position: absolute;
            z-index: 21;
            display: block;
            margin: 0 auto;
            animation: moveToEnd 0.5s linear forwards;
            animation-delay: 0.4s;
		}
        @keyframes moveToEnd { 
            0% { 
                transform: translateY(0);
            }
            90% {
                transform: translateY(100vh);
            }
            100% {
                transform: none;
                position: relative;
                margin-bottom: -100vh;
            }
        }

        .roadmap {
            margin-top: -100px !important;
            width: 100%;
            max-width: 83.3333333333vw;
            margin: 0 auto;
        }
        .roadmap .timeline::after {
            display: none;
        }
        .roadmap .timeline .card:before  {
            display: none;
        }
        .roadmap .timeline .card {
            left: unset !important;
            right: unset !important;
            top: 50px !important;
            padding: unset !important;
            margin-top:  8px;
            margin-bottom: 64px;
            border-bottom: 4px solid #ffffff;
        }
        .roadmap .timeline .card .step {
            color: #d81828;
            bottom: -32px !important;
            line-height: unset;
            top: unset !important;
            left: 0 !important;
            right: unset !important;
            font-size: 12vw;
            width: 100%;
            text-align: center;
        } 
        .roadmap .timeline .card .title span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 900;
            font-size: 3.5vw;
            text-align: center;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            color: #D81828;
            position: relative;
            top: -1px;
        }
        .roadmap .sub-title {
            font-size: 10vw;
            margin-top: -3vw;
        }
        .roadmap .desc {
            font-size: 3.9375vw;
            margin-bottom: 0;
        }
        .roadmap .timeline .card .title {
            font-size: 4.1vw;
        }
        .roadmap .timeline .card .quote {
            margin-top: 8px;
            font-size: 4vw;
            line-height: 150%;
        }
        .roadmap .timeline .card .content2 {
            margin-top: 8px;
            font-size: 4vw;
            line-height: 150%;
            margin-bottom: 24px;
        }
        .roadmap .main-title {
            margin-top: 33.75vw;
            margin-bottom: 1.5625vw;
            display: flex;
            align-items: center;
            flex-direction: column;
            font-size: 3.75vw;
            line-height: 4.375vw;
        }
        .roadmap .main-title span {
            font-size: 10vw;
            line-height: 12.03125vw;
            margin-bottom: 4.6875vw;
        }
        .roadmap .pyatiletka-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 20;
            color: #181818;
            top: 31.25vw;
        }
        .roadmap .pyatiletka-content .main-title {
            margin-bottom: 8.125vw;
        }
    }
</style>
