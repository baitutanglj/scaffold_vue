<template>
  <div>
    <h1 class="pagetitle">Scaffold-Decorator Train</h1>
    <br>
    <TrainCom1 url="/train"></TrainCom1>
  </div>
</template>

<script>
import TrainCom1 from '@/components/TrainCom1'
export default {
  name: 'PageOne',
  components: {
    TrainCom1
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/pagetitle';
</style>
