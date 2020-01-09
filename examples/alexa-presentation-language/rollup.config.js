import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    compact: true
  },
  plugins: [typescript()]
};
