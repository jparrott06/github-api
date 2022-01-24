<template>
  <div class="container">
    <h1>Open Pull Requests</h1>
    <div class="search-repo">
      <label for="search-repo">Search Github Repo for Open Pull Requests</label>
      <input type="text" id="search-repo" v-model="text" placeholder="ex: https://github.com/{user}/{repo}">
      <button v-on:click="getOpenPRs">Search</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="pulls-container">
      <div class="pull"
        v-for="(pull, index) in pulls"
        v-bind:item="pull"
        v-bind:index="index"
        v-bind:key="pull.number"
        >
        <p class="number">Pull Request #{{ pull.number }}</p>
        <p class="total_commits">Total Commits: {{ pull.total_commits }}</p>
        <p class="state">Pull Request State: {{ pull.state }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PullService from '../PullService';

export default {
  name: 'PullComponent',
  data() {
    return {
      pulls: [],
      error: '',
      text: '',
    }
  },
  methods: {
    async getOpenPRs() {
      let text = this.text
      this.pulls = await PullService.getPulls(text)
  }
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
