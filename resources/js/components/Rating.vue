<template>
    <div>
        <img src="images/yelp/large_0.png" v-if="rating == 0">
        <img src="images/yelp/large_1.png" v-if="rating == 1">
        <img src="images/yelp/large_1_half.png" v-if="rating == 1.5">
        <img src="images/yelp/large_2.png" v-if="rating == 2">
        <img src="images/yelp/large_2_half.png" v-if="rating == 2.5">
        <img src="images/yelp/large_3.png" v-if="rating == 3">
        <img src="images/yelp/large_3_half.png" v-if="rating == 3.5">
        <img src="images/yelp/large_4.png" v-if="rating == 4">
        <img src="images/yelp/large_4_half.png" v-if="rating == 4.5">
        <img src="images/yelp/large_5.png" v-if="rating == 5">
        <span class="grey--text ml-4" style="vertical-align: top;">({{ review_count }} Reviews)</span>
    </div>
</template>

<script>
    export default {
        name: 'Rating',
        props: ['rating', 'review_count']
    }
</script>
