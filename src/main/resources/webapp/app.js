$(document).ready(function () {
    var OnePicture = Backbone.Model.extend({
        defaults: {
            id: 1,
            name: "cute kittens",
            ratio: 1.5,
            thumbnailUrl: "http://localhost:8080/picture/small/1",
            href: "#show_popup_link_1",
            imgUrl: "http://localhost:8080/picture/1",
            deleteId: "delete_file_1",
            ratioClass: "file"
        }
    });

    var Pictures = Backbone.Collection.extend({
        model: OnePicture
    });

    var OnePictureView = Backbone.View.extend({
        template: $('#one_picture_template').html(),

        render: function () {
            var template = _.template(this.template);
            var html = template(this.model.toJSON());
            $(this.el).html(html);
            return this;
        }
    });

    var PicturesView = Backbone.View.extend({
        el: $("#file-container"),

        initialize: function () {
            _.bindAll(this, 'render', 'renderPicture'); // every function that uses 'this' as the current object should be in here
            this.render();
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
            var onePictureView = new OnePictureView(
                {model: picture}
            );
            this.$el.append(onePictureView.render().el);
        }
    });

    var MainPageView = new PicturesView({collection: new Pictures(mypictures)});

})
;
