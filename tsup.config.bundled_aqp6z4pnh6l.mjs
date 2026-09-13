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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiLCAiLi4vdXRpbHMvdmFsaWRhdGUtbWFuaWZlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL2hvbWUvZGNiL3BsdWdpbnMvcXVhcnR6LXBsdWdpbnMvY29udGVudC1tZXRhL3RzdXAuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9ob21lL2RjYi9wbHVnaW5zL3F1YXJ0ei1wbHVnaW5zL2NvbnRlbnQtbWV0YVwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vaG9tZS9kY2IvcGx1Z2lucy9xdWFydHotcGx1Z2lucy9jb250ZW50LW1ldGEvdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidHN1cFwiO1xuaW1wb3J0IHsgdmFsaWRhdGVNYW5pZmVzdCB9IGZyb20gXCIuL3NyYy91dGlscy92YWxpZGF0ZS1tYW5pZmVzdFwiO1xuXG52YWxpZGF0ZU1hbmlmZXN0KClcblxuY29uc3QgU0lOR0xFVE9OX0VYVEVSTkFMUyA9IFtcbiAgXCJwcmVhY3RcIixcbiAgXCJwcmVhY3QvaG9va3NcIixcbiAgXCJwcmVhY3QvanN4LXJ1bnRpbWVcIixcbiAgXCJwcmVhY3QvY29tcGF0XCIsXG4gIFwiQGphY2t5emhhMC9xdWFydHpcIixcbiAgXCJAamFja3l6aGEwL3F1YXJ0ei8qXCIsXG4gIFwidmZpbGVcIixcbiAgXCJ2ZmlsZS8qXCIsXG4gIFwidW5pZmllZFwiLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgZW50cnk6IHtcbiAgICBpbmRleDogXCJzcmMvaW5kZXgudHNcIixcbiAgICBcImNvbXBvbmVudHMvaW5kZXhcIjogXCJzcmMvY29tcG9uZW50cy9pbmRleC50c1wiLFxuICB9LFxuICBmb3JtYXQ6IFtcImVzbVwiXSxcbiAgZHRzOiB0cnVlLFxuICB0c2NvbmZpZzogXCJ0c2NvbmZpZy5idWlsZC5qc29uXCIsXG4gIHNvdXJjZW1hcDogdHJ1ZSxcbiAgY2xlYW46IHRydWUsXG4gIHRyZWVzaGFrZTogdHJ1ZSxcbiAgdGFyZ2V0OiBcImVzMjAyMlwiLFxuICBzcGxpdHRpbmc6IGZhbHNlLFxuICBub0V4dGVybmFsOiBbLy4qL10sXG4gIGV4dGVybmFsOiBTSU5HTEVUT05fRVhURVJOQUxTLFxuICBvdXREaXI6IFwiZGlzdFwiLFxuICBwbGF0Zm9ybTogXCJub2RlXCIsXG4gIGJhbm5lcjoge1xuICAgIGpzOiAnaW1wb3J0IHsgY3JlYXRlUmVxdWlyZSB9IGZyb20gXCJtb2R1bGVcIjsgY29uc3QgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUoaW1wb3J0Lm1ldGEudXJsKTsnLFxuICB9LFxuICBlc2J1aWxkT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgb3B0aW9ucy5qc3ggPSBcImF1dG9tYXRpY1wiO1xuICAgIG9wdGlvbnMuanN4SW1wb3J0U291cmNlID0gXCJwcmVhY3RcIjtcbiAgfSxcbiAgZXNidWlsZFBsdWdpbnM6IFtcbiAgICB7XG4gICAgICBuYW1lOiBcInRleHQtbG9hZGVyXCIsXG4gICAgICBzZXR1cChidWlsZCkge1xuICAgICAgICBidWlsZC5vbkxvYWQoeyBmaWx0ZXI6IC9cXC5zY3NzJC8gfSwgYXN5bmMgKGFyZ3MpID0+IHtcbiAgICAgICAgICBjb25zdCBzYXNzID0gYXdhaXQgaW1wb3J0KFwic2Fzc1wiKTtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBzYXNzLmNvbXBpbGUoYXJncy5wYXRoKTtcbiAgICAgICAgICByZXR1cm4geyBjb250ZW50czogcmVzdWx0LmNzcywgbG9hZGVyOiBcInRleHRcIiB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBidWlsZC5vbkxvYWQoeyBmaWx0ZXI6IC9cXC5pbmxpbmVcXC50cyQvIH0sIGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICAgICAgY29uc3QgZnMgPSBhd2FpdCBpbXBvcnQoXCJmc1wiKTtcbiAgICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoYXJncy5wYXRoLCBcInV0ZjhcIik7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRlbnRzOiB0ZXh0LFxuICAgICAgICAgICAgbG9hZGVyOiBcInRleHRcIixcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSxcbiAgXSxcbn0pO1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL2hvbWUvZGNiL3BsdWdpbnMvcXVhcnR6LXBsdWdpbnMvdXRpbHMvdmFsaWRhdGUtbWFuaWZlc3QudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL2hvbWUvZGNiL3BsdWdpbnMvcXVhcnR6LXBsdWdpbnMvdXRpbHNcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL2hvbWUvZGNiL3BsdWdpbnMvcXVhcnR6LXBsdWdpbnMvdXRpbHMvdmFsaWRhdGUtbWFuaWZlc3QudHNcIjtpbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVNYW5pZmVzdCgpOiB2b2lkIHtcbiAgY29uc3QgcGtnUGF0aCA9IHBhdGgucmVzb2x2ZShcInBhY2thZ2UuanNvblwiKTtcbiAgaWYgKCFmcy5leGlzdHNTeW5jKHBrZ1BhdGgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicGFja2FnZS5qc29uIG5vdCBmb3VuZFwiKTtcbiAgfVxuXG4gIGNvbnN0IHBsdWdpbiA9IHBhdGguYmFzZW5hbWUocHJvY2Vzcy5jd2QoKSlcbiAgY29uc3QgcGx1Z2luUGF0aCA9IGBAdGhlcWdxdWFydHovJHtwbHVnaW59YFxuICBjb25zdCBnaXRodWJQYXRoID0gYGh0dHBzOi8vZ2l0aHViLmNvbS90aGVxZ3F1YXJ0ei8ke3BsdWdpbn1gXG5cbiAgY29uc3QgcGtnID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGtnUGF0aCwgXCJ1dGYtOFwiKSk7XG4gIGNvbnN0IHF1YXJ0eiA9IHBrZy5xdWFydHo7XG5cbiAgaWYgKCFxdWFydHopIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBcIlxceDFiWzMzbVx1MjZBMCBObyAncXVhcnR6JyBmaWVsZCBpbiBwYWNrYWdlLmpzb24uIFBsdWdpbiBtYXkgbm90IGxvYWQgY29ycmVjdGx5IGluIFF1YXJ0ei5cXHgxYlswbVwiLFxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgd2FybmluZ3M6IHN0cmluZ1tdID0gW107XG5cbiAgaWYgKHBrZy5uYW1lICE9PSBwbHVnaW5QYXRoKSB3YXJuaW5ncy5wdXNoKGBuYW1lIGhhcyBub3QgYmVlbiB1cGRhdGVkIHRvICcke3BsdWdpblBhdGh9J2ApO1xuICBpZiAoIXBrZy5hdXRob3IuaW5jbHVkZXMoXCJEYXZpZCBCdWNoYW5cIikpIHdhcm5pbmdzLnB1c2goXCJhdXRob3IgaGFzIG5vdCBiZWVuIHVwZGF0ZWQgdG8gJ0RhdmlkIEJ1Y2hhbidcIik7XG4gIGlmIChwa2cuaG9tZXBhZ2UgIT09IFwiaHR0cHM6Ly9xdWFudHVtZ2FyZGVuZXIuaW5mb1wiKSB3YXJuaW5ncy5wdXNoKGBob21lcGFnZSBoYXMgbm90IGJlZW4gdXBkYXRlZCB0byAnaHR0cHM6Ly9xdWFudHVtZ2FyZGVuZXIuaW5mbydgKTtcbiAgaWYgKHBrZy5yZXBvc2l0b3J5LnVybCAhPT0gZ2l0aHViUGF0aCkgd2FybmluZ3MucHVzaChgcmVwb3NpdG9yeS51cmwgaGFzIG5vdCBiZWVuIHVwZGF0ZWQgdG8gJyR7Z2l0aHViUGF0aH0nYCk7XG4gIGlmICghcXVhcnR6Lm5hbWUpIHdhcm5pbmdzLnB1c2goXCJxdWFydHoubmFtZSBpcyBtaXNzaW5nXCIpO1xuICBpZiAocXVhcnR6Lm5hbWUgIT0gcGx1Z2luKSB3YXJuaW5ncy5wdXNoKGBxdWFydHoubmFtZSBoYXMgbm90IGJlZW4gdXBkYXRlZCB0byAnJHtwbHVnaW59J2ApO1xuICBpZiAoIXF1YXJ0ei5kaXNwbGF5TmFtZSkgd2FybmluZ3MucHVzaChcInF1YXJ0ei5kaXNwbGF5TmFtZSBpcyBtaXNzaW5nXCIpO1xuICBpZiAoIXF1YXJ0ei5jYXRlZ29yeSkgd2FybmluZ3MucHVzaChcInF1YXJ0ei5jYXRlZ29yeSBpcyBtaXNzaW5nXCIpO1xuICBpZiAoIXF1YXJ0ei52ZXJzaW9uKSB3YXJuaW5ncy5wdXNoKFwicXVhcnR6LnZlcnNpb24gaXMgbWlzc2luZ1wiKTtcbiAgaWYgKCFwa2cuc2NyaXB0cy5jbGVhbikgd2FybmluZ3MucHVzaChgXCJjbGVhblwiOiBcInByZXR0aWVyIC4gLS13cml0ZVwiIG1pc3NpbmcgZnJvbSBzY3JpcHRzYCk7XG5cbiAgY29uc3QgZG90R2l0aHViUGF0aCA9IHBhdGgucmVzb2x2ZShcIi5naXRodWJcIik7XG4gIGlmIChmcy5leGlzdHNTeW5jKGRvdEdpdGh1YlBhdGgpKSB3YXJuaW5ncy5wdXNoKFwiLmdpdGh1YiBmb2xkZXIgcmVtYWluc1wiKVxuXG4gIGlmICh3YXJuaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgY29uc29sZS53YXJuKFwiXFx4MWJbMzNtXHUyNkEwIFBsdWdpbiBtYW5pZmVzdCB3YXJuaW5nczpcXHgxYlswbVwiKTtcbiAgICBmb3IgKGNvbnN0IHcgb2Ygd2FybmluZ3MpIHtcbiAgICAgIGNvbnNvbGUud2FybihgICAtICR7d31gKTtcbiAgICB9XG4gICAgcHJvY2Vzcy5leGl0KC0xKVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFSLFNBQVMsb0JBQW9COzs7QUNBdEMsT0FBTyxRQUFRO0FBQzNSLE9BQU8sVUFBVTtBQUVWLFNBQVMsbUJBQXlCO0FBQ3ZDLFFBQU0sVUFBVSxLQUFLLFFBQVEsY0FBYztBQUMzQyxNQUFJLENBQUMsR0FBRyxXQUFXLE9BQU8sR0FBRztBQUMzQixVQUFNLElBQUksTUFBTSx3QkFBd0I7QUFBQSxFQUMxQztBQUVBLFFBQU0sU0FBUyxLQUFLLFNBQVMsUUFBUSxJQUFJLENBQUM7QUFDMUMsUUFBTSxhQUFhLGdCQUFnQixNQUFNO0FBQ3pDLFFBQU0sYUFBYSxrQ0FBa0MsTUFBTTtBQUUzRCxRQUFNLE1BQU0sS0FBSyxNQUFNLEdBQUcsYUFBYSxTQUFTLE9BQU8sQ0FBQztBQUN4RCxRQUFNLFNBQVMsSUFBSTtBQUVuQixNQUFJLENBQUMsUUFBUTtBQUNYLFlBQVE7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUNBO0FBQUEsRUFDRjtBQUVBLFFBQU0sV0FBcUIsQ0FBQztBQUU1QixNQUFJLElBQUksU0FBUyxXQUFZLFVBQVMsS0FBSyxpQ0FBaUMsVUFBVSxHQUFHO0FBQ3pGLE1BQUksQ0FBQyxJQUFJLE9BQU8sU0FBUyxjQUFjLEVBQUcsVUFBUyxLQUFLLCtDQUErQztBQUN2RyxNQUFJLElBQUksYUFBYSwrQkFBZ0MsVUFBUyxLQUFLLGlFQUFpRTtBQUNwSSxNQUFJLElBQUksV0FBVyxRQUFRLFdBQVksVUFBUyxLQUFLLDJDQUEyQyxVQUFVLEdBQUc7QUFDN0csTUFBSSxDQUFDLE9BQU8sS0FBTSxVQUFTLEtBQUssd0JBQXdCO0FBQ3hELE1BQUksT0FBTyxRQUFRLE9BQVEsVUFBUyxLQUFLLHdDQUF3QyxNQUFNLEdBQUc7QUFDMUYsTUFBSSxDQUFDLE9BQU8sWUFBYSxVQUFTLEtBQUssK0JBQStCO0FBQ3RFLE1BQUksQ0FBQyxPQUFPLFNBQVUsVUFBUyxLQUFLLDRCQUE0QjtBQUNoRSxNQUFJLENBQUMsT0FBTyxRQUFTLFVBQVMsS0FBSywyQkFBMkI7QUFDOUQsTUFBSSxDQUFDLElBQUksUUFBUSxNQUFPLFVBQVMsS0FBSyxvREFBb0Q7QUFFMUYsUUFBTSxnQkFBZ0IsS0FBSyxRQUFRLFNBQVM7QUFDNUMsTUFBSSxHQUFHLFdBQVcsYUFBYSxFQUFHLFVBQVMsS0FBSyx3QkFBd0I7QUFFeEUsTUFBSSxTQUFTLFNBQVMsR0FBRztBQUN2QixZQUFRLEtBQUssaURBQTRDO0FBQ3pELGVBQVcsS0FBSyxVQUFVO0FBQ3hCLGNBQVEsS0FBSyxPQUFPLENBQUMsRUFBRTtBQUFBLElBQ3pCO0FBQ0EsWUFBUSxLQUFLLEVBQUU7QUFBQSxFQUNqQjtBQUNGOzs7QUQzQ0EsaUJBQWlCO0FBRWpCLElBQU0sc0JBQXNCO0FBQUEsRUFDMUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1Asb0JBQW9CO0FBQUEsRUFDdEI7QUFBQSxFQUNBLFFBQVEsQ0FBQyxLQUFLO0FBQUEsRUFDZCxLQUFLO0FBQUEsRUFDTCxVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxZQUFZLENBQUMsSUFBSTtBQUFBLEVBQ2pCLFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxJQUNOLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxlQUFlLFNBQVM7QUFDdEIsWUFBUSxNQUFNO0FBQ2QsWUFBUSxrQkFBa0I7QUFBQSxFQUM1QjtBQUFBLEVBQ0EsZ0JBQWdCO0FBQUEsSUFDZDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTSxPQUFPO0FBQ1gsY0FBTSxPQUFPLEVBQUUsUUFBUSxVQUFVLEdBQUcsT0FBTyxTQUFTO0FBQ2xELGdCQUFNLE9BQU8sTUFBTSxPQUFPLE1BQU07QUFDaEMsZ0JBQU0sU0FBUyxLQUFLLFFBQVEsS0FBSyxJQUFJO0FBQ3JDLGlCQUFPLEVBQUUsVUFBVSxPQUFPLEtBQUssUUFBUSxPQUFPO0FBQUEsUUFDaEQsQ0FBQztBQUVELGNBQU0sT0FBTyxFQUFFLFFBQVEsZ0JBQWdCLEdBQUcsT0FBTyxTQUFTO0FBQ3hELGdCQUFNQSxNQUFLLE1BQU0sT0FBTyxJQUFJO0FBQzVCLGdCQUFNLE9BQU8sTUFBTUEsSUFBRyxTQUFTLFNBQVMsS0FBSyxNQUFNLE1BQU07QUFDekQsaUJBQU87QUFBQSxZQUNMLFVBQVU7QUFBQSxZQUNWLFFBQVE7QUFBQSxVQUNWO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsiZnMiXQp9Cg==
