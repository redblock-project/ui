<script>
    import '$lib/css/style.css';
    import { onMount } from "svelte";
    import { AppStore } from "$lib/utils/Store.js";
    import messages from "$lib/_locales/messages.json";

    let navPath = "/";
    onMount(async () => {
        if ("ru" === document.location.pathname.split("/")[1])
            $AppStore.lang = "ru";
        "ru" === $AppStore.lang
            ? (navPath = "/" + document.location.pathname.replace("/ru/", ""))
            : (navPath = document.location.pathname);
        try {
            await screen.orientation.lock("portrait");
        } catch (e) {}
    });

    const getHref = (href, lang) => {
        href = "/" === href[0] ? href.substr(1) : href;
        href = "/" === href[0] ? href.substr(1) : href;
        if ("ru" === lang) {
            return "" === href ? `/${lang}` : `/ru/${href}`;
        } else {
            return `/${href}`;
        }
    };
    const navigate = (href) => {
        $AppStore.mobileMenuShowed = false;
        navPath = href;
        return true;
    };
</script>

<header class="header" class:open={$AppStore.mobileMenuShowed}>
    <div class="wrapper">
        <a
            href={getHref("/", $AppStore.lang)}
            class="logotype"
            on:click={() => {
                navigate("/");
            }}
        >
            <img src="/img/logo.png" alt="logotype" />
        </a>
        <a
            href={getHref("/", $AppStore.lang)}
            class="logotype mobile-logo"
            on:click={() => {
                navigate("/");
            }}
        >
            <img src="/img/logo_w.png" alt="logotype" />
        </a>
        <div class="header__nav">
            <a
                href={getHref("about", $AppStore.lang)}
                class:current={"/about" === navPath}
                on:click={() => {
                    navigate("/about");
                }}>{messages[$AppStore.lang].nav_about}</a
            >
            <a
                href={getHref("mint", $AppStore.lang)}
                class:current={"/mint" === navPath}
                on:click={() => {
                    navigate("/mint");
                }}>{messages[$AppStore.lang].nav_mint}</a
            >
            <a
                href={getHref("kolhoz", $AppStore.lang)}
                class:current={"/kolhoz" === navPath}
                on:click={() => {
                    navigate("/kolhoz");
                }}>{messages[$AppStore.lang].nav_kolhoz}</a
            >
            <a
                href={getHref("wallet", $AppStore.lang)}
                class:current={"/wallet" === navPath}
                on:click={() => {
                    navigate("/wallet");
                }}>{messages[$AppStore.lang].nav_wallet}</a
            >
            <a
                href={getHref("hall", $AppStore.lang)}
                class:current={"/hall" === navPath}
                on:click={() => {
                    navigate("/hall");
                }}>{messages[$AppStore.lang].nav_hall}</a
            >
            <!-- <a
                href={getHref("faq", $AppStore.lang)}
                class:current={"/faq" === navPath}
                on:click={() => {
                    navigate("/faq");
                }}>{messages[$AppStore.lang].nav_faq}</a
            > -->
        </div>
        <div class="header__lang">
            <a
                href={getHref(navPath, "en")}
                class:active={"en" === $AppStore.lang}
                on:click={() => {
                    $AppStore.lang = "en";
                    $AppStore.mobileMenuShowed = false;
                }}>EN</a
            >
            <!-- <a
                href={getHref(navPath, "ru")}
                class:active={"ru" === $AppStore.lang}
                on:click={() => {
                    $AppStore.lang = "ru";
                    $AppStore.mobileMenuShowed = false;
                }}>RU</a
            > -->
        </div>
    </div>
</header>

<style>
    .wrapper {
        width: 100%;
        max-width: 83.3333333333vw;
        margin: 0 auto;
    }
    .header {
        z-index: 999;
        position: relative;
    }
    .header .wrapper {
        display: flex;
        align-items: center;
    }
    .header .logotype {
        margin-right: 32px;
        transition: transform 0.1s;
    }
    .header .logotype:hover {
        transform: scale(0.95);
    }
    .header .logotype.mobile-logo {
        display: none;
    }

    .header .logotype img {
        width: 5vw;
        height: 5vw;
    }
    .header__nav {
        display: flex;
        align-items: center;
    }
    .header__nav a {
        font-weight: normal;
        font-size: 1.25vw;
        line-height: 1.6666666667vw;
        text-transform: uppercase;
        color: #181818;
        text-decoration: none;
        margin-right: 2.8645833333vw;
        transition: all 0.1s;
    }
    .header__nav a:hover {
        transform: scale(0.95);
        color: #e01828;
    }
    .header__nav a:last-child {
        margin-right: 0;
    }
    .header__lang {
        display: flex;
        align-items: center;
        margin-left: auto;
        position: relative;
    }
    .header__lang a {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: #ffffff;
        background: #181818;
        text-decoration: none;
        cursor: pointer;
        transition: transform 0.1s;
    }
    .header__lang a:hover {
        transform: scale(0.95);
    }
    .header__lang a:first-child {
        margin-right: 8px;
    }
    .header__lang a.active {
        background: #e01828;
    }
    .current {
        transform: scale(1) !important;
        color: #686060 !important;
    }
    @media screen and (max-width: 640px) {
        .header {
            position: fixed;
            top: 0;
            bottom: 0;
            left: auto;
            background: url(/img/mb-bg.jpg);
            background-size: auto 100%;
            z-index: 50;
            right: -100%;
            transition: right 0.3s ease-in-out;
        }
        .header.open {
            position: fixed;
            display: block;
            right: 0;
            left: 0;
        }
        .header .wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        .header .logotype {
            position: fixed;
            top: 5vw;
            left: 5vw;
            z-index: 999;
        }
        .header .logotype img {
            width: 20vw !important;
            height: 20vw !important;
        }
        .header .logotype.mobile-logo {
            display: block;
            position: absolute;
        }
        .header__nav {
            flex-direction: column;
        }
        .header__nav a {
            margin-right: 0;
            font-size: 5.625vw;
            line-height: 300%;
            color: #ffffff;
            text-transform: none;
        }
        .header__lang {
            margin-left: 0;
            margin-top: 12.5vw;
        }
        .header__lang a {
            font-size: 3.75vw;
            line-height: 5vw;
            width: 15vw;
            height: 15vw;
        }
        .header__lang a:first-child {
            margin-right: 2.5vw;
        }
    }
</style>
