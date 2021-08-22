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
    holonInfo () {
      if (this.$zircle.getParams()) {
        this.id = this.$zircle.getParams().id
      } else {
        this.id = 'home'
      }
      fetch('/text/' + this.$store.state.language + '/' + this.id + '.json')
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
    this.holonInfo()
  },

  data () {
    return {
      id: 'home',
      language: 'en',
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
