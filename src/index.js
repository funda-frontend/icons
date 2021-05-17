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
      import(/* webpackChunkName: "icons" */ "../lib/esm")
        .then((icons) => {
          Object.keys(icons).forEach((iconName, key) => {
            this.icons.push(icons[iconName]);
          });
        })
        .catch(
          (error) => `An error occurred while loading the component: ${error}`
        );
    },
    async copy(icon) {
      try {
        await navigator.clipboard.writeText(icon.svg);
        alert(`"${icon.title}" svg is copied to your clipboard`);
      } catch (err) {
        alert(`Can't copy ${icon.title} raw svg`);
      }
    },
  },
});
