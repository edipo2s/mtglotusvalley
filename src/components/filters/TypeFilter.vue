<template>
  <div class="ml-2 mr-2 textNoSelect">
    <div class="pt-1 pl-2 pr-2 pb-1">
      <div class="text-xs-left body-1 font-weight-bold">
        <span>Types</span>
      </div>
      <v-layout row nowrap class="text-xs-left mt-1">
        <v-tooltip v-for="type in types" :key="type.code" top open-delay=1000>
          <img :class="!activeTypes.includes(type.code) ? 'grayscale' : ''" slot="activator"
            :src="require(`@/assets/types/${type.code}.png`)" @click="typeClick(type.code)"/>
          {{ type.name }}
        </v-tooltip>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Utils from '@/scripts/utils'

export default {
  props: [
    'value'
  ],
  data () {
    return {
      activeTypes: [],
      types: Utils.types
    }
  },
  mounted () {
    this.activeTypes = this.value.split(',')
  },
  methods: {
    typeClick (name) {
      this.toogleItem(this.activeTypes, name)
      this.$emit('input', this.activeTypes.sort().join())
    },
    toogleItem (array, item) {
      if (array.includes(item)) {
        array.splice(array.indexOf(item), 1)
      } else {
        array.push(item)
      }
    }
  },
  watch: {
    value: function (value) {
      this.activeTypes = value.split(',')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-card {
    border: solid 1px lightgray;
    border-radius: 8px;
    align-items: baseline;
    display: inline-block;
  }
  img {
    border-radius: 8px;
    height: 34px;
    padding: 4px;
  }
  img:hover {
    background: lightgray;
  }
  .grayscale {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }
</style>
