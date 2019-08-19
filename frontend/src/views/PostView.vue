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
                    <textarea id="spContent" name="content" cols="82"></textarea>
                    <div class="submit">发表留言</div>
                </form>

                <p class="tips">登录之后才可以评论哟</p>

                <div class="comment_list markdown" v-if="res.pageOne.length">
                    <div class="cmt_lists" v-for="item in res.pageOne" :key="item.id">
                        <div class="cmt_content text-left">
                            <div class="userMsg">
                                <img :src="item.avator" />
                                <span>{{item.name}}</span>
                            </div>
                            <div class="cmt_detail" v-html="item.content"></div>
                            <span class="cmt_time">{{item.moment}}</span>
                            <span class="cmt_name" v-show="item.id == userId">
                                <span class="delete_comment">删除</span>
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
            userId: "",
            postId: this.$route.query.id
        };
    },
    components: {
        Article
    },
    created() {
        let postId = this.postId;
        api.getPostById({ postId })
            .then(res => {
                if (res.message) {
                    this.res = res.data;
                }
            })
            .catch(err => {
                console.log(err, "errrr");
            });
    }
};
</script>
