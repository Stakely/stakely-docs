# Docusaurus

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
npm install
```

## Running the development server {#running-the-development-server}

To preview your changes as you edit the files, you can run a local development server that will serve your website and reflect the latest changes.

```
npm run start
```

By default, a browser window will open at [`http://localhost:3000`](http://localhost:3000).

Congratulations! You have just created your first Docusaurus site! Browse around the site to see what's available.

## Build {#build}

Docusaurus is a modern static website generator so we need to build the website into a directory of static contents and put it on a web server so that it can be viewed. To build the website:

```
npm run build
```

and contents will be generated within the `/build` directory, which can be copied to any static file hosting service like [GitHub pages](https://pages.github.com/), [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Check out the docs on [deployment](deployment.mdx) for more details.

## Updating your Docusaurus version {#updating-your-docusaurus-version}

There are many ways to update your Docusaurus version. One guaranteed way is to manually change the version number in `package.json` to the desired version. Note that all `@docusaurus/`-namespaced packages should be using the same version.

```
{
  "dependencies": {
    "@docusaurus/core": "3.1.1",
    "@docusaurus/preset-classic": "3.1.1",
    // ...
  }
}
```

Then, in the directory containing `package.json`, run your package manager's install command:

```
npm install
```

To check that the update occurred successfully, run:

```
npx docusaurus --version
```

You should see the correct version as output.

Alternatively, if you are using Yarn, you can do:

```
yarn upgrade @docusaurus/core@latest @docusaurus/preset-classic@latest
```

:::tip

Use new unreleased features of Docusaurus with the [`@canary` npm dist tag](/community/canary)

:::

## Problems? {#problems}

Ask for help on [Stack Overflow](https://stackoverflow.com/questions/tagged/docusaurus), on our [GitHub repository](https://github.com/facebook/docusaurus), our [Discord server](https://discordapp.com/invite/docusaurus), or [Twitter](https://twitter.com/docusaurus).
