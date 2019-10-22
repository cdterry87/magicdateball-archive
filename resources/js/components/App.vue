<template>
    <div>
        <v-app class="inspire">
            <v-toolbar color="transparent" flat>
                <v-toolbar-title>
                    <a href="/" class="display-1 logo">Magic Date Ball</a>
                </v-toolbar-title>
            </v-toolbar>
            <v-content>
                <router-view></router-view>
            </v-content>

            <div class="footer caption text-center mt-5 mb-3">
                Magic Date Ball &copy; 2019
            </div>
        </v-app>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {

        }
    }
}
</script>
