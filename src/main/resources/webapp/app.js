$(document).ready(function () {
    var picture = Backbone.Model.extend({
        defaults: {
            name: "cute kittens",
            ratio: 1.5,
            thumbnailUrl: "http://localhost:8080/picture/small/1",
            href: "#show_popup_link_1",
            imgUrl: "http://localhost:8080/picture/1",
            deleteId: "delete_file_1",
            ratioClass: "file"
        }
    });

    var Gallery = Backbone.Collection.extend({
        model: picture
    });

    var PictureView = Backbone.View.extend({
        template: $('#one_picture_template').html(),

        render: function () {
            var template = _.template(this.template);
            var html = template(this.model.toJSON());
            $(this.el).html(html);
            return this;
        },

        events: {
            "click .close": "deletePicture"
        },

        deletePicture: function () {
            this.model.destroy();
            this.remove();
        }
    });

    var GalleryView = Backbone.View.extend({
        el: $("#file-container"),

        initialize: function () {
            _.bindAll(this, 'render', 'renderPicture', 'removePicture'); // every function that uses 'this' as the current object should be in here
            this.render();

            this.collection.on("remove", this.removePicture, this);
        },

        render: function () {
            _.each(this.collection.models, function (picture) {
                this.renderPicture(picture);
            }, this);

            /*var template = _.template($('#pictures_template').html());
             var content = {
             content: this.model.get('content')
             };
             var html = template(content);
             this.$el.append(html);*/
            return this;
        },

        renderPicture: function (picture) {
            var onePictureView = new PictureView(
                {model: picture}
            );
            this.$el.append(onePictureView.render().el);
        },

        removePicture: function (picture) {
            var pictureData = picture.attributes;

            _.each(pictureData, function (val, key) {
                if (pictureData[key] === picture.defaults[key]) {
                    delete pictureData[key];
                }
            });

            _.each(mypictures, function (mypicture) {
                if (_.isEqual(mypicture, pictureData)) {
                    mypictures.splice(_.indexOf(mypictures, mypicture), 1);
                }
            });
        }
    });


    var MainPageView = new GalleryView({collection: new Gallery(mypictures)});
});
