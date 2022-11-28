// export default (selector) => {
//   new Vue({
//     router,
//     store,
//     vuetify,
//     i18n,
//     render: (h) => h(App),
//     created: () => {
//       store.commit("Accounts/loadAccounts");
//       if (store.getters["Accounts/hasAccounts"] > 0) router.replace("/access");
//     },
//     mounted() {
//       // Reveal app version
//       console.log(`App Version: ${process.env.VUE_APP_VERSION}`);
//       // Hide loader once vue is initialized
//       let loader = document.getElementById("app_loading");
//       if (loader) {
//         loader.style.display = "none";
//       }
//     },
//     data: {
//       theme: "day",
//     },
//   });
// };
