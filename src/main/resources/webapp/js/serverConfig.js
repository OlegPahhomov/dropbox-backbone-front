var serverConfig = {

    //reconfig this to return base server
    SERVER: function () {
        return this.HEROKU;
    },

    url: function (url) {
        return serverConfig.SERVER() + url
    },


    HEROKU: "https://dropbox-sparkjava.herokuapp.com/",
    //define here elements
    LOCALHOST: "http://localhost:",
    XXX_SERVER: "some-external-url",
    SPARK_PORT: "4567/",
    JETTY_PORT: "8080/",
    SPRING_BOOT_PORT: "8080/",
    LEIN_RING_PORT: "3000/",
    NODE_JS_PORT: "3000/",
    SPARK: function () {
        return (this.LOCALHOST + this.SPARK_PORT)
    },
    JETTY: function () {
        return (this.LOCALHOST + this.JETTY_PORT)
    },
    SPRING_BOOT: function () {
        return (this.LOCALHOST + this.SPRING_BOOT_PORT)
    },
    LEIN_RING: function () {
        return (this.LOCALHOST + this.LEIN_RING_PORT)
    },
    NODE_JS: function () {
        return (this.LOCALHOST + this.NODE_JS_PORT)
    }
}
