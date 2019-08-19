<template>
    <div class="home">
        <v-app>
            <div class="container">
                <ul class="posts">
                    <Article v-for="i in list" :key="i.id" :i="i"></Article>
                </ul>
            </div>
        </v-app>
    </div>
</template>

<script>
import Article from "../components/Article";
export default {
    name: "home",
    data() {
        return {
            list: []
        };
    },
    components: {
        Article
    },
    mounted() {
        api.getAllPosts()
            .then(res => {
                res.message && (this.list = res.data.posts);
            })
            .catch(err => {
                console.log(err, "rrrr");
            });
    }
};
</script>
