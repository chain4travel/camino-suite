import Vue from "vue";
import Home from "./Home.vue";

export default (selector) => {
  new Vue({
    el: "#home",
    template: "<Home/>",
    components: { Home },
  }).$mount(selector);
};
