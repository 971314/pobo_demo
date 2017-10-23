import City from "./coCity.vue";
import CommonNav from "./coCommonNav.vue";
import MessageIcon from "./coMessageIcon.vue";

const pbUI = {
  City,
  CommonNav,
  MessageIcon,
}

const install = Vue => {
  if(install.installed) return;

  // components
  Object.keys(pbUI).forEach(key => {
    Vue.component(pbUI[key].name, pbUI[key]);
  });

};

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...pbUI,
};
