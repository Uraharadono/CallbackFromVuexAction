<template>
  <div class="vertical layout" id="app">
    <div class="layout-wrap">
      <HorizontalNavbar></HorizontalNavbar>

      <main class="main">
        <div class="content-container">
           <div class="content">
            <router-view />
          </div>
        </div>

        <Footer></Footer>
      </main>
    </div>
  </div>
</template>

// <style lang="scss">
// Some say way to import stuff above is bad, because vue's pathfinding is awfull
// @import "./styles/bootstrap-bundle.scss";
</style>
<style lang="scss" src="./styles/bootstrap-bundle.scss"></style>
<style lang="scss" src="./styles/sweet-alert.scss"></style>
<style lang="scss" src="./styles/utility.scss"></style>

<script>
import HorizontalNavbar from "./views/Shared/HorizontalNavbar.vue";
import Footer from "./views/Shared/Footer.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { HorizontalNavbar, Footer },
  created() {
    /* Explanation: 
     * Since we cannot acces "this.$swal" from our stores, we have to create a watch here to "observe" changes in our toaster state,
     * and then fire toaster when they happen.*/
    this.$store.watch(
      state => { 
        return state.sweetToast.ticks;
      },
      toast => {
        // If we don't have "globalSwal" variable in our "sweet-toast.js", we need to add it
        // We need it to call functions from "this.$swal" that is inaccessible there
        if(!this.currentToast.globalSwal)
          this.addGlobalSwal(this.$swal);
        this.$swal(this.currentToast);
      }
    );
  },
  methods: {
    ...mapActions({
      addGlobalSwal: 'sweetToast/setGlobalSwal' // method for "sweet-toast.js"
    }),
  },
  computed: {
    ...mapGetters({
          // map `sweetToast/currentToast` to `this.currentToast`
        currentToast: 'sweetToast/currentToast' // method for "sweet-toast.js"
    }),    
  },
};
</script>