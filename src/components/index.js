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
  // side panel details container
  export { default as SidePanel } from './SidePanel';
  // side panel character sheet container
  export { default as CharacterSheetPanel } from './CharacterSheetPanel';

// ===PAGE-SPECIFIC===
 // image carousel
 export { default as ImageCarousel } from './ImageCarousel';