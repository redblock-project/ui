<script>
    import { onMount } from "svelte";
    import { fade, scale } from "svelte/transition";
    import { AppStore } from "$lib/utils/Store";
    import { delay } from "$lib/utils/utils";
    import messages from "$lib/_locales/messages.json";

    const fixInterSection = () => {
        let target = "header";
        let width = "43.75vw";
        setTimeout(async () => {
            const btn = document.querySelector(target).getBoundingClientRect();
            if (null !== document.querySelector(".girl-person")) {
                const img = document.querySelector(".girl-person").getBoundingClientRect();
                if ((btn.y + btn.height - 150) >= img.y) {
                    const diff = (btn.y + btn.height - 150) - img.y;
                    for (let i = 1; i < diff; i += 5) {
                        const el = document.querySelector(".girl-person");
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
    onMount(() => {
        document.body.style.overflowY = "scroll";
        setTimeout(() => {
            ready = true;
            if (640 >= screen.availWidth) {
                mobile = true;
            } else {
                fixInterSection();
            }
        }, 1e2);
    });
    const paperText = `for socialistic ideas to come true. First and foremost, we believe in the Soviet dream where all the people are respected and valued equally. Hence, our NFTs feature 893 different variables to exhibit the diversity of revolution tools. You can be anybody and you always make a difference. As Karl Marx said, “From each according to his ability, to each according to his needs”.`;
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].about_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
        <div class="text-block">
            <h2 class="default-h2">{messages[$AppStore.lang].about_header}</h2>
            <p class="text">
                {@html messages[$AppStore.lang].about_text}
            </p>
            <p class="default-text">
                Red Block is a collection of 9917 digital art collectibles on Ethereum blockchain. We are putting the Soviet era artifacts into modern reality so that you experience how it feels to be a revolutionary. We are building a society of freedom 
                {#if ready && !mobile}
                    {#each paperText as char, i}
                        <span in:fade={{ delay: 1000 + i * 100, duration: 50 }}>{char}</span>
                    {/each}
                {/if}
            </p>
        </div>
    </div>
</main>
<h2 class="second-title d-mb">Октябрьская революция</h2>
<h2 class="second-title second-title--multi d-dt">
    Развивается Красное знамя В наших красных сердцах!
</h2>
{#if ready}
    <img src="/img/girl.png" alt="" class="girl-person" class:toEnd={mobile} in:scale|local={{ duration: 300 }} />
{/if}

<style>
    .wrapper {
        width: 100%;
        max-width: 83.3333333333vw;
        margin: 0 auto;
    }
    .d-mb {
        display: none;
    }
    .text {
        font-size: 0.9375vw;
        line-height: 200%;
        color: #181818;
    }
    .default-h2 {
        font-family: "Arkhip";
        font-style: normal;
        font-weight: normal;
        font-size: 2.5vw;
        line-height: 3.0208333333vw;
        text-transform: uppercase;
        color: #181818;
        max-width: 44vw;
    }
    .text-block {
        margin-top: 3.75vw;
        position: relative;
        z-index: 20;
    }
    .text-block .text {
        max-width: 41.6666666667vw;
        margin-bottom: 2.0833333333vw;
    }
    .text-block .default-text {
        max-width: 41.6666666667vw;
    }
    .girl-person {
        width: 43.75vw;
        position: absolute;
        right: 6.25vw;
        bottom: -6.25vw;
        z-index: 11;
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
    .second-title--multi {
        position: absolute;
        max-width: 50vw;
        right: -16.6666666667vw;
    }
    @media screen and (max-width: 640px) {
        .d-mb {
            display: inline;
        }
        .text {
            font-size: 3.75vw;
        }
        .default-h2 {
            font-size: 5.625vw;
            line-height: 6.71875vw;
            text-align: center;
            max-width: 70.3125vw;
        }
        .d-dt {
            display: none;
        }
        .text-block {
            margin-top: 31.25vw;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .text-block .text {
            max-width: 87.5vw;
            text-align: center;
        }
        .text-block .default-text {
            display: none;
            /* position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
            max-width: 100%;
            font-size: 2.8125vw;
            opacity: 0.3; */
        }
        .girl-person {
            /* width: 87.5vw;
            position: static;
            display: block;
            margin: 0 auto; */
            width: 87.5vw;
            position: absolute;
            z-index: 11;
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
            }
        }
        .default-text {
            padding-left: 0;
            font-size: 2.8125vw;
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
    }
</style>
