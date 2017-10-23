export
let forwardMixin = {
    methods: {
        forward(path, params) {
            if (path) {
                if (params) {
                    this.$router.push({
                        name: path,
                        query: JSON.parse(params)
                    });
                } else {
                    this.$router.push(path);
                }
            } else {
                this.$router.push("home");
            }
        }
    }
}
