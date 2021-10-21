<script>
    import { slide } from 'svelte/transition';
    export let question = '';
    export let answer = '';

    let expand = false;
    const switchFaq = () => {
        expand = !expand;
    };
</script>

<div class="faq">
    <div class="title" on:click={switchFaq}>
        <span>{question}</span>
        <div class="ico" class:rotate={expand} />
    </div>
    {#if expand}
        <div class="desc" transition:slide|local={{ duration: 1000 }}>
            {answer}
        </div>
    {/if}
</div>

<style>
    .faq {
        width: 100%;
        margin-bottom: 24px;
    }
    .faq .title {
        padding-left: 24px;
        padding-right: -24px;
        cursor: pointer;
        background: #f8f0e0;
        border-radius: 4px;
        width: 100%;
        height: 80px;
        line-height: 80px;
        font-family: "Roboto Slab";
        font-style: normal;
        font-weight: normal;
        font-size: 1.25vw;
        line-height: 32px;
        display: flex;
        align-items: center;
        text-transform: uppercase;
        color: #181818;
        justify-content: space-between;
        margin-left: -12px;
    }
    .faq .title .ico {
        width: 32px;
        height: 16px;
        background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAzMiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMTZMMCAwSDMyTDE2IDE2WiIgZmlsbD0iI0UwMTgyOCIvPjwvc3ZnPg==");
        margin-right: 24px;
        transition: all .25s ease-in-out
    }
    .faq .title .ico.rotate {
        background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAzMiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEwwIDE2SDMyTDE2IDBaIiBmaWxsPSIjQTBBMEEwIi8+PC9zdmc+");
    }
    .faq .desc {
        margin: 32px 24px 0 24px;
        font-family: "Roboto Slab";
        font-style: normal;
        font-weight: normal;
        font-size: 1.25vw;
        line-height: 32px;
        align-items: center;
        color: #181818;
        display: flex;
    }
    @media screen and (max-width: 640px) {
        .faq .title {
            font-size: 5.625vw;
        }
        .faq .desc {
            line-height: 175%;
            font-size: 4vw;
        }
    }
</style>
