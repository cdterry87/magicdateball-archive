<template>
    <div id="home">
        <v-container class="fill-height" fluid>
            <v-layout text-center>
                <v-flex xs12 sm6 offset-sm3>
                    <div class="mb-5">
                        <div class="mb-2 headline">
                            Where do you wanna eat? Ask the
                        </div>
                        <a href="/" class="display-3 logo">Magic Date Ball</a>
                    </div>

                    <v-avatar transition="slide-y-transition" color="black" size="250" class="elevation-10 text-center" v-if="results.length == 0">
                        <v-icon dark size="125" @click="openDialog">mdi-numeric-8-circle</v-icon>
                    </v-avatar>

                    <div v-if="results.length > 0">
                        <v-card class="mx-auto my-3" max-width="450" light>
                            <v-img :src="result.image_url" height="250"></v-img>
                            <v-card-text>
                                <v-row class="mx-0 title">
                                    {{ result.name }}
                                </v-row>
                                <v-row class="mx-0">
                                    {{ result.location.display_address[0] }}
                                </v-row>
                                <v-row class="mx-0">
                                    {{ result.location.display_address[1] }}
                                </v-row>
                                <v-row class="mx-0">
                                    <v-rating :value="result.rating" color="amber" dense half-increments readonly size="14"></v-rating>
                                    <div class="grey--text ml-4">{{ result.rating }} ({{ result.review_count }})</div>
                                </v-row>
                                <div class="text-left">
                                    <v-chip color="purple" dark>{{ result.price }}</v-chip>
                                    <v-chip color="pink" class="ma-1" dark v-for="(category, index) in result.categories" :key="index">{{ category.title }}</v-chip>
                                </div>
                            </v-card-text>
                        </v-card>

                        <div class="mt-5 text-center">
                            <v-btn color="white" text @click="tryAgain">Try Again?</v-btn>
                            <v-btn color="white" text @click="clearResults">Clear</v-btn>
                        </div>
                    </div>
                </v-flex>
            </v-layout>

            <v-dialog v-model="dialog" light max-width="500px">
                <v-card>
                    <v-form id="form" @submit.prevent="search" ref="form" lazy-validation>
                        <v-card-title>
                            <span class="headline">Just a few more details!</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field outlined prepend-inner-icon="mdi-map-marker" v-model="zip" ref="zip" id="zip" label="Zip Code" color="pink" autocomplete="off" :rules="[v => !!v || 'Zip Code is required']" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-subheader>Radius (miles)</v-subheader>
                                        <v-slider
                                        v-model="radius"
                                        color="pink"
                                        track-color="purple"
                                        min="0"
                                        max="4"
                                        ticks="always"
                                        :tick-labels="radiusLabels"
                                        ></v-slider>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-subheader>Price</v-subheader>
                                        <v-slider
                                        v-model="price"
                                        color="pink"
                                        track-color="purple"
                                        min="0"
                                        max="3"
                                        ticks="always"
                                        :tick-labels="priceLabels"
                                        ></v-slider>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn type="submit" color="pink" text x-large>Ready, Set, Date!</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                dialog: false,
                loading: false,
                zip: '',
                radius: 2,
                radiusValues: [
                    8000, 16000, 24000, 32000, 40000
                ],
                radiusLabels: [
                    5, 10, 15, 20, 25
                ],
                price: 1,
                priceValues: [
                    '1', '1,2', '1,2,3', '1,2,3,4'
                ],
                priceLabels: [
                    '$', '$$', '$$$', '$$$$'
                ],
                keywords: '',
                result: '',
                results: []
            }
        },
        methods: {
            openDialog() {
                this.dialog = true
                this.$nextTick(() => this.$refs.zip.focus())
            },
            search() {
                if (this.$refs.form.validate()) {
                    this.dialog = false
                    this.loading = true

                    let zip = this.zip
                    let radius = this.radiusValues[this.radius]
                    let price = this.priceValues[this.price]

                    localStorage.setItem('mdbZip', zip)
                    localStorage.setItem('mdbRadius', this.radius)
                    localStorage.setItem('mdbPrice', this.price)

                    axios.get('/api/search', {
                        params: {
                            zip, radius, price
                        }
                    })
                    .then(response => {
                        this.results = response.data.businesses
                        localStorage.setItem('yelpResults', JSON.stringify(this.results))

                        this.chooseRandom()

                        this.loading = false
                    })
                }
            },
            chooseRandom() {
                this.result = this.results[Math.floor(Math.random()*this.results.length)]
                localStorage.setItem('mdbResult', JSON.stringify(this.result))
            },
            clearResults() {
                this.result = ''
                this.results = []
                localStorage.removeItem('mdbResult')
                localStorage.removeItem('yelpResults')
            },
            tryAgain() {
                localStorage.removeItem('mdbResult')
                this.chooseRandom()
            }
        },
        mounted() {
            let yelpResults = localStorage.getItem('yelpResults')
            let mdbResult = localStorage.getItem('mdbResult')
            let mdbZip = localStorage.getItem('mdbZip')
            let mdbRadius = localStorage.getItem('mdbRadius')
            let mdbPrice = localStorage.getItem('mdbPrice')

            if (yelpResults) {
                this.results = JSON.parse(yelpResults)
            }

            if (mdbResult) {
                this.result = JSON.parse(mdbResult)
            }

            if (mdbZip) {
                this.zip = JSON.parse(mdbZip)
            }

            if (mdbRadius) {
                this.radius = JSON.parse(mdbRadius)
            }

            if (mdbPrice) {
                this.price = JSON.parse(mdbPrice)
            }
        }
    }
</script>

