<script lang="ts">
  import { indexToName } from "library/indexToName";

  export let index: string | number = -1;
  export let position = index;

  $: i = +index;
  $: p = +position;

  $: [a, b] = indexToName(i);
</script>

{#if p >= 0 && p <= 7}
  <span class="top">
    {a}
  </span>
{/if}

{#if p >= 56 && p <= 63}
  <span class="bottom">
    {a}
  </span>
{/if}

{#if p % 8 === 0}
  <span class="left">
    {b}
  </span>
{/if}

{#if p % 8 === 7}
  <span class="right">
    {b}
  </span>
{/if}

<style lang="sass">
  .top, .bottom, .left, .right
    position: absolute
    display: flex
    justify-content: center
    align-items: center
    font-size: 12px
    padding: 8px

  .top, .bottom
    left: 0
    right: 0

  .left, .right
    top: 0
    bottom: 0

  .top
    bottom: 100%

  .bottom
    top: 100%

  .left
    right: 100%

  .right
    left: 100%
</style>
