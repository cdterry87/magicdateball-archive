<template>
    <div id="home">
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4" class="text-center">
                    <div class="mb-5">
                        <div class="mb-3 headline">
                            Where do you wanna eat? Ask the
                        </div>
                        <a href="/" class="display-3 logo">Magic Date Ball</a>
                    </div>

                    <v-avatar color="black" size="250" class="elevation-10 text-center">
                        <v-icon dark size="125" @click="search">mdi-numeric-8-circle</v-icon>
                    </v-avatar>
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
                loading: false,
                results: []
            }
        },
        methods: {
            search() {
                this.loading = true

                axios.get('/api/search')
                .then(response => {
                    this.results = response.data

                    this.loading = false
                })
            }
        }
    }
</script>

