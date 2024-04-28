# [RxJS: Reactive Extensions Library for JavaScript](https://rxjs.dev/)

Este repositorio contiene ejercicios de ejemplo, pruebas, etc. con operadores rxjs que iré agregando a medida que me tope con inquietudes relacionadas.

## Sobre Vite

Vite (palabra francesa para "rápido", pronunciada /vit/, como "veet") es una herramienta de construcción que tiene como objetivo proporcionar una experiencia de desarrollo más rápida y eficiente para proyectos web modernos. Consta de dos partes principales:

Un servidor de desarrollo que proporciona numerosas mejoras de funciones con respecto a los módulos ES nativos, por ejemplo, reemplazo de módulo en caliente (HMR) extremadamente rápido.

## [Construcción de este proyecto](https://vitejs.dev/)

Este proyecto lo generé gracias a [vitejs](https://vitejs.dev/) que nos crea una estructura de proyecto, en mi caso, usando typescript vanilla; 
es decir, sin framework, únicamente un proyecto con typescript.

Para crear el proyecto seguí las instrucciones de la página [vitejs](https://vitejs.dev/), tal como a continuación se muestra:

```bash
$ npm create vite@latest

Need to install the following packages:
create-vite@5.2.3
Ok to proceed? (y) y
√ Project name: ... rxjs-observables
√ Select a framework: » Vanilla
√ Select a variant: » TypeScript

Scaffolding project in M:\PROGRAMACION\DESARROLLO_TYPESCRIPT\rxjs-observables...

Done. Now run:

  cd rxjs-observables
  npm install
  npm run dev
```

Como segundo paso, agregué manualmente dentro del archivo `package.json`, en el apartado de `dependencies`, la dependencia de `rxjs`.

```json
{
  "name": "rxjs-observables",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "rxjs": "~7.8.0"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}
```

Finalmente, ejecutamos la siguiente instrucción para instalar todas las dependencias del `package.json`:

```bash
λ npm install

added 11 packages, and audited 12 packages in 29s

3 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Levantando proyecto:

Para levantar el proyecto, ejecutamos la siguiente instrucción:

```bash
$ npm run dev

> rxjs-observables@0.0.0 dev
> vite

Re-optimizing dependencies because lockfile has changed

  VITE v5.2.10  ready in 502 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Finalmente, abrimos en el navegador la url que nos muestra en consola.
