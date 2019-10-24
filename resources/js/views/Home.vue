<template>
    <div id="home">
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4" class="text-center" style="height: 100%; position: relative">
                    <div class="mb-5">
                        <div class="mb-3 headline">
                            Where do you wanna eat? Ask the
                        </div>
                        <a href="/" class="display-3 logo">Magic Date Ball</a>
                    </div>

                    <v-avatar color="black" size="250" class="elevation-10 text-center">
                        <v-icon dark size="125" @click="dialog = true">mdi-numeric-8-circle</v-icon>
                    </v-avatar>

                    <v-content class="mt-5 text-left">
                        <v-list v-if="results.length > 0" three-line light>
                            <v-list-item v-for="(result, index) in results" :key="index">
                                <v-list-item-avatar>
                                    <v-img :src="result.image_url"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-text="result.name"></v-list-item-title>
                                    <v-list-item-subtitle>
                                        <v-chip dark color="pink">{{ result.rating }}</v-chip>
                                        <v-chip dark color="pink">{{ result.price }}</v-chip>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-content>

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
                                                <v-text-field outlined prepend-inner-icon="mdi-map-marker" v-model="zip" label="Zip Code" color="pink" autocomplete="off" :rules="[v => !!v || 'Zip Code is required']" required></v-text-field>
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
                </v-col>
            </v-row>
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
                radius: 3,
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
                results: []
            }
        },
        methods: {
            search() {
                if (this.$refs.form.validate()) {
                    let zip = this.zip
                    let radius = this.radiusValues[this.radius]
                    let price = this.priceValues[this.price]

                    this.dialog = false
                    this.loading = true

                    axios.get('/api/search', {
                        params: {
                            zip, radius, price
                        }
                    })
                    .then(response => {
                        this.results = response.data.businesses

                        this.loading = false
                    })
                }
            },

        }
    }
</script>

