<script lang="ts">
  import type { Figure } from "library/Figure";
  import { GameMap } from "library/GameMap";

  let map = new GameMap();

  map.appendFigures();

  let select: Figure | null = null;
  $: positions = select?.positions();

  function move(fig: Figure, to: number) {
    if (fig.position !== -1) map[fig.position] = null;
    map[to] = select;
    select = null;
  }

  function mouseClick(i: number) {
    return (e: MouseEvent) => {
      switch (e.button) {
        case 0: {
          if (select && positions?.includes(i)) {
            return move(select, i);
          }

          if (!map[i] || select === map[i]) {
            return (select = null);
          }

          select = map[i];
          return;
        }

        case 1: {
          if (select) {
            return move(select, i);
          }
        }

        case 2: {
          return (map[i] = null);
        }
      }
    };
  }
</script>

<p>Select: {select?.position ?? -1} {JSON.stringify(select)}</p>
<p>Positions: {JSON.stringify(positions)}</p>

<div class="map">
  {#each map as val, i}
    <div
      class="item"
      data-pos={(i + i / 8) & 1}
      data-select={val && val === select}
      data-can-move={positions?.includes(i)}
      on:mousedown={mouseClick(i)}
    >
      {val?.char ?? ""}
    </div>
  {/each}
</div>
