<template>
    <v-row align="center" justify="center">
        <v-col>
            <v-hover v-slot:default="{ hover }" :disabled="disabled">
                <v-card :elevation="hover ? 12 : 2" class="mx-auto">
                    <v-card-text class="my-4 text-center title">
                        <li>
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
                            <a :href="isLink">
                                <div class="title">
                                    <img class="userAvator" :src="i.avator" />
                                    {{i.title}}
                                </div>
                                <div class="content markdown">{{i.content}}</div>
                            </a>
                        </li>
                    </v-card-text>
                </v-card>
            </v-hover>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        i: { type: Object, required: true },
        href: {
            type: Boolean,
            default: true
        }
    },
    name: "Article",
    data: function() {
        return {
            disabled: this.href ? false : "disabled"
        };
    },

    computed: {
        isLink: function() {
            return this.href ? `/#/postView?id=${this.i.id}` : "javascript:;";
        }
    }
};
</script>

<style lang="scss">
    .v-application ol,
    .v-application ul {
        padding-right: 24px;
    }
</style>