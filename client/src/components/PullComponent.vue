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
    <p class="no-pulls" v-if="pulls.length == 0">No Open Pull Requests for this Repo </p>
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
        <a :href="pull.compareUrl.replace('api.github.com/repos/', 'github.com/')" target="_blank" class="compare">See Compare URL</a>
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
      try {
        let text = this.text
        this.pulls = await PullService.getPulls(text)
        this.error = '';
      } catch(err) {
        this.error = err.message;
        this.pulls = [];
      }
  }
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.pull {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
