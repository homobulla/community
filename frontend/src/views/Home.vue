<template>
    <div class="home">
        <v-app>
            <div class="container">
                <ul class="posts">
                    <li v-for="i in list" :key="i.id">
                        <div class="author">
                            <span>
                                <a href="/posts?author=">author:{{i.name}}</a>
                            </span>
                            <span>评论数：{{i.comments}}</span>
                            <span>浏览量：{{i.pv}}</span>
                        </div>
                        <div class="comment_pv">
                            <span>{{i.moment}}</span>
                        </div>
                        <a href="/posts/<%= res.id %>">
                            <div class="title">
                                <img class="userAvator" :src="i.avator" />
                            </div>
                            <div class="content markdown">{{i.content}}</div>
                        </a>
                    </li>
                </ul>
            </div>
        </v-app>
    </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            list: []
        };
    },
    mounted() {
        api.getAllPosts().then(res => {
            console.log(res);
            this.list = res.posts;
        });
    }
};
</script>
