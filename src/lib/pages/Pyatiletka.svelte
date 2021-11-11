<script lang="ts">
    import { onMount } from "svelte";
    import { AppStore } from "$lib/utils/Store";
    import messages from "$lib/_locales/messages.json";

    onMount(() => {
    });
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].pyatiletka_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
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
                    <div class="content">{@html messages[$AppStore.lang].pyatiletka_s1_desc}</div>
                </div>
                <div class="card">
                    <div class="step">2</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s2_title}<br/><span>Q1 2022</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s2_quote}</div>
                    <div class="content">{@html messages[$AppStore.lang].pyatiletka_s2_desc}</div>
                </div>
                <div class="card">
                    <div class="step">3</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s3_title}<br/><span>Q1 2022</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s3_quote}</div>
                    <div class="content">{@html messages[$AppStore.lang].pyatiletka_s3_desc}</div>
                </div>
                <div class="card">
                    <div class="step">4</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s4_title}<br/><span>Q2 2022</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s4_quote}</div>
                    <div class="content">{@html messages[$AppStore.lang].pyatiletka_s4_desc}</div>
                </div>
                <div class="card">
                    <div class="step">5</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s5_title}<br/><span>Q2 2022</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s5_quote}</div>
                    <div class="content">{@html messages[$AppStore.lang].pyatiletka_s5_desc}</div>
                </div>
                <div class="card">
                    <div class="step">6</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s6_title}<br/><span>Q3 2022</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s6_quote}</div>
                    <div class="content">{@html messages[$AppStore.lang].pyatiletka_s6_desc}</div>
                </div>
                <div class="card">
                    <div class="step">7</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s7_title}<br/><span>Q1 1917</span></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s7_quote}</div>
                    <div class="content">{@html messages[$AppStore.lang].pyatiletka_s7_desc}</div>
                </div>
                <div class="card">
                    <div class="step">8</div>
                    <div class="title">{@html messages[$AppStore.lang].pyatiletka_s8_title}<br/></div>
                    <div class="quote">{@html messages[$AppStore.lang].pyatiletka_s8_quote}</div>
                    <div class="content">{@html messages[$AppStore.lang].pyatiletka_s8_desc}</div>
                </div>
            </div>
        </div>
    </div>
</main>
<h2 class="second-title d-mb">Октябрьская революция</h2>

<img src="/img/kolhoz.png" alt="kolkhoz" class="kolhoz d-dt" />
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
    .timeline .card .quote, .timeline .card .content {
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
    .sub-title {
        font-family: 'Painting With Chocolate';
        font-style: normal;
        font-weight: normal;
        font-size: 2.5vw;
        align-items: center;
        text-align: center;
        color: #D81828;
    }
    .desc {
        font-style: normal;
        font-weight: normal;
        font-size: 0.9375vw;
        line-height: 200%;
        text-align: center;
        color: #181818;
        max-width: 640px;
        margin-bottom: 60px;
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
    .kolhoz {
        position: fixed;
        left: 0;
        top: 17vw;
        z-index: 19;
        opacity: 0.4;
    }
    .newspaper {
        position: fixed;
        right: 0;
        bottom: 2.0833333333vw;
        z-index: 19;
        opacity: 0.4;
    }
    @media screen and (max-width: 1280px) {
        .timeline .card .step {
            top: -20px;
        }
        .kolhoz {
            width: 15vw;
        }
        .newspaper {
            width: 15vw;
        }
        .timeline .card:nth-child(3) {
            top: -17.4375vw;
        }
        .timeline .card:nth-child(4) {
            top: -21.25vw;
        }
        .timeline .card:nth-child(5) {
            top: -23.66666666666667vw;
        }
        .timeline .card:nth-child(6) {
            top: -17.85416666666667vw;
        }
        .timeline .card:nth-child(7) {
            top: -7.85416666666667vw;
        }
        .timeline .card:nth-child(8) {
            top: -8.85416666666667vw;
        }
    }
    .d-mb {
        display: none;
    }
    @media screen and (max-width: 1024px) {
        .timeline::after {
            display: none;
        }
        .timeline .card {
            left: unset !important;
            right: unset !important;
            top: 50px !important;
            padding: unset !important;
            margin-top:  8px;
            margin-bottom: 64px;
            border-bottom: 4px solid #ffffff;
            max-width: 90vw;
        }
        .timeline .card:before {
            display: none;
        }
        .timeline .card .step {
            color: #d81828;
            bottom: -64px !important;
            line-height: unset;
            top: unset !important;
            left: 0 !important;
            right: unset !important;
            font-size: 8vw;
            width: 100%;
            text-align: center;
        }
        .kolhoz {
            display: none;
        }
        .newspaper {
            display: none;
        }
        .sub-title {
            font-size: 10vw;
            margin-top: -3vw;
        }
        .desc {
            font-size: 3.9375vw;
            margin-bottom: 0;
        }
        .timeline .card .title {
            font-size: 4.1vw;
        }    
        .timeline .card .title span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 900;
            font-size: 3.25vw;
            text-align: center;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            color: #D81828;
            position: relative;
            top: -10px;
        }
        .timeline .card .quote {
            margin-top: 8px;
            font-size: 3.2vw;
            line-height: 150%;
        }
        .timeline .card .content {
            margin-top: 8px;
            font-size: 3vw;
            line-height: 150%;
            margin-bottom: 24px;
        }
    }
    @media screen and (max-width: 640px) {
        .timeline::after {
            display: none;
        }
        .timeline .card {
            left: unset !important;
            right: unset !important;
            top: 50px !important;
            padding: unset !important;
            margin-top:  8px;
            margin-bottom: 64px;
            border-bottom: 4px solid #ffffff;
        }
        .timeline .card .step {
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
        .timeline .card .title span {
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
        .kolhoz {
            display: none;
        }
        .newspaper {
            display: none;
        }
        .sub-title {
            font-size: 10vw;
            margin-top: -3vw;
        }
        .desc {
            font-size: 3.9375vw;
            margin-bottom: 0;
        }
        .timeline .card .title {
            font-size: 4.1vw;
        }
        .timeline .card .quote {
            margin-top: 8px;
            font-size: 4vw;
            line-height: 150%;
        }
        .timeline .card .content {
            margin-top: 8px;
            font-size: 4vw;
            line-height: 150%;
            margin-bottom: 24px;
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
        .d-mb {
            display: inline;
        }
    }
</style>
