<template>
  <al-container type="card">
    <h2>Father</h2>
    <al-container>
      <p v-for="i in list" :key="i">{{ i }}</p>
    </al-container>
    <al-container type="router" />
    <!--<el-button @click="$router.replace('/father/children2')">Home</el-button>-->
    <el-input v-model="value" />
  </al-container>
</template>

<script>
export default {
  name: 'Father',
  data () {
    return {
      list: [1, 2],
      value: '',
    };
  },
  mounted () {
    setTimeout(() => {
      this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    }, 3000);
  },
};
</script>

<style scoped>

</style>
