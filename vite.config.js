import { defineConfig } from "vite";
import { ReactCompilerConfig } from "babel-plugin-react-compiler";
import react from "@vitejs/plugin-react";

const ReactCompilerConfig = {
  compilationMode: "annotation",
};

// https://vitejs.dev/config/
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
