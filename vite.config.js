import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const ReactCompilerConfig = {
  compilationMode: "annotation",
};

export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
    ],
  };
});
