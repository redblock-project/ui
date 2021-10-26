<script lang="ts">
    import Kolhoz from '$lib/pages/Kolhoz.svelte';
    import { AppStore }  from '$lib/utils/Store'
 </script>
 
 <div class:hide={$AppStore.showLoader}>
    <Kolhoz />
 </div>
 
 <style>
    .hide {
        display: none;
    }
 </style>