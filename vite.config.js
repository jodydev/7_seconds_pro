import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

const ReactCompilerConfig = {
  compilationMode: "annotation",
};

export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig], ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } )],
        },
      }),
    ],
  };
});
