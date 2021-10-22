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
        <div class="right">
            <div class="contacts">
                <a href="https://twitter.com/RedBlockCommune" target="_blank">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDQ4QzM3LjI1NDggNDggNDggMzcuMjU0OCA0OCAyNEM0OCAxMC43NDUyIDM3LjI1NDggMCAyNCAwQzEwLjc0NTIgMCAwIDEwLjc0NTIgMCAyNEMwIDM3LjI1NDggMTAuNzQ1MiA0OCAyNCA0OFoiIGZpbGw9IiMxQjlERjAiLz4KPHBhdGggZD0iTTE5LjYwODIgMzYuNjZDMzAuMjUyMiAzNi42NiAzNi4wNzIyIDI3Ljg0IDM2LjA3MjIgMjAuMTk2QzM2LjA3MjIgMTkuOTQ0IDM2LjA3MjIgMTkuNjkyIDM2LjA2MDIgMTkuNDUyQzM3LjE4ODIgMTguNjM2IDM4LjE3MjIgMTcuNjE2IDM4Ljk1MjIgMTYuNDUyQzM3LjkyMDIgMTYuOTA4IDM2LjgwNDIgMTcuMjIgMzUuNjI4MiAxNy4zNjRDMzYuODI4MiAxNi42NDQgMzcuNzQwMiAxNS41MTYgMzguMTcyMiAxNC4xNkMzNy4wNTYyIDE0LjgyIDM1LjgyMDIgMTUuMyAzNC41MDAyIDE1LjU2NEMzMy40NDQyIDE0LjQzNiAzMS45NDQyIDEzLjc0IDMwLjI3NjIgMTMuNzRDMjcuMDg0MiAxMy43NCAyNC40OTIyIDE2LjMzMiAyNC40OTIyIDE5LjUyNEMyNC40OTIyIDE5Ljk4IDI0LjU0MDIgMjAuNDI0IDI0LjY0ODIgMjAuODQ0QzE5LjgzNjIgMjAuNjA0IDE1LjU3NjIgMTguMyAxMi43MjAyIDE0Ljc5NkMxMi4yMjgyIDE1LjY0OCAxMS45NDAyIDE2LjY0NCAxMS45NDAyIDE3LjdDMTEuOTQwMiAxOS43MDQgMTIuOTYwMiAyMS40OCAxNC41MjAyIDIyLjUxMkMxMy41NzIyIDIyLjQ4OCAxMi42ODQyIDIyLjIyNCAxMS45MDQyIDIxLjc5MkMxMS45MDQyIDIxLjgxNiAxMS45MDQyIDIxLjg0IDExLjkwNDIgMjEuODY0QzExLjkwNDIgMjQuNjcyIDEzLjg5NjIgMjcgMTYuNTQ4MiAyNy41NEMxNi4wNjgyIDI3LjY3MiAxNS41NTIyIDI3Ljc0NCAxNS4wMjQyIDI3Ljc0NEMxNC42NTIyIDI3Ljc0NCAxNC4yOTIyIDI3LjcwOCAxMy45MzIyIDI3LjYzNkMxNC42NjQyIDI5Ljk0IDE2LjgwMDIgMzEuNjA4IDE5LjMzMjIgMzEuNjU2QzE3LjM1MjIgMzMuMjA0IDE0Ljg1NjIgMzQuMTI4IDEyLjE0NDIgMzQuMTI4QzExLjY3NjIgMzQuMTI4IDExLjIyMDIgMzQuMTA0IDEwLjc2NDIgMzQuMDQ0QzEzLjI5NjIgMzUuNyAxNi4zNDQyIDM2LjY2IDE5LjYwODIgMzYuNjZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" />
                </a>
                <a href="https://discord.gg/redblock" target="_blank">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM1ODY0RjIiLz4KPHBhdGggZD0iTTMyLjM4MTggMTYuMTA5OEMzMC44MDIxIDE1LjM4NSAyOS4xMDgxIDE0Ljg1MDkgMjcuMzM2OCAxNC41NDUxQzI3LjMwNDYgMTQuNTM5MiAyNy4yNzI0IDE0LjU1MzkgMjcuMjU1OCAxNC41ODM0QzI3LjAzNzkgMTQuOTcwOSAyNi43OTY2IDE1LjQ3NjQgMjYuNjI3NiAxNS44NzM4QzI0LjcyMjUgMTUuNTg4NiAyMi44MjcyIDE1LjU4ODYgMjAuOTYxMiAxNS44NzM4QzIwLjc5MjIgMTUuNDY3NiAyMC41NDIxIDE0Ljk3MDkgMjAuMzIzMyAxNC41ODM0QzIwLjMwNjYgMTQuNTU0OSAyMC4yNzQ0IDE0LjU0MDEgMjAuMjQyMiAxNC41NDUxQzE4LjQ3MTkgMTQuODUgMTYuNzc3OSAxNS4zODQgMTUuMTk3MiAxNi4xMDk4QzE1LjE4MzUgMTYuMTE1NyAxNS4xNzE4IDE2LjEyNTYgMTUuMTY0IDE2LjEzODNDMTEuOTUwOCAyMC45Mzg4IDExLjA3MDUgMjUuNjIxMyAxMS41MDIzIDMwLjI0NThDMTEuNTA0MyAzMC4yNjg0IDExLjUxNyAzMC4yOSAxMS41MzQ2IDMwLjMwMzhDMTMuNjU0NiAzMS44NjA3IDE1LjcwODEgMzIuODA1OCAxNy43MjM2IDMzLjQzMjNDMTcuNzU1OCAzMy40NDIyIDE3Ljc5IDMzLjQzMDQgMTcuODEwNSAzMy40MDM4QzE4LjI4NzMgMzIuNzUyNyAxOC43MTIzIDMyLjA2NjIgMTkuMDc2NyAzMS4zNDQzQzE5LjA5ODIgMzEuMzAyMSAxOS4wNzc2IDMxLjI1MTkgMTkuMDMzNyAzMS4yMzUyQzE4LjM1OTYgMzAuOTc5NSAxNy43MTc3IDMwLjY2NzcgMTcuMTAwMyAzMC4zMTM2QzE3LjA1MTQgMzAuMjg1MSAxNy4wNDc1IDMwLjIxNTMgMTcuMDkyNSAzMC4xODE4QzE3LjIyMjQgMzAuMDg0NSAxNy4zNTI0IDI5Ljk4MzIgMTcuNDc2NCAyOS44ODA5QzE3LjQ5ODkgMjkuODYyMiAxNy41MzAxIDI5Ljg1ODIgMTcuNTU2NSAyOS44N0MyMS42MTI4IDMxLjcyMiAyNi4wMDQzIDMxLjcyMiAzMC4wMTI3IDI5Ljg3QzMwLjAzOTEgMjkuODU3MyAzMC4wNzA0IDI5Ljg2MTIgMzAuMDkzOCAyOS44Nzk5QzMwLjIxNzkgMjkuOTgyMiAzMC4zNDc4IDMwLjA4NDUgMzAuNDc4NyAzMC4xODE4QzMwLjUyMzcgMzAuMjE1MyAzMC41MjA3IDMwLjI4NTEgMzAuNDcxOSAzMC4zMTM2QzI5Ljg1NDUgMzAuNjc0NiAyOS4yMTI2IDMwLjk3OTUgMjguNTM3NSAzMS4yMzQyQzI4LjQ5MzYgMzEuMjUwOSAyOC40NzQgMzEuMzAyMSAyOC40OTU1IDMxLjM0NDNDMjguODY3NyAzMi4wNjUyIDI5LjI5MjcgMzIuNzUxNyAyOS43NjA3IDMzLjQwMjhDMjkuNzgwMiAzMy40MzA0IDI5LjgxNTQgMzMuNDQyMiAyOS44NDc2IDMzLjQzMjNDMzEuODcyOCAzMi44MDU4IDMzLjkyNjQgMzEuODYwNyAzNi4wNDY0IDMwLjMwMzhDMzYuMDY1IDMwLjI5IDM2LjA3NjcgMzAuMjY5NCAzNi4wNzg2IDMwLjI0NjdDMzYuNTk1NCAyNC45MDA0IDM1LjIxMyAyMC4yNTYzIDMyLjQxNDEgMTYuMTM5M0MzMi40MDcyIDE2LjEyNTYgMzIuMzk1NSAxNi4xMTU3IDMyLjM4MTggMTYuMTA5OFpNMTkuNjgyNCAyNy40M0MxOC40NjEyIDI3LjQzIDE3LjQ1NDkgMjYuMzA4OCAxNy40NTQ5IDI0LjkzMTlDMTcuNDU0OSAyMy41NTUgMTguNDQxNyAyMi40MzM4IDE5LjY4MjQgMjIuNDMzOEMyMC45MzI5IDIyLjQzMzggMjEuOTI5NCAyMy41NjQ4IDIxLjkwOTggMjQuOTMxOUMyMS45MDk4IDI2LjMwODggMjAuOTIzMSAyNy40MyAxOS42ODI0IDI3LjQzWk0yNy45MTgxIDI3LjQzQzI2LjY5NjkgMjcuNDMgMjUuNjkwNyAyNi4zMDg4IDI1LjY5MDcgMjQuOTMxOUMyNS42OTA3IDIzLjU1NSAyNi42Nzc0IDIyLjQzMzggMjcuOTE4MSAyMi40MzM4QzI5LjE2ODYgMjIuNDMzOCAzMC4xNjUxIDIzLjU2NDggMzAuMTQ1NiAyNC45MzE5QzMwLjE0NTYgMjYuMzA4OCAyOS4xNjg2IDI3LjQzIDI3LjkxODEgMjcuNDNaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" />
                </a>
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
                <!-- AND FIRST CHILD MARGIN RIGHT DELETE IN MEDIA
                     <a
                    href={getHref(navPath, "ru")}
                    class:active={"ru" === $AppStore.lang}
                    on:click={() => {
                        $AppStore.lang = "ru";
                        $AppStore.mobileMenuShowed = false;
                    }}>RU</a
                > -->
            </div>
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
    .right {
        display: flex;
        align-items: center;
        margin-left: auto;
        position: relative;
    }
    .contacts {
        display: flex;
        margin-right: 24px;
    }
    .contacts a {
        transition: transform 0.1s;
    }
    .contacts a:first-child {
        margin-right: 8px;
    }
    .contacts a:hover {
        transform: scale(0.95);
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
            width: 100vw;
            height: 100%;
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
        .right {
            flex-wrap: wrap;
            flex-direction: column;
            top: 24px;
            margin-left: 0;
        }
        .contacts {
            margin-right: 0;
        }
        .contacts a:first-child {
            margin-right: 24px;
        }
        .header__lang {
            margin-left: 0;
            top: 24px;
        }
        .header__lang a:first-child {
            margin-right: 0;
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
