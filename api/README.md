# API

To install dependencies:

```bash
bun install
```

Create an env file with the following variables

```env
DATABASE_URL="file:./dev.db"
```

Generate Prisma client

```
bunx prisma generate
```

To run:

```bash
bun run index.ts
```


This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
