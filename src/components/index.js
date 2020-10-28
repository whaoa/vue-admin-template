import AlContainer from './AlContainer';

export { default as AlContainer } from './AlContainer';
export { default as AlCardContainer } from './AlContainer/components/CardContainer';
export { default as AlFullContainer } from './AlContainer/components/FullContainer';
export { default as AlCGhostContainer } from './AlContainer/components/GhostContainer';
export { default as AlRouterContainer } from './AlContainer/components/RouterContainer';

const components = {
  AlContainer,
};

export default {
  install (Vue) {
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key]);
    });
  },
};
