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

                    <div v-if="results.length == 0 || isSearching">
                        <v-avatar class="animated elevation-10 text-center" :class="{bounceInDown: (!isSearching && !searchComplete), wobble: isSearching, fadeOut: searchComplete}" color="black" size="300">
                            <v-icon dark size="150" @click="openDialog">mdi-numeric-8-circle</v-icon>
                        </v-avatar>
                    </div>

                    <div v-if="results.length > 0">
                        <div v-if="searchComplete" class="animated" :class="{zoomIn: searchComplete}">
                            <v-card class="mx-auto my-3" max-width="450" light>
                                <v-img :src="result.image_url" height="250"></v-img>
                                <v-card-text>
                                    <v-row class="mx-0 headline">
                                        {{ result.name }}
                                    </v-row>
                                    <v-row class="mx-0" v-if="result.location">
                                        <span class="mr-2" v-for="(address, addressIndex) in result.location.display_address" :key="addressIndex">
                                            {{ address }}
                                        </span>
                                    </v-row>
                                    <v-row class="mx-0 my-3" v-if="result.rating >= 0 && result.rating <= 5">
                                        <img :src="'images/yelp/ratings/' + result.rating + '.png'">
                                        <span class="grey--text ml-4" style="vertical-align: top;">({{ result.review_count }} Reviews)</span>
                                    </v-row>
                                    <div class="text-left my-3">
                                        <v-chip color="purple" v-if="result.price" dark>{{ result.price }}</v-chip>
                                        <v-chip color="pink" class="ma-1" dark v-for="(category, index) in result.categories" :key="index">{{ category.title }}</v-chip>
                                    </div>
                                    <div class="text-right my-4">
                                        <a :href="result.url" target="_blank" class="black--text font-weight-bold">View on <img src="images/yelp/logo.png" height="32" style="vertical-align: bottom;"></a>
                                    </div>
                                </v-card-text>
                            </v-card>

                            <div class="mt-5 text-center">
                                <v-btn color="white" text @click="tryAgain">Try Again?</v-btn>
                                <v-btn color="white" text @click="clearResults">Clear</v-btn>
                            </div>
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
                                        <v-range-slider
                                        v-model="priceRange"
                                        color="pink"
                                        track-color="purple"
                                        min="0"
                                        max="3"
                                        ticks="always"
                                        :tick-labels="priceLabels"
                                        ></v-range-slider>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field outlined prepend-inner-icon="mdi-key" v-model="keyword" ref="keyword" id="keyword" label="Keyword (optional)" placeholder="(i.e. Japanese, sushi, etc.)" color="pink" autocomplete="off"></v-text-field>
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
                isSearching: false,
                searchComplete: false,
                zip: '',
                keyword: '',
                radius: 2,
                radiusValues: [
                    8000, 16000, 24000, 32000, 40000
                ],
                radiusLabels: [
                    5, 10, 15, 20, 25
                ],
                priceRange: [1,2],
                priceValues: [
                    1, 2, 3, 4
                ],
                priceLabels: [
                    '$', '$$', '$$$', '$$$$'
                ],
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
                    this.isSearching = true
                    this.dialog = false
                    this.loading = true

                    let zip = this.zip
                    let radius = this.radiusValues[this.radius]
                    let keyword = this.keyword

                    // Determine the full range of prices the user selected
                    // Then create a string of the corresponding price values to be sent to Yelp
                    let price = ''
                    let priceRange = []
                    for (var i = this.priceRange[0]; i <= this.priceRange[1]; i++) {
                        priceRange.push(i);
                    }
                    priceRange.forEach(value => {
                        price += this.priceValues[value] + ','
                    })
                    price = price.substring(0, price.length - 1)
                    // End price formatting

                    localStorage.setItem('mdbZip', zip)
                    localStorage.setItem('mdbRadius', this.radius)
                    localStorage.setItem('mdbPriceRange', JSON.stringify(this.priceRange))

                    axios.get('/api/search', {
                        params: {
                            zip, radius, price, keyword
                        }
                    })
                    .then(response => {
                        this.results = response.data.businesses
                        localStorage.setItem('yelpResults', JSON.stringify(this.results))

                        this.chooseRandom()

                        this.loading = false
                        setTimeout(function() {
                            this.isSearching = false
                            this.searchComplete = true
                        }.bind(this), 999)
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
                this.searchComplete = false
                this.isSearching = false
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
            let mdbPriceRange = localStorage.getItem('mdbPriceRange')

            if (yelpResults) {
                this.results = JSON.parse(yelpResults)
            }

            if (mdbResult) {
                this.result = JSON.parse(mdbResult)
                this.searchComplete = true
            }

            if (mdbZip) {
                this.zip = JSON.parse(mdbZip)
            }

            if (mdbRadius) {
                this.radius = JSON.parse(mdbRadius)
            }

            if (mdbPriceRange) {
                this.priceRange = JSON.parse(mdbPriceRange)
            }
        }
    }
</script>

