<template>
    <v-layout row align-center>
      <v-flex hidden-sm-and-down md3 lg2 xl3>
      </v-flex>
      <v-flex           xs12 sm8 md6 lg7 xl6>
        <ColorDistribution :cards="deckCards"/>
        <ManaCurve :manaCurve="deckManaCurve"/>
      </v-flex>
      <v-flex hidden-xs-only sm4 md3 lg3 xl3>
        <div class='mt-5'>
          <Deck :cards="deckCards" :name="deckName" :userCollection="userCollection"/>
        </div>
      </v-flex>
    </v-layout>
</template>

<script>
import ColorDistribution from '@/components/charts/ColorDistribution'
import Deck from '@/components/mtg/Deck'
import ManaCurve from '@/components/charts/ManaCurve'

export default {
  name: 'PrivateDeck',
  components: {
    ColorDistribution, Deck, ManaCurve
  },
  created () {
    this.requestDeck()
  },
  data () {
    return {
      deckAlias: this.$route.params.alias,
      deckCards: {},
      deckName: '',
      deckManaCurve: {},
      isLoading: false,
      userCollection: {}
    }
  },
  methods: {
    requestDeck: function () {
      this.isLoading = true
      this.$api.getPublicDeck(this.deckAlias)
        .then(res => {
          this.isLoading = false
          this.deckCards = res.data.cards
          this.deckName = res.data.name
          this.deckManaCurve = res.data.manaCurve
          if (this.$isUserLogged()) {
            this.getUserCollection()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getUserCollection: function () {
      this.isLoading = false
      this.$api.getUserCollection()
        .then(res => {
          this.isLoading = false
          this.userCollection = res.data
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>