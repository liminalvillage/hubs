<template>
   <z-view   :style="[{backgroundImage:`url(./images/${this.image})`},{backgroundSize: `80% 80%`},{backgroundRepeat: `no-repeat`},{backgroundPosition: `center`}]"
      >
    <div v-if="!text">
      <h1>{{name}}</h1>
      <br/>
      <i v-if="quote">"{{quote}}"</i>
      <br/>
      <br/>
      <i><b>{{quoteauthor}}</b></i>
    </div>
    <div v-else slot="default" style="width:85%;margin:5%;"> <vue-markdown :source="this.text"></vue-markdown></div>
    <div slot="extension">
      <z-spot v-for="(holon,index) in holons" :key="holon.id"
      :label="holonslabels[index]"
      :angle=" 200 - (index * (220./(holons.length-1)))"
      size="m"
      :distance="130"
      :label-pos="index>=holons.length/2?'right':'left'"
      :to-view="{name:'holon', params: {id: holon.id}}"
       >
       <!-- :style="[{backgroundImage:`url(./images/${holonsimages[index]})`},{backgroundSize: `80% 80%`},{backgroundRepeat: `no-repeat`},{backgroundPosition: `center`}]"
      -->
      <img v-if=holonsimages[index] :src="`./images/${holonsimages[index]}`" style="width: 80%; margin-top:auto; margin-bottom:auto;">
       <!-- :imagePath = "holonsimages[index]?'./images/'+ holonsimages[index]:''"
      -->
      </z-spot>
      <!-- settings-->
      <!-- <z-spot
        :angle="270"
        :distance="140"
        size="s"
        label="Settings"
        to-view="settings">
        <i class="fas fa-sliders-h"></i>
      </z-spot> -->
      <z-spot
      button
      :angle="240"
      :distance="120"
      size="xs"
      label="EN"
      :class="this.$store.state.language == 'en'? 'accent': ''"
      label-pos='top'
      @click.native="setLanguage('en')"
      >
       </z-spot>
       <z-spot
      button
      :angle="270"
      :distance="120"
      size="xs"
      label="IT"
      :class="this.$store.state.language == 'it'? 'accent': ''"
      label-pos='top'
      @click.native="setLanguage('it')"
      >
      </z-spot>
       <z-spot
      button
      :angle="300"
      :distance="120"
      size="xs"
      label="NL"
      :class="this.$store.state.language == 'nl'? 'accent': ''"
      label-pos='top'
      @click.native="setLanguage('nl')"
      >
       </z-spot>
    </div>
  </z-view>
</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  methods: {
    setLanguage (language) {
      this.$store.commit('setLanguage', language)
      this.holonInfo()
    },
    holonInfo () {
      fetch('/text/' + this.$store.state.language + '/home.json')
        .then(r => r.json())
        .then(json => {
          this.name = json.name
          this.text = json.text
          this.quote = json.quote
          this.image = json.image
          this.quoteauthor = json.quoteauthor
          this.holons = json.holons
          if (json.holons) {
            // fetch names of each sub-holon
            Promise.all(
              this.holons.map(async (holon, index) => {
                var r = await fetch('/text/' + this.$store.state.language + '/' + holon.id + '.json')
                var json = await r.json()
                return json.name
              })
            ).then((values) => {
              this.holonslabels = values
            })
            // fetch images of each sub-holon
            Promise.all(
              this.holons.map(async (holon, index) => {
                var r = await fetch('/text/' + this.$store.state.language + '/' + holon.id + '.json')
                var json = await r.json()
                return json.image
              })
            ).then((values) => {
              this.holonsimages = values
            })
          }
        },
        response => {
          console.log('Error loading json:', response)
        })
    }
  },
  mounted () {
    fetch('http://ip-api.com/json')
      .then(response => response.json())
      .then(data => {
        if (data.countryCode === 'IT') {
          this.setLanguage('it')
        }
        if (data.countryCode === 'NL' || data.countrycode === 'BE') {
          this.setLanguage('nl')
        }
      }
      )
    this.holonInfo()
  },

  data () {
    return {
      id: 'home',
      name: '',
      text: '',
      quote: '',
      quoteauthor: '',
      image: '',
      holons: [],
      holonslabels: [],
      holonsimages: []
    }
  }
}
</script>
