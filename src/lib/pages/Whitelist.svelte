<script>
    import { onMount } from "svelte";
    import { AppStore } from "$lib/utils/Store";
    import messages from "$lib/_locales/messages.json";
    onMount(() => {
    });

    const showModal = () => {
        $AppStore.showModal = true;
    };
</script>

<svelte:head>
    <title>{messages[$AppStore.lang].kolhoz_title}</title>
</svelte:head>
<main>
    <div class="wrapper">
        <div class="kolhoz-content">
            <h1 class="main-title">
                <span>WHITE</span>
            </h1>
            <h1 class="sub-title">
                <span>list</span>
            </h1>
            <div class="text">
                {@html messages[$AppStore.lang].redlist_content}
            </div>
        
            <h3>{messages[$AppStore.lang].redlist_discord}</h3>
            <a class="default-button" href="https://forms.gle/sBgQ6LFA4mvfiD7P8" target="_blank">
                <span>{messages[$AppStore.lang].redlist_discord_btn}</span>
            </a>
        </div>
        <div class="back">
            <img src="/img/logo_redlist.png" alt="" />
        </div>
    </div>
</main>
<h2 class="second-title d-mb">Октябрьская революция</h2>
<img src="/img/mark.png" alt="coin" class="mark-image d-dt" />

<style>
    h3 {
        margin-top: 50px;
        font-family: 'Arkhip';
        font-style: normal;
        font-weight: normal;
        font-size: 2.5vw;
        display: flex;
        align-items: center;
        text-align: center;
        text-transform: uppercase;
        color: #FFFFFF;
        margin-bottom: 0;
    }
    .wrapper {
        width: 100%;
        max-width: 83.3333333333vw;
        margin: 0 auto;
    }

    .back {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .back img {
        width: 98vw;
        max-width: 1080px;
    }
    .main-title {
        font-family: "Arkhip";
        font-weight: 900;
        font-size: 6.25vw;
        color: #ffffff;
        z-index: 20;
        position: relative;
        margin: 0;
        margin-bottom: 0;
        margin-top: 4.375vw;
        display: block;
    }
    .main-title span {
        font-family: "Arkhip";
        font-weight: normal;
        font-size: 6.25vw;
        letter-spacing: initial;
        margin-bottom: 2.0833333333vw;
        display: inline-block;
    }
    .sub-title span {
        font-family: "Painting With Chocolate";
        font-style: normal;
        font-weight: normal;
        font-size: 3.3333333333333335vw;
        display: flex;
        align-items: center;
        text-align: center;
        color: #ffffff;
    }
    .text {
        max-width: 1024px;
        font-style: normal;
        font-weight: normal;
        font-size: 0.9375vw;
        line-height: 200%;
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
        margin-bottom: 0;
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
        margin-top: 32px;
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
    
    @media screen and (min-width: 2560px) {
        .text {
            max-width: 1600px;
        }
    }
    @media screen and (max-width: 640px) {
        .main-title {
            margin-top: 33.75vw;
            display: flex;
            align-items: center;
            flex-direction: column;
            font-size: 3.75vw;
        }
        .main-title span {
            font-size: 10vw;
            line-height: 12.03125vw;
            margin-bottom: 4.6875vw;
        }
        .sub-title {
            margin-top: 0;
        }
        .text {
            font-size: 3.8125vw;
            line-height: 180%;
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
            width: 100vw;
            overflow-x: hidden;
        }
        .default-button {
            margin-top: 40px;
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
        .kolhoz-content .main-title {
            margin-top: 31.25vw;
            margin-bottom: 0;
        }
        .d-mb {
            display: inline;
        }
        h3 {
            margin-top: 50px;
            font-size: 5.5vw;
        }
    }
</style>
