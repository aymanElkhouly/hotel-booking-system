module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/booking/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                @import "@/stylesheets/variables.scss";
                @import "@/stylesheets/mixins.scss";
                `
      }
    }
  }
}
