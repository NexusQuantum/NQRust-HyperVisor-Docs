// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "NQRust HyperVisor",
  tagline: "The open-source hyperconverged infrastructure solution for a cloud-native world",
  url: 'https://hypervisor.nexusquantum.id',
  baseUrl: '/docs/',
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  // favicon: "img/favicon.ico",
  favicon: "img/logo_hypervisor.png",
  organizationName: "Nexus Quantum", 
  projectName: "docs",
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en", "zh"],
  //   path: "i18n",
  //   localeConfigs: {
  //     en: {
  //       label: "English",
  //     },
  //     zh: {
  //       label: "Chinese (Simplified)",
  //     },
  //   },
  // },
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve("swc-loader"),
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          target: "es2019",
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
        module: {
          type: isServer ? "commonjs" : "es6",
        },
      },
    }),
  },
  themes: ["docusaurus-theme-openapi-docs"],
  presets: [
    [
      'classic',
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,
          editUrl: "https://github.com/nqrhypervisor/docs/edit/main/",
          docItemComponent: "@theme/ApiItem",
          lastVersion: 'v1.6',
          versions: {
            current: {
              label: 'v1.7 (Dev)',
              path: 'v1.7',
            },
            "v1.6": {
              label: 'v1.6 (Latest)',
              path: '',
              // path: 'v1.6',
            },
            "v1.5": {
              label: 'v1.5',
              path: 'v1.5',
              banner: `none`
            },
            "v1.4": {
              label: 'v1.4 (EOL)',
              path: 'v1.4',
              banner: `unmaintained`
            },
            "v1.3": {
              label: 'v1.3 (EOL)',
              path: 'v1.3',
              banner: `unmaintained`
            },
            "v1.2": {
              label: 'v1.2 (EOL)',
              path: 'v1.2',
              banner: `unmaintained`
            },
            "v1.1": {
              label: 'v1.1 (EOL)',
              path: 'v1.1',
              banner: `unmaintained`
            },
            "v1.0": {
              label: 'v1.0 (EOL)',
              path: 'v1.0',
              banner: `unmaintained`
            },
            "v0.3": {
              label: 'v0.3 (EOL)',
              path: 'v0.3',
              banner: `unmaintained`
            }
          }
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleTagManager: {
          containerId: 'GTM-57KS2MW',
        },
      }),
    ],
  ],
  themeConfig: {
    zoom: {},
    // algolia: {
    //   appId: 'U7QCSJFCWR',
    //   apiKey: '954c1b1327687e818ef6930a5e8f8770',
    //   indexName: 'NQR HyperVisor',
    //   contextualSearch: true,
    //   searchParameters: {},
    //   // Optional: path for search page that enabled by default (`false` to disable it)
    //   searchPagePath: 'search',
    // },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: "NQRust HyperVisor",
      logo: {
        alt: "NQR HyperVisor Logo",
        src: "img/logo_nqr.png",
      },
      items: [
        // {
        //   type: 'docsVersionDropdown',
        //   position: 'left',
        //   dropdownActiveClassDisabled: true,
        // },
        {
          type: "localeDropdown",
          position: "left",
        },
        // {
        //   type: 'search',
        //   position: 'left',
        // },
        {
          type: 'dropdown',
          label: 'Quick Links',
          position: 'right',
          items: [
            {
              href: "https://nexusquantum.id/",
              label: "NexusQuantum Home",
            },
          ],
        },
      ],
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: "light",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} SUSE Rancher. All Rights Reserved.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['hcl'],
    },
    languageTabs: [
      {
        highlight: "bash",
        language: "curl",
        logoClass: "bash",
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
        variant: "requests",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },
      {
        highlight: "javascript",
        language: "nodejs",
        logoClass: "nodejs",
        variant: "axios",
      }
    ]
  },
  customFields: {
    title: "NQR HyperVisor - Open-source hyperconverged infrastructure",
    description:
      "The open-source hyperconverged infrastructure solution for a cloud-native world",
  },
  plugins: [
    require.resolve('docusaurus-plugin-image-zoom'),
    [
      '@docusaurus/plugin-client-redirects',
      {
        /**
         * @typedef {string[]} RedirectArray
         */
        /**
         * @typedef {RedirectArray|undefined} RedirectsReturn
         */

        /**
         * Create redirect function for plugin-client-redirects
         * @param {string|undefined} existingPath
         * @returns {RedirectsReturn}
         */
        createRedirects(existingPath) {
          if (typeof existingPath !== 'string') {
            return undefined;
          }

          if (/^\/(?:api|dev\/api)(?:\/|$)/.test(existingPath)) {
            return undefined;
          }

          if (/^\/v\d+\.\d+\/(?:api)(?:\/|$)/.test(existingPath)) {
            return undefined;
          }

          if (existingPath === '/') {
            return ['/v1.6/', '/v1.6', '/latest/', '/latest'];
          }

          return [
            `/v1.6${existingPath}`,
            `/latest${existingPath}`,
          ];
        }
      },
    ],
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api",
        docsPluginId: "classic", // e.g. "classic" or the plugin-content-docs id
        config: {
          api: { // "api" is considered the <id> that you will reference in the CLI
            specPath: "api/dev-swagger.json", // path or URL to the OpenAPI spec
            outputDir: "docs/api", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
            version: "dev", // Current version
            label: "dev", // Current version label
            baseUrl: "/dev/api", // Leading slash is important
            versions: {
              "v1.6": {
                specPath: "api/v1.6-swagger.json",
                outputDir: "versioned_docs/version-v1.6/api", // No trailing slash
                label: "v1.6",
                baseUrl: "/v1.6/api", // Leading slash is important
              },              
              "v1.5": {
                specPath: "api/v1.5-swagger.json",
                outputDir: "versioned_docs/version-v1.5/api", // No trailing slash
                label: "v1.5",
                baseUrl: "/v1.5/api", // Leading slash is important
              },              
              "v1.4": {
                specPath: "api/v1.4-swagger.json",
                outputDir: "versioned_docs/version-v1.4/api", // No trailing slash
                label: "v1.4",
                baseUrl: "/v1.4/api", // Leading slash is important
              },              
              "v1.3": {
                specPath: "api/v1.3-swagger.json",
                outputDir: "versioned_docs/version-v1.3/api", // No trailing slash
                label: "v1.3",
                baseUrl: "/v1.3/api", // Leading slash is important
              },
              "v1.2": {
                specPath: "api/v1.2-swagger.json",
                outputDir: "versioned_docs/version-v1.2/api", // No trailing slash
                label: "v1.2",
                baseUrl: "/v1.2/api", // Leading slash is important
              },
              "v1.1": {
                specPath: "api/v1.1-swagger.json",
                outputDir: "versioned_docs/version-v1.1/api", // No trailing slash
                label: "v1.1",
                baseUrl: "/v1.1/api", // Leading slash is important
              },
            },
          },
        },
      },
    ],
  ],
  scripts: [
    {
      src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
      type:'text/javascript',
      charset: 'UTF-8',
      'data-domain-script': '019aa0c6-dbb5-77a5-9e27-54cc31a91bba',
      async: true
    },
    {
      src: '/scripts/optanonwrapper.js',
      type:'text/javascript',
      async: true
    },
  ],
};

module.exports = config;
