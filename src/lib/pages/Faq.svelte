<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { AppStore } from "$lib/utils/Store";
    import FaqItem from "$lib/components/FaqItem.svelte";
    import { delay } from "$lib/utils/utils";
    import messages from "$lib/_locales/messages.json";

    const fixInterSection = () => {
        let target = ".faq";
        let width = "29vw";
        setTimeout(async () => {
            if (null === document.querySelector(target)) return;
            const btn = document.querySelector(target).getBoundingClientRect();
            if (null !== document.querySelector(".boy-person")) {
                const img = document.querySelector(".boy-person").getBoundingClientRect();
                console.log(btn)
                console.log(img)
                if ((btn.x - 10) <= (img.x + img.width)) {
                    const diff = (img.x + img.width) - (btn.x - 10);
                    for (let i = 1; i < diff; i += 5) {
                        const el = document.querySelector(".boy-person");
                        if (null !== el) {
                            el.style.width = `calc(${width} - ${(i)}px)`;
                        }
                        await delay(10);
                    }
                }
            }
        }, 9e2);
    }
    let ready = false, mobile = false, unique = 0;
    onMount(() => {
        document.body.style.overflowY = "scroll";
        setTimeout(() => {
            ready = true;
            unique++;
            if (640 >= screen.availWidth) {
                mobile = true;
            } else {
                fixInterSection();
            }
        }, 6e2);
    });
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].faq_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
        <div class="faq-content">
            <h1 class="main-title">
                <span>{messages[$AppStore.lang].faq_header}</span>
            </h1>
            <div class="faq-content__columns">
                {#each Array(13) as _, i}
                    <FaqItem question={messages[$AppStore.lang][`faq_q${i + 1}`]} answer={messages[$AppStore.lang][`faq_a${i + 1}`]} />
                {/each}
            </div>
        </div>
    </div>
</main>
<h2 class="second-title d-mb">Октябрьская революция</h2>
{#key unique}
    <img src="/img/boy.png" alt="" class="boy-person" class:showImg={0 < unique} in:fade={{ duration: 250 }} />
{/key}

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
        margin-bottom: 0;
    }
    .boy-person {
        width: 29vw;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 99;
        visibility: hidden;
    }
    .showImg {
        visibility: visible;
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
    .faq-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 20;
        color: #181818;
        z-index: 999;
    }
    .mint-content .main-title span {
        margin-bottom: 0;
    }
    .faq-content__columns {
        display: flex;
        justify-content: center;
        width: 100%;
        max-width: 800px;
        margin-bottom: 5.2083333333vw;
        flex-direction: column;
    }

    .d-mb {
        display: none;
    }
    @media screen and (max-width: 640px) {
        .boy-person {
            width: 87.5vw;
            position: absolute;
            left: 0;
            display: block;
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
                z-index: 11;
                left: 0;
                margin-bottom: -100vh;
            }
        }
        .main-title {
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
        .faq-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 20;
            color: #181818;
            top: 33.75vw;
        }
        .faq-content .main-title {
            margin-bottom: 8.125vw;
        }
        .d-mb {
            display: inline;
        }
    }
</style>
