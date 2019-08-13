<template>
    <v-footer v-bind="localAttrs" dark padless>
        <v-card text tile width="100%" class="indigo lighten-1 white--text text-center">
            <v-card-text>
                <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon @click="footManage(icon)">
                    <v-icon size="24px">{{ icon }}</v-icon>
                </v-btn>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} —
                <strong>homobulla</strong>
            </v-card-text>
            <v-bottom-sheet v-model="sheet">
                <v-sheet class="text-center" height="200px">
                    <v-btn class="pop-close indigo white--text" @click="sheet = !sheet">close</v-btn>
                    <div>这是关于本站更多资讯</div>
                </v-sheet>
            </v-bottom-sheet>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: ["home", "email", "event", "more"],
        items: ["default", "absolute", "fixed"],
        padless: false,
        variant: "fixed",
        sheet: false
    }),

    computed: {
        localAttrs() {
            const attrs = {};
            if (this.variant === "default") {
                attrs.absolute = false;
                attrs.fixed = false;
            } else {
                attrs[this.variant] = true;
            }
            return attrs;
        }
    },
    methods: {
        footManage(icon) {
            if (icon === "more") {
                this.sheet = true;
            } else if (icon === "home") {
                this.$router.push("/");
            }
        }
    }
};
</script>

<style lang="css" scoped>
    .theme--light.v-footer {
        padding: 0px;
    }
    .pop-close {
        position: absolute;
        right: 1px;
    }
</style>