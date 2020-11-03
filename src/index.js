var app = new Vue({
  el: "#app",
  data: {
    icons: [],
    searchKeyword: "",
  },
  mounted() {
    this.getIcons();
  },
  computed: {
    filteredIcons() {
      if (this.searchKeyword === "") return this.icons;

      return this.icons.filter((icon) =>
        icon.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    },
  },
  methods: {
    getIcons() {
      import(/* webpackChunkName: "icons" */ "../lib/icons")
        .then((icons) => {
          Object.keys(icons).forEach((iconName, key) => {
            this.icons.push(icons[iconName]);
          });
        })
        .catch(
          (error) => `An error occurred while loading the component: ${error}`
        );
    },
  },
});
