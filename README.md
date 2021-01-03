# Sorting algorithms

Repository with code for [blog](https://swistak.codes) entries about sorting. You can find articles here: https://swistak.codes/tag/sortowanie/

Comments are in Polish, since blog article is also in Polish.

## Apps

All of the apps require NodeJS (latest LTS) to be installed on your machine.

### sorting-visualizer

App for visualizing process of sorting for different algorithms. Can be checked here: https://codesandbox.io/s/sorting-visualizer-7xejf

Running instructions:

```bash
cd ./sorting-visualizer
npm install
npm run start:dev
```

After running you can run different configurations by providing URL params: `?algorithm=[ALGORITHM NAME]&generator=[GAP GENERATOR NAME]`
* algorithm contains name of algorithm to visualize. Names are the same as exported function names in algorithms/index.js.
* generator contains name of gap sequence generator for Shellsort algorithm. Names are the same as exported function names in helpers/shellSortGapsGenerators.js.

### sorting-tester

App for testing sorting algorithms performance. 

Before running:

```bash
cd ./sorting-tester
npm install
```

Running unit tests:

```bash
npm run test
```

