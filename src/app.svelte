<script lang="ts">
  import FigureId from "components/FigureId.svelte";
  import type { Figure } from "library/Figure";
  import { GameMap } from "library/GameMap";
  import { indexToName } from "library/indexToName";

  let map = new GameMap();
  let removes = new Set<Figure>();
  let reverse = false;

  map.appendFigures();

  let select: Figure | null = null;

  $: positions = select?.positions();
  $: normalMap = Object.entries(map).map<[number, Figure | null]>(
    ([i, val]) => [+i, val]
  );
  $: reversedMap = [...normalMap].reverse();

  function move(fig: Figure | null, to: number) {
    if (fig) removes.delete(fig);
    if (fig && fig.position !== -1) map[fig.position] = null;
    if (map[to]) removes.add(map[to]!);
    map[to] = select;
    removes = removes;
    select = null;
  }

  function reset() {
    map.fill(null);
    map.appendFigures();
    removes.clear();
    map = map;
    removes = removes;
  }

  function mouseClick(i: number) {
    return (e: MouseEvent) => {
      switch (e.button) {
        case 0: {
          if (select && positions?.includes(i)) {
            move(select, i);
            return;
          }

          if (!map[i] || select === map[i]) {
            select = null;
            return;
          }

          select = map[i];
          return;
        }

        case 1: {
          if (select) {
            move(select, i);
          }
          return;
        }

        case 2: {
          if (select) {
            select = null;
            return;
          }
          move(null, i);
          return;
        }
      }
    };
  }
</script>

<p>
  Select: {select?.position ?? -1} ( {select
    ? indexToName(select.position).join(" ")
    : "null"} ) {JSON.stringify(select)}
</p>

<p>
  <b>ЛКМ</b> - Выбор и перемещение (по правилам) <br />
  <b>СКМ</b> - Перемещение выбранной фигуры в любую клетку <br />
  <b>ПКМ</b> - Удаление фигуры <br /> <br />
  Исходный код искать на
  <a href="https://github.com/vicimpa/chess-svelte">GitHub</a>
</p>

<p>
  <button on:click={(_) => (reverse = !reverse)}>
    Перевернуть ({reverse ? "↑" : "↓"})</button
  >
  <button on:click={reset}> Сбросить </button>
</p>

<div class="content">
  <div class="list">
    {#each [...removes] as val}
      {#if val && !!val?.player === reverse}
        <div
          class="item"
          data-select={val && val === select}
          on:mousedown={({ button }) => !button && (select = val)}
        >
          {val?.char ?? ""}
        </div>
      {/if}
    {/each}
  </div>

  <div class="map">
    {#each reverse ? reversedMap : normalMap as [i, val], j}
      <div
        class="item"
        data-pos={(i + i / 8) & 1}
        data-select={val && val === select}
        data-can-move={positions?.includes(i)}
        data-negative={val?.player === 0}
        on:mousedown={mouseClick(i)}
      >
        <FigureId index={i} position={j} />

        {val?.char ?? ""}
      </div>
    {/each}
  </div>

  <div class="list">
    {#each [...removes] as val}
      {#if val && !val?.player === reverse}
        <div
          class="item"
          data-select={val && val === select}
          on:mousedown={({ button }) => !button && (select = val)}
        >
          {val?.char ?? ""}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style lang="sass">
  .map 
    margin: 10px
</style>
