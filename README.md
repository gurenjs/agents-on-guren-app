# agents-on-guren-app

The application under test in [Agents on Guren](https://github.com/gurenjs/agents-on-guren).

Scaffolded verbatim from the published generator, then committed as the baseline every benchmark task starts from. Two baselines exist; each task declares which one it starts from (`"baseline"` in its `task.json`, round 1 when absent).

| Round | Branch | Generator | Resolved in `bun.lock` |
|---|---|---|---|
| 1 (2026-08) | `main`, commit `56f4e64` | `bunx create-guren-app@1.8.0 agents-on-guren-app --blueprint blog --db sqlite --agents none` | `@guren/core` 1.6.1, `@guren/orm` 2.4.0, `@guren/server` 2.6.0, `@guren/cli` 2.5.0 |
| 2, Stage 2 tasks | `stage2` | `bunx create-guren-app@1.17.2 agents-on-guren-app --blueprint blog --db sqlite --agents none` | `@guren/core` 1.21.0, `@guren/orm` 2.12.0, `@guren/server` 2.26.0, `@guren/cli` 2.27.0 |

Each baseline also carries the first migration (`bun run db:make`), as the generator's next steps ask. Do not modify either baseline: the benchmark harness cuts a detached worktree from the task's baseline for every cell, applies the task's seed patch on top, and never touches these branches.
