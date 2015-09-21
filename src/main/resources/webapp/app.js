(function ($) {
    var Picture = Backbone.Model.extend({
        defaults: {
            id: 0,
            name: "cute kittens",
            ratio: 1.5
        },
        idAttribute: "id"
    });

    var Gallery = Backbone.Collection.extend({
        url: 'http://localhost:8080/files',
        model: Picture
    });

    var PictureView = Backbone.View.extend({
        template: $('#picture_template').html(),

        render: function () {
            var tmpl = _.template(this.template);
            var id = this.model.get('id');
            var pictureDTO = {
                id: id,
                name: this.model.get('name'),
                thumbnailUrl: "http://localhost:8080/picture/small/" + id,
                href: "#show_popup_link_" + id,
                imgUrl: "http://localhost:8080/picture/" + id,
                ratioClass: this.model.get('ratio') > 1.45 ? 'file bigfile' : 'file'
            };
            $(this.el).html(tmpl(pictureDTO));
            return this;
        },

        events: {
            "click .close": "deletePicture"
        },

        deletePicture: function () {
            this.model.destroy({
                type: 'post',
                url: "http://localhost:8080/remove/" + this.model.get('id')
            });
            this.remove();
        }
    });

    var GalleryView = Backbone.View.extend({
            el: $("#file-container"),

            initialize: function () {
                _.bindAll(this, 'render', 'renderPicture'); // every function that uses 'this' as the current object should be in here
                this.collection = new Gallery();
                this.collection.fetch();
                this.render();

                this.collection.on("add", this.renderPicture, this); //either time or sth, needs this to sync db
                this.collection.on("reset", this.render, this);

            },

            render: function () {
                that = this;
                _.each(this.collection.models, function (item) {
                    that.renderPicture(item);
                }, this);
                return that;
            },

            renderPicture: function (item) {
                var pictureView = new PictureView({model: item});
                this.$el.append(pictureView.render().el);
            }
        }
    );

    var mainPageView = new GalleryView();

})(jQuery);
