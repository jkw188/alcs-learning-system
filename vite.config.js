var _a, _b;
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
var repositoryName = (_a = process.env.GITHUB_REPOSITORY) === null || _a === void 0 ? void 0 : _a.split('/')[1];
var base = (_b = process.env.VITE_BASE_PATH) !== null && _b !== void 0 ? _b : (repositoryName ? "/".concat(repositoryName, "/") : '/');
export default defineConfig({
    plugins: [react()],
    base: base,
});
