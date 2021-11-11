<script>
    import { onMount } from "svelte";
    import { AppStore } from "$lib/utils/Store";
    import { scale, fade } from "svelte/transition";
    import messages from "$lib/_locales/messages.json";
    let ready = false;
    onMount(() => {
        ready = true;
    });
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].team_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
        <div class="kolhoz-content">
            <h1 class="main-title">
                <span>{messages[$AppStore.lang].team_header}</span>
            </h1>
            <div class="legends">
                <div class="legend">
                    {#if ready}
                        <img src="/img/denis.png" alt="" in:scale|local={{ duration: 1200 }} />
                    {/if}
                    <span>{messages[$AppStore.lang].team_denis}</span>
                    <div class="desc">{messages[$AppStore.lang].team_denis_desc}</div>
                </div>
                <div class="legend">
                    {#if ready}
                        <img src="/img/yegor.png" alt="" in:fade|local={{ duration: 1000 }} />
                    {/if}
                    <span>{messages[$AppStore.lang].team_egor}</span>
                    <div class="desc">{messages[$AppStore.lang].team_egor_desc}</div>
                </div>
                <div class="legend">
                    {#if ready}
                        <img src="/img/artem.png" alt="" in:fade|local={{ duration: 1200 }} />
                    {/if}
                    <span>{messages[$AppStore.lang].team_artem}</span>
                    <div class="desc">{messages[$AppStore.lang].team_artem_desc}</div>
                </div>
                <div class="legend">
                    {#if ready}
                        <img src="/img/omen.png" alt="" in:fade|local={{ duration: 1200 }} />
                    {/if}
                    <span>{messages[$AppStore.lang].team_omen}</span>
                    <div class="desc">{messages[$AppStore.lang].team_omen_desc}</div>
                </div>
            </div>
            <div class="legends second">
                <div class="legend">
                    {#if ready}
                        <img src="/img/george.png" alt="" in:scale|local={{ duration: 1200 }} />
                    {/if}
                    <span>{messages[$AppStore.lang].team_george}</span>
                    <div class="desc">{messages[$AppStore.lang].team_george_desc}</div>
                </div>
                <div class="legend">
                    {#if ready}
                        <img src="/img/vera.png" alt="" in:fade|local={{ duration: 1000 }} />
                    {/if}
                    <span>{messages[$AppStore.lang].team_vera}</span>
                    <div class="desc">{messages[$AppStore.lang].team_vera_desc}</div>
                </div>
                <div class="legend">
                    {#if ready}
                        <img src="/img/alex.png" alt="" in:fade|local={{ duration: 1200 }} />
                    {/if}
                    <span>{messages[$AppStore.lang].team_alexander}</span>
                    <div class="desc">{messages[$AppStore.lang].team_alexander_desc}</div>
                </div>
                <div class="legend">
                    {#if ready}
                        <img src="/img/anasi.png" alt="" in:fade|local={{ duration: 1200 }} />
                    {/if}
                    <span>{messages[$AppStore.lang].team_anasi}</span>
                    <div class="desc">{messages[$AppStore.lang].team_anasi_desc}</div>
                </div>
            </div>
        </div>
    </div>
</main>
<h2 class="second-title d-mb">Октябрьская революция</h2>

<style>
    .second {
        margin-top: 32px;
        margin-bottom: 64px;
    }
    .legends {
        display: flex;
        z-index: 99;
        justify-content: center;
        overflow: hidden;
    }
    .legend img {
        max-width: 350px;
    }
    .legend span {
        font-family: "Painting With Chocolate";
        font-style: normal;
        font-weight: normal;
        font-size: 2.5vw;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        color: #D81828;
        
    }
    .legend .desc {
        font-family: "Roboto Slab";
        font-style: normal;
        font-weight: normal;
        font-size: 1vw;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        color: #181818;
        max-width: 320px;
        margin: 0 auto;
        margin-top: 16px;
    }
    @media screen and (max-width: 1280px) {
        .legends {
            flex-wrap: wrap;
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

    .d-mb {
        display: none;
    }
    @media screen and (max-width: 640px) {
        .legend img {
            width: 90vw;
        }       
        .legend span {
            font-size: 8.75vw;
        }      
        .legend .desc {
            font-size: 5.75vw;
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
        .kolhoz-content .main-title {
            margin-top: 31.25vw;
            margin-bottom: 8.125vw;
        }
        .d-mb {
            display: inline;
        }
    }
</style>
