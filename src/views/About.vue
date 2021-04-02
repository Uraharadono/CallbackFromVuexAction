<template>
  <div class="container">
  <div class="row m-row justify-content-between">
    <h1>True test of show-off? (hover the toaster when it appears)</h1>
    <button @click="doSuccess" type="button" class="btn btn-success">Success</button>
    <button @click="doError" type="button" class="btn btn-danger">Error</button>
    <button @click="doWarning" type="button" class="btn btn-warning">Warning</button>
    <button @click="doInfo" type="button" class="btn btn-info">Info</button>
    <button @click="doQuestion" type="button" class="btn btn-primary">QUESTION?</button>
  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    methods: {
      ...mapActions(["fakeSuccess", "fakeError", "fakeWarning", "fakeInfo", "fakeQuestion"]),
    doSuccess() {
      this.fakeSuccess();
    },
    doError() { 
      this.fakeError();
    },
    doWarning(){
      this.fakeWarning()
    },
    doInfo(){
      this.fakeInfo()
    },
    doQuestion() {
      this.fakeQuestion()
    }
  },  
};
</script>