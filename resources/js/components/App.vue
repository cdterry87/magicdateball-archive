<template>
    <v-app class="inspire">
        <v-content>
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
                            <div v-if="searchComplete || tryingAgain || triedAgain" class="animated" :class="{zoomIn: (searchComplete && !tryingAgain), flipOutY: tryingAgain, flipInY: triedAgain}">
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
                                        <div class="text-right my-5">
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
                            <v-card-text class="pb-0">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <div v-if="!geolocation">
                                                <v-text-field hide-details outlined prepend-inner-icon="mdi-map-marker" v-model="location" ref="location" id="location" label="Location (City/State/Zip)" color="pink" autocomplete="off" :rules="[v => !!v || 'City/State/Zip is required']" required></v-text-field>
                                            </div>
                                            <div v-else class="caption">
                                                <v-icon>mdi-information</v-icon> Magic Date Ball is using your location to find nearby results.
                                                <a class="font-weight-bold" @click="disableGeolocation">Click here to manually set your location.</a>
                                            </div>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-subheader>Radius (miles)</v-subheader>
                                            <v-slider v-model="radius" color="pink" track-color="purple" min="0" max="4" ticks="always" :tick-labels="radiusLabels"></v-slider>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-subheader>Price</v-subheader>
                                            <v-range-slider v-model="priceRange" color="pink" track-color="purple" min="0" max="3" ticks="always" :tick-labels="priceLabels" ></v-range-slider>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field hide-details outlined prepend-inner-icon="mdi-key" v-model="keyword" ref="keyword" id="keyword" label="Keyword (optional)" placeholder="(i.e. Japanese, sushi, etc.)" color="pink" autocomplete="off"></v-text-field>
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
        </v-content>
        <div class="footer caption text-center mt-5 mb-3">
            Magic Date Ball &copy; 2019
        </div>
    </v-app>
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
            tryingAgain: false,
            triedAgain: false,
            geolocation: false,
            location: '',
            latitude: '',
            longitude: '',
            keyword: '',
            radius: 2,
            radiusValues: [8000, 16000, 24000, 32000, 40000],
            radiusLabels: [5, 10, 15, 20, 25],
            priceRange: [1,2],
            priceValues: [1, 2, 3, 4],
            priceLabels: ['$', '$$', '$$$', '$$$$'],
            result: '',
            results: []
        }
    },
    methods: {
        openDialog() {
            this.dialog = true
        },
        search() {
            if (this.geolocation || this.$refs.form.validate()) {
                this.isSearching = true
                this.dialog = false
                this.loading = true

                let location = this.location
                let latitude = this.latitude
                let longitude = this.longitude
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

                localStorage.setItem('mdbLocation', location)
                localStorage.setItem('mdbRadius', this.radius)
                localStorage.setItem('mdbPriceRange', JSON.stringify(this.priceRange))

                axios.get('/api/search', {
                    params: {
                        location, latitude, longitude, radius, price, keyword
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
            this.tryingAgain = false
            this.triedAgain = false
            localStorage.removeItem('mdbResult')
            localStorage.removeItem('yelpResults')
        },
        tryAgain() {
            this.tryingAgain = true
            this.searchComplete = false
            localStorage.removeItem('mdbResult')

            setTimeout(function() {
                this.chooseRandom()
                this.tryingAgain = false
                this.triedAgain = true
            }.bind(this), 999)
        },
        enableGeolocation() {
            this.geolocation = false
            let vm = this

            function success(position) {
                vm.geolocation = true
                vm.latitude  = position.coords.latitude;
                vm.longitude = position.coords.longitude;
            }

            function error() {
                vm.geolocation = false
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            }
        },
        disableGeolocation() {
            this.geolocation = false
            this.latitude = ''
            this.longitude = ''
        }
    },
    mounted() {
        this.enableGeolocation()

        let yelpResults = localStorage.getItem('yelpResults')
        let mdbResult = localStorage.getItem('mdbResult')
        let mdbLocation = localStorage.getItem('mdbLocation')
        let mdbRadius = localStorage.getItem('mdbRadius')
        let mdbPriceRange = localStorage.getItem('mdbPriceRange')

        if (yelpResults) {
            this.results = JSON.parse(yelpResults)
        }

        if (mdbResult) {
            this.result = JSON.parse(mdbResult)
            this.searchComplete = true
        }

        if (mdbLocation) {
            this.location = mdbLocation
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
