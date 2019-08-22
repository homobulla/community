<template>
    <div class="home">
        <v-app>
            <div class="container">
                <ul class="posts">
                    <Article :i="res.posts" :href="false"></Article>
                </ul>
            </div>
            <div class="comment_wrap">
                <form class="form" method="post" action="/<%= posts.id %>">
                    <textarea id="spContent" name="content" cols="82" v-model="content"></textarea>
                    <div class="submit" @click="comment">发表留言</div>
                </form>
                <div class="comment_list markdown" v-if="res.pageOne.length">
                    <div class="cmt_lists" v-for="item in res.pageOne" :key="item.id">
                        <div class="cmt_content text-left">
                            <div class="userMsg">
                                <img :src="item.avator" />
                                <span>{{item.name}}</span>
                            </div>
                            <div class="cmt_detail" v-html="item.content"></div>
                            <span class="cmt_time">{{item.moment}}</span>
                            <span class="cmt_name" v-show="item.name == userId">
                                <span class="delete_comment" @click="remove(item.id)">删除</span>
                            </span>
                        </div>
                    </div>
                </div>

                <p v-else class="tips">还没有评论，赶快去评论吧!!！</p>
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
            res: {
                posts: {},
                pageOne: []
            },
            userId: localStorage.getItem("name"),
            postId: this.$route.query.id,
            content: ""
        };
    },
    components: {
        Article
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let postId = this.postId;
            api.getPostById({ postId })
                .then(res => {
                    if (res.success) {
                        this.res = res.data;
                    } else {
                    }
                })
                .catch(err => {});
        },
        comment() {
            let data = {
                postId: this.postId,
                content: this.content
            };
            api.comment(data)
                .then(res => {
                    res.success && this.getData();
                })
                .catch(err => {});
        },
        remove(commentId) {
            let data = {
                postId: this.postId,
                commentId
            };
            api.deleteComment(data)
                .then(res => {
                    if (res.success) {
                        this.getData();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
