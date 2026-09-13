// tsup.config.ts
import { defineConfig } from "tsup";

// ../utils/validate-manifest.ts
import fs from "fs";
import path from "path";
function validateManifest() {
  const pkgPath = path.resolve("package.json");
  if (!fs.existsSync(pkgPath)) {
    throw new Error("package.json not found");
  }
  const plugin = path.basename(process.cwd());
  const pluginPath = `@theqgquartz/${plugin}`;
  const githubPath = `https://github.com/theqgquartz/${plugin}`;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const quartz = pkg.quartz;
  if (!quartz) {
    console.warn(
      "\x1B[33m\u26A0 No 'quartz' field in package.json. Plugin may not load correctly in Quartz.\x1B[0m",
    );
    return;
  }
  const warnings = [];
  if (pkg.name !== pluginPath) warnings.push(`name has not been updated to '${pluginPath}'`);
  if (!pkg.author.includes("David Buchan"))
    warnings.push("author has not been updated to 'David Buchan'");
  if (pkg.homepage !== "https://quantumgardener.info")
    warnings.push(`homepage has not been updated to 'https://quantumgardener.info'`);
  if (pkg.repository.url !== githubPath)
    warnings.push(`repository.url has not been updated to '${githubPath}'`);
  if (!quartz.name) warnings.push("quartz.name is missing");
  if (quartz.name != plugin) warnings.push(`quartz.name has not been updated to '${plugin}'`);
  if (!quartz.displayName) warnings.push("quartz.displayName is missing");
  if (!quartz.category) warnings.push("quartz.category is missing");
  if (!quartz.version) warnings.push("quartz.version is missing");
  if (!pkg.scripts.clean) warnings.push(`"clean": "prettier . --write" missing from scripts`);
  const dotGithubPath = path.resolve(".github");
  if (fs.existsSync(dotGithubPath)) warnings.push(".github folder remains");
  if (warnings.length > 0) {
    console.warn("\x1B[33m\u26A0 Plugin manifest warnings:\x1B[0m");
    for (const w of warnings) {
      console.warn(`  - ${w}`);
    }
    process.exit(-1);
  }
}

