// barrel file for components
// including Layout, nav, and other reuseable stuff

// ===BIG BOYS===
  // default/master layout
  export { default as Layout } from './Layout';
  // navigation components
  export { default as NavBar } from './NavBar';
      export { default as BreadCrumbs } from './BreadCrumbs';
  // main/outlet container
  export { default as ContentBox } from './ContentBox';

// ===PAGE-SPECIFIC===
 // image carousel
 export { default as ImageCarousel } from './ImageCarousel';