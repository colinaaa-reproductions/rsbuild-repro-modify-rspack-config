import { defineConfig } from "@rsbuild/core";
import type { RsbuildPlugin } from "@rsbuild/core";

export default defineConfig({
  output: {
    distPath: {
      root: "./rsbuild-dist",
    },
  },
  plugins: [
    {
      name: "foo",
      setup(api) {
        api.modifyRspackConfig((config) => {
          return {
            ...config,
            module: {
              ...config.module,
              rules: [
                ...(config.module?.rules || []),
                {
                  test: /\.foo/,
                  use: "foo-loader",
                },
              ],
            },
          };
        });
      },
    } satisfies RsbuildPlugin,
    {
      name: "bar",
      setup(api) {
        api.modifyRspackConfig((config, { appendRules }) => {
          appendRules({
            test: /\.bar/,
            use: "bar-loader",
          });
          return config;
        });
      },
    } satisfies RsbuildPlugin,
  ],
});