// tsup.config.ts
validateManifest();
var SINGLETON_EXTERNALS = [
  "preact",
  "preact/hooks",
  "preact/jsx-runtime",
  "preact/compat",
  "@jackyzha0/quartz",
  "@jackyzha0/quartz/*",
  "vfile",
  "vfile/*",
  "unified",
];
var tsup_config_default = defineConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
  },
  format: ["esm"],
  dts: true,
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2022",
  splitting: false,
  noExternal: [/.*/],
  external: SINGLETON_EXTERNALS,
  outDir: "dist",
  platform: "node",
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
  },
  esbuildOptions(options) {
    options.jsx = "automatic";
    options.jsxImportSource = "preact";
  },
  esbuildPlugins: [
    {
      name: "text-loader",
      setup(build) {
        build.onLoad({ filter: /\.scss$/ }, async (args) => {
          const sass = await import("sass");
          const result = sass.compile(args.path);
          return { contents: result.css, loader: "text" };
        });
        build.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
          const fs2 = await import("fs");
          const text = await fs2.promises.readFile(args.path, "utf8");
          return {
            contents: text,
            loader: "text",
          };
        });
      },
    },
  ],
});
export { tsup_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiLCAiLi4vdXRpbHMvdmFsaWRhdGUtbWFuaWZlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL2hvbWUvZGNiL3BsdWdpbnMvcXVhcnR6LXBsdWdpbnMvd2VibWVudGlvbnMvdHN1cC5jb25maWcudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL2hvbWUvZGNiL3BsdWdpbnMvcXVhcnR6LXBsdWdpbnMvd2VibWVudGlvbnNcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL2hvbWUvZGNiL3BsdWdpbnMvcXVhcnR6LXBsdWdpbnMvd2VibWVudGlvbnMvdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidHN1cFwiO1xuaW1wb3J0IHsgdmFsaWRhdGVNYW5pZmVzdCB9IGZyb20gXCIuL3NyYy91dGlscy92YWxpZGF0ZS1tYW5pZmVzdFwiO1xuXG52YWxpZGF0ZU1hbmlmZXN0KCk7XG5cbmNvbnN0IFNJTkdMRVRPTl9FWFRFUk5BTFMgPSBbXG4gIFwicHJlYWN0XCIsXG4gIFwicHJlYWN0L2hvb2tzXCIsXG4gIFwicHJlYWN0L2pzeC1ydW50aW1lXCIsXG4gIFwicHJlYWN0L2NvbXBhdFwiLFxuICBcIkBqYWNreXpoYTAvcXVhcnR6XCIsXG4gIFwiQGphY2t5emhhMC9xdWFydHovKlwiLFxuICBcInZmaWxlXCIsXG4gIFwidmZpbGUvKlwiLFxuICBcInVuaWZpZWRcIixcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGVudHJ5OiB7XG4gICAgaW5kZXg6IFwic3JjL2luZGV4LnRzXCIsXG4gICAgXCJjb21wb25lbnRzL2luZGV4XCI6IFwic3JjL2NvbXBvbmVudHMvaW5kZXgudHNcIixcbiAgfSxcbiAgZm9ybWF0OiBbXCJlc21cIl0sXG4gIGR0czogdHJ1ZSxcbiAgdHNjb25maWc6IFwidHNjb25maWcuYnVpbGQuanNvblwiLFxuICBzb3VyY2VtYXA6IHRydWUsXG4gIGNsZWFuOiB0cnVlLFxuICB0cmVlc2hha2U6IHRydWUsXG4gIHRhcmdldDogXCJlczIwMjJcIixcbiAgc3BsaXR0aW5nOiBmYWxzZSxcbiAgbm9FeHRlcm5hbDogWy8uKi9dLFxuICBleHRlcm5hbDogU0lOR0xFVE9OX0VYVEVSTkFMUyxcbiAgb3V0RGlyOiBcImRpc3RcIixcbiAgcGxhdGZvcm06IFwibm9kZVwiLFxuICBiYW5uZXI6IHtcbiAgICBqczogJ2ltcG9ydCB7IGNyZWF0ZVJlcXVpcmUgfSBmcm9tIFwibW9kdWxlXCI7IGNvbnN0IHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKGltcG9ydC5tZXRhLnVybCk7JyxcbiAgfSxcbiAgZXNidWlsZE9wdGlvbnMob3B0aW9ucykge1xuICAgIG9wdGlvbnMuanN4ID0gXCJhdXRvbWF0aWNcIjtcbiAgICBvcHRpb25zLmpzeEltcG9ydFNvdXJjZSA9IFwicHJlYWN0XCI7XG4gIH0sXG4gIGVzYnVpbGRQbHVnaW5zOiBbXG4gICAge1xuICAgICAgbmFtZTogXCJ0ZXh0LWxvYWRlclwiLFxuICAgICAgc2V0dXAoYnVpbGQpIHtcbiAgICAgICAgYnVpbGQub25Mb2FkKHsgZmlsdGVyOiAvXFwuc2NzcyQvIH0sIGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2FzcyA9IGF3YWl0IGltcG9ydChcInNhc3NcIik7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gc2Fzcy5jb21waWxlKGFyZ3MucGF0aCk7XG4gICAgICAgICAgcmV0dXJuIHsgY29udGVudHM6IHJlc3VsdC5jc3MsIGxvYWRlcjogXCJ0ZXh0XCIgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnVpbGQub25Mb2FkKHsgZmlsdGVyOiAvXFwuaW5saW5lXFwudHMkLyB9LCBhc3luYyAoYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZzID0gYXdhaXQgaW1wb3J0KFwiZnNcIik7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGFyZ3MucGF0aCwgXCJ1dGY4XCIpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250ZW50czogdGV4dCxcbiAgICAgICAgICAgIGxvYWRlcjogXCJ0ZXh0XCIsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG59KTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9ob21lL2RjYi9wbHVnaW5zL3F1YXJ0ei1wbHVnaW5zL3V0aWxzL3ZhbGlkYXRlLW1hbmlmZXN0LnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9ob21lL2RjYi9wbHVnaW5zL3F1YXJ0ei1wbHVnaW5zL3V0aWxzXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9ob21lL2RjYi9wbHVnaW5zL3F1YXJ0ei1wbHVnaW5zL3V0aWxzL3ZhbGlkYXRlLW1hbmlmZXN0LnRzXCI7aW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlTWFuaWZlc3QoKTogdm9pZCB7XG4gIGNvbnN0IHBrZ1BhdGggPSBwYXRoLnJlc29sdmUoXCJwYWNrYWdlLmpzb25cIik7XG4gIGlmICghZnMuZXhpc3RzU3luYyhwa2dQYXRoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInBhY2thZ2UuanNvbiBub3QgZm91bmRcIik7XG4gIH1cblxuICBjb25zdCBwbHVnaW4gPSBwYXRoLmJhc2VuYW1lKHByb2Nlc3MuY3dkKCkpXG4gIGNvbnN0IHBsdWdpblBhdGggPSBgQHRoZXFncXVhcnR6LyR7cGx1Z2lufWBcbiAgY29uc3QgZ2l0aHViUGF0aCA9IGBodHRwczovL2dpdGh1Yi5jb20vdGhlcWdxdWFydHovJHtwbHVnaW59YFxuXG4gIGNvbnN0IHBrZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBrZ1BhdGgsIFwidXRmLThcIikpO1xuICBjb25zdCBxdWFydHogPSBwa2cucXVhcnR6O1xuXG4gIGlmICghcXVhcnR6KSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJcXHgxYlszM21cdTI2QTAgTm8gJ3F1YXJ0eicgZmllbGQgaW4gcGFja2FnZS5qc29uLiBQbHVnaW4gbWF5IG5vdCBsb2FkIGNvcnJlY3RseSBpbiBRdWFydHouXFx4MWJbMG1cIixcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHdhcm5pbmdzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGlmIChwa2cubmFtZSAhPT0gcGx1Z2luUGF0aCkgd2FybmluZ3MucHVzaChgbmFtZSBoYXMgbm90IGJlZW4gdXBkYXRlZCB0byAnJHtwbHVnaW5QYXRofSdgKTtcbiAgaWYgKCFwa2cuYXV0aG9yLmluY2x1ZGVzKFwiRGF2aWQgQnVjaGFuXCIpKSB3YXJuaW5ncy5wdXNoKFwiYXV0aG9yIGhhcyBub3QgYmVlbiB1cGRhdGVkIHRvICdEYXZpZCBCdWNoYW4nXCIpO1xuICBpZiAocGtnLmhvbWVwYWdlICE9PSBcImh0dHBzOi8vcXVhbnR1bWdhcmRlbmVyLmluZm9cIikgd2FybmluZ3MucHVzaChgaG9tZXBhZ2UgaGFzIG5vdCBiZWVuIHVwZGF0ZWQgdG8gJ2h0dHBzOi8vcXVhbnR1bWdhcmRlbmVyLmluZm8nYCk7XG4gIGlmIChwa2cucmVwb3NpdG9yeS51cmwgIT09IGdpdGh1YlBhdGgpIHdhcm5pbmdzLnB1c2goYHJlcG9zaXRvcnkudXJsIGhhcyBub3QgYmVlbiB1cGRhdGVkIHRvICcke2dpdGh1YlBhdGh9J2ApO1xuICBpZiAoIXF1YXJ0ei5uYW1lKSB3YXJuaW5ncy5wdXNoKFwicXVhcnR6Lm5hbWUgaXMgbWlzc2luZ1wiKTtcbiAgaWYgKHF1YXJ0ei5uYW1lICE9IHBsdWdpbikgd2FybmluZ3MucHVzaChgcXVhcnR6Lm5hbWUgaGFzIG5vdCBiZWVuIHVwZGF0ZWQgdG8gJyR7cGx1Z2lufSdgKTtcbiAgaWYgKCFxdWFydHouZGlzcGxheU5hbWUpIHdhcm5pbmdzLnB1c2goXCJxdWFydHouZGlzcGxheU5hbWUgaXMgbWlzc2luZ1wiKTtcbiAgaWYgKCFxdWFydHouY2F0ZWdvcnkpIHdhcm5pbmdzLnB1c2goXCJxdWFydHouY2F0ZWdvcnkgaXMgbWlzc2luZ1wiKTtcbiAgaWYgKCFxdWFydHoudmVyc2lvbikgd2FybmluZ3MucHVzaChcInF1YXJ0ei52ZXJzaW9uIGlzIG1pc3NpbmdcIik7XG4gIGlmICghcGtnLnNjcmlwdHMuY2xlYW4pIHdhcm5pbmdzLnB1c2goYFwiY2xlYW5cIjogXCJwcmV0dGllciAuIC0td3JpdGVcIiBtaXNzaW5nIGZyb20gc2NyaXB0c2ApO1xuXG4gIGNvbnN0IGRvdEdpdGh1YlBhdGggPSBwYXRoLnJlc29sdmUoXCIuZ2l0aHViXCIpO1xuICBpZiAoZnMuZXhpc3RzU3luYyhkb3RHaXRodWJQYXRoKSkgd2FybmluZ3MucHVzaChcIi5naXRodWIgZm9sZGVyIHJlbWFpbnNcIilcblxuICBpZiAod2FybmluZ3MubGVuZ3RoID4gMCkge1xuICAgIGNvbnNvbGUud2FybihcIlxceDFiWzMzbVx1MjZBMCBQbHVnaW4gbWFuaWZlc3Qgd2FybmluZ3M6XFx4MWJbMG1cIik7XG4gICAgZm9yIChjb25zdCB3IG9mIHdhcm5pbmdzKSB7XG4gICAgICBjb25zb2xlLndhcm4oYCAgLSAke3d9YCk7XG4gICAgfVxuICAgIHByb2Nlc3MuZXhpdCgtMSlcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUixTQUFTLG9CQUFvQjs7O0FDQW5DLE9BQU8sUUFBUTtBQUMzUixPQUFPLFVBQVU7QUFFVixTQUFTLG1CQUF5QjtBQUN2QyxRQUFNLFVBQVUsS0FBSyxRQUFRLGNBQWM7QUFDM0MsTUFBSSxDQUFDLEdBQUcsV0FBVyxPQUFPLEdBQUc7QUFDM0IsVUFBTSxJQUFJLE1BQU0sd0JBQXdCO0FBQUEsRUFDMUM7QUFFQSxRQUFNLFNBQVMsS0FBSyxTQUFTLFFBQVEsSUFBSSxDQUFDO0FBQzFDLFFBQU0sYUFBYSxnQkFBZ0IsTUFBTTtBQUN6QyxRQUFNLGFBQWEsa0NBQWtDLE1BQU07QUFFM0QsUUFBTSxNQUFNLEtBQUssTUFBTSxHQUFHLGFBQWEsU0FBUyxPQUFPLENBQUM7QUFDeEQsUUFBTSxTQUFTLElBQUk7QUFFbkIsTUFBSSxDQUFDLFFBQVE7QUFDWCxZQUFRO0FBQUEsTUFDTjtBQUFBLElBQ0Y7QUFDQTtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFdBQXFCLENBQUM7QUFFNUIsTUFBSSxJQUFJLFNBQVMsV0FBWSxVQUFTLEtBQUssaUNBQWlDLFVBQVUsR0FBRztBQUN6RixNQUFJLENBQUMsSUFBSSxPQUFPLFNBQVMsY0FBYyxFQUFHLFVBQVMsS0FBSywrQ0FBK0M7QUFDdkcsTUFBSSxJQUFJLGFBQWEsK0JBQWdDLFVBQVMsS0FBSyxpRUFBaUU7QUFDcEksTUFBSSxJQUFJLFdBQVcsUUFBUSxXQUFZLFVBQVMsS0FBSywyQ0FBMkMsVUFBVSxHQUFHO0FBQzdHLE1BQUksQ0FBQyxPQUFPLEtBQU0sVUFBUyxLQUFLLHdCQUF3QjtBQUN4RCxNQUFJLE9BQU8sUUFBUSxPQUFRLFVBQVMsS0FBSyx3Q0FBd0MsTUFBTSxHQUFHO0FBQzFGLE1BQUksQ0FBQyxPQUFPLFlBQWEsVUFBUyxLQUFLLCtCQUErQjtBQUN0RSxNQUFJLENBQUMsT0FBTyxTQUFVLFVBQVMsS0FBSyw0QkFBNEI7QUFDaEUsTUFBSSxDQUFDLE9BQU8sUUFBUyxVQUFTLEtBQUssMkJBQTJCO0FBQzlELE1BQUksQ0FBQyxJQUFJLFFBQVEsTUFBTyxVQUFTLEtBQUssb0RBQW9EO0FBRTFGLFFBQU0sZ0JBQWdCLEtBQUssUUFBUSxTQUFTO0FBQzVDLE1BQUksR0FBRyxXQUFXLGFBQWEsRUFBRyxVQUFTLEtBQUssd0JBQXdCO0FBRXhFLE1BQUksU0FBUyxTQUFTLEdBQUc7QUFDdkIsWUFBUSxLQUFLLGlEQUE0QztBQUN6RCxlQUFXLEtBQUssVUFBVTtBQUN4QixjQUFRLEtBQUssT0FBTyxDQUFDLEVBQUU7QUFBQSxJQUN6QjtBQUNBLFlBQVEsS0FBSyxFQUFFO0FBQUEsRUFDakI7QUFDRjs7O0FEM0NBLGlCQUFpQjtBQUVqQixJQUFNLHNCQUFzQjtBQUFBLEVBQzFCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxRQUFRLENBQUMsS0FBSztBQUFBLEVBQ2QsS0FBSztBQUFBLEVBQ0wsVUFBVTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLEVBQ1AsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsWUFBWSxDQUFDLElBQUk7QUFBQSxFQUNqQixVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsRUFDUixVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsSUFDTixJQUFJO0FBQUEsRUFDTjtBQUFBLEVBQ0EsZUFBZSxTQUFTO0FBQ3RCLFlBQVEsTUFBTTtBQUNkLFlBQVEsa0JBQWtCO0FBQUEsRUFDNUI7QUFBQSxFQUNBLGdCQUFnQjtBQUFBLElBQ2Q7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU0sT0FBTztBQUNYLGNBQU0sT0FBTyxFQUFFLFFBQVEsVUFBVSxHQUFHLE9BQU8sU0FBUztBQUNsRCxnQkFBTSxPQUFPLE1BQU0sT0FBTyxNQUFNO0FBQ2hDLGdCQUFNLFNBQVMsS0FBSyxRQUFRLEtBQUssSUFBSTtBQUNyQyxpQkFBTyxFQUFFLFVBQVUsT0FBTyxLQUFLLFFBQVEsT0FBTztBQUFBLFFBQ2hELENBQUM7QUFFRCxjQUFNLE9BQU8sRUFBRSxRQUFRLGdCQUFnQixHQUFHLE9BQU8sU0FBUztBQUN4RCxnQkFBTUEsTUFBSyxNQUFNLE9BQU8sSUFBSTtBQUM1QixnQkFBTSxPQUFPLE1BQU1BLElBQUcsU0FBUyxTQUFTLEtBQUssTUFBTSxNQUFNO0FBQ3pELGlCQUFPO0FBQUEsWUFDTCxVQUFVO0FBQUEsWUFDVixRQUFRO0FBQUEsVUFDVjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbImZzIl0KfQo=
