import Loading from "./Loading";
export default {
    install(Vue, options = {}) {
        const Vueloading = Vue.extend(Loading);
        let loading = null;
        function $loading(params) {
            return new Promise(resolve => {
                if (!loading) {
                    loading = new Vueloading();
                    loading.$mount();
                    document.querySelector(options.container || "body").appendChild(loading.$el);
                }
                loading.showLoading(params);
                resolve();
            });
        }

        Vue.prototype.$loading = $loading;
    }
};
