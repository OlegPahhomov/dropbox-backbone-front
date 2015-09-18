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
        render: function () {
            var template = _.template($('#one_picture_template').html());
            var content = {
                id: this.model.get('id'),
                thumbnailUrl: this.model.get('thumbnailUrl'),
                href: this.model.get('href'),
                imgUrl: this.model.get('imgUrl'),
                deleteId: this.model.get('deleteId'),
                ratioClass: this.model.get('ratioClass')

            };
            var html = template(content);
            $(this.el).html(html);
            return this;
        }
    });

    var PicturesView = Backbone.View.extend({

    render: function () {
        var files = $("#file-container");
        this.collection.each(function (picture) {
            var onePictureView = new OnePictureView({model: picture});
            files.append(onePictureView.render().el);
        });

        /*var template = _.template($('#pictures_template').html());
         var content = {
         content: this.model.get('content')
         };
         var html = template(content);
         this.$el.append(html);*/
        return this;
    }
});

// Now, the minimum amount needed to get a template to render
// with a bit of data from the SuperBasic model we've created.
var PictureModel = new OnePicture();
var PictureModel2 = new OnePicture(
    {   id: 2,
        name: "picture 2",
        ratio: 1.5,
        thumbnailUrl: "http://localhost:8080/picture/small/2",
        href: "#show_popup_link_2",
        imgUrl: "http://localhost:8080/picture/2",
        deleteId: "delete_file_2",
        ratioClass: "file bigfile"});

var pictures = new Pictures();
pictures.add(PictureModel);
pictures.add(PictureModel2);

var MainPageView = new PicturesView({ collection: pictures});
MainPageView.render();


})
;
