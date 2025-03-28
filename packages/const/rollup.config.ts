import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { mergeWith } from "lodash-es";
import { defineConfig } from "rollup";
import ts from "@rollup/plugin-typescript";

import type { InputPluginOption, RollupOptions } from "rollup";

const baseConfig: RollupOptions = {
  output: {
    sourcemap: true,
    exports: "named",
  },
  treeshake: false,
  plugins: [
    nodeResolve({
      preferBuiltins: false,
      mainFields: ["browser", "module", "jsnext:main", "main"],
    }) as InputPluginOption,
    ts({
      include: ["**/*.ts", "**/*.mts", "**/*.cts"],
      sourceMap: true,
      tsconfig: "tsconfig.json",
    }),
    commonjs() as InputPluginOption,
  ],
};

const variesConfig: RollupOptions[] = [
  {
    input: ["src/index.ts"],
    output: {
      dir: "dist",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
  },
];

if (process.env.NODE_ENV === "production") {
  variesConfig.push(
    {
      input: "src/index.ts",
      output: {
        format: "cjs",
        file: "dist/index.cjs.js",
        inlineDynamicImports: true,
      },
    },
    {
      input: "src/index.ts",
      output: {
        file: "dist/index.esm.js",
        inlineDynamicImports: true,
      },
    },
  );
}

variesConfig.push({
  input: "src/index.ts",
  output: {
    file: "dist/index.esm.js",
    inlineDynamicImports: true,
  },
});

export default defineConfig(
  variesConfig.map((v) => {
    const customizer = function (objValue, srcValue) {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
      if (typeof objValue === "object") {
        return mergeWith({}, objValue, srcValue, customizer);
      }
    };
    return mergeWith({}, baseConfig, v, customizer);
  }),
);
