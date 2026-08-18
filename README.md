# agents-on-guren-app

The application under test in [Agents on Guren](https://github.com/gurenjs/agents-on-guren).

Scaffolded verbatim from the published generator, then committed as the baseline every benchmark task starts from:

```bash
bunx create-guren-app@1.8.0 agents-on-guren-app --blueprint blog --db sqlite --agents none
```

Baseline commit `56f4e64` (`@guren/core` 1.6.1, `@guren/orm` 2.4.0, `@guren/server` 2.6.0, `@guren/cli` 2.5.0, resolved in `bun.lock`). Do not modify: the benchmark harness cuts a detached worktree from the baseline for every cell, applies the task's seed patch on top, and never touches `main`.
