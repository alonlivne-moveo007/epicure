# Epicure



✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## How to run the app

After cloning, install dependencies from the repo root:

```sh
npm install
```

The CMS (Strapi) lives in `apps/cms` and is not in npm workspaces; install its dependencies once:

```sh
cd apps/cms && npm install && cd ../..
```

**Environment and secrets**

- **Root `.env`** – Used by Docker Compose (Strapi and other services). Copy `.env.example` to `.env` and set real values.
- **Strapi** – Can use root `.env` when run via Docker, or `apps/cms/.env` for local runs. If `apps/cms/.env` doesn't exist, copy `apps/cms/.env.example` and set at least `ADMIN_JWT_SECRET` and the other keys (e.g. `openssl rand -base64 32` for secrets).

Run the three apps in **separate terminals** from the repo root:

| Terminal       | Command                          | URL                                                        |
| -------------- | -------------------------------- | ---------------------------------------------------------- |
| 1 – Frontend   | `nx serve @epicure/frontend`     | [http://localhost:3000](http://localhost:3000)             |
| 2 – Backend    | `nx serve @epicure/backend`      | [http://localhost:3002/api](http://localhost:3002/api)     |
| 3 – Strapi CMS | `nx develop cms`                | http://localhost:1337/admin                               |

You can also use the root scripts: `npm run frontend` and `npm run backend` (backend builds then runs with Node on port 3002).

### Run with Docker

Run the whole stack (frontend → backend → cms) with one command:

```sh
# First time: copy env and set Strapi secrets (see .env.example)
cp .env.example .env

docker compose up --build
```

- **App:** [http://localhost:3000](http://localhost:3000)
- **Strapi admin:** [http://localhost:1337/admin](http://localhost:1337/admin)

Ensure root `.env` exists (or `apps/cms/.env`); the cms service loads it via docker-compose.

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/ZEO24kvnrq)

## Project layout

- **Apps** – `apps/backend` (NestJS), `apps/frontend` (Next.js), `apps/cms` (Strapi), `apps/backend-e2e`
- **Libs** – `libs/` for shared code (e.g. `libs/backend/types` → `@epicure/backend-types`)

## Generate a library

```sh
npx nx g @nx/js:lib my-lib --directory=libs/shared/my-lib --importPath=@epicure/shared-my-lib --no-interactive
```

## Run tasks

To build a library (e.g. shared types):

```sh
npx nx build @epicure/backend-types
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

Project names: `@epicure/backend`, `@epicure/frontend`, `@epicure/backend-e2e`, `@epicure/backend-types`, `cms`.

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

