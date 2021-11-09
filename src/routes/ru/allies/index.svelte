<script lang="ts">
    import Allies from '$lib/pages/Allies.svelte';
    import { AppStore }  from '$lib/utils/Store'
 </script>
 
 <div class:hide={$AppStore.showLoader}>
    <Allies />
 </div>
 
 <style>
    .hide {
        display: none;
    }
 </style>