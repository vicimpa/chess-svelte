<script lang="ts">
  import type { Figure } from "library/Figure";
  import { GameMap } from "library/GameMap";

  let map = new GameMap();
  let removes = new Set<Figure>();

  map.appendFigures();

  let select: Figure | null = null;
  $: positions = select?.positions();

  function move(fig: Figure | null, to: number) {
    if (fig) removes.delete(fig);
    if (fig && fig.position !== -1) map[fig.position] = null;
    if (map[to]) removes.add(map[to]!);
    map[to] = select;
    removes = removes;
    select = null;
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
          if (select) return;
          move(null, i);
          return;
        }
      }
    };
  }
</script>

<p>Select: {select?.position ?? -1} {JSON.stringify(select)}</p>
<p>Positions: {JSON.stringify(positions)}</p>

<p>
  <b>ЛКМ</b> - Выбор и перемещение (по правилам) <br />
  <b>СКМ</b> - Перемещение выбранной фигуры в любую клетку <br />
  <b>ПКМ</b> - Удаление фигуры <br /> <br />
  Исходный код искать на
  <a href="https://github.com/vicimpa/chess-svelte">GitHub</a>
</p>

<p>Удалённые фигуры</p>

<div class="list">
  {#each [...removes] as val}
    <div
      class="item"
      data-select={val && val === select}
      on:mousedown={({ button }) => !button && (select = val)}
    >
      {val?.char ?? ""}
    </div>
  {/each}
</div>

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
