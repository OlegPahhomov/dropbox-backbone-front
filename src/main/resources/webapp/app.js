(function ($) {
    var Picture = Backbone.Model.extend({
        defaults: {
        },
        idAttribute: "id",

        validate: function(attrs, options) {
            if (attrs.file.substring(0,10) !== "data:image" ) {
                console.log("it's not an image");
                return "it's not an image";
            }
        }
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
                href_id: "show_popup_link_" + id,
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
            el: $("#content"),
            container: $("#file-container"),
            uploadForm: $("#upload-form"),

            events: {
                "click #addFile": "addFiles"
            },

            initialize: function () {
                _.bindAll(this, 'render', 'renderPicture', 'addFiles', 'readFile'); // every function that uses 'this' as the current object should be in here
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
                $(this.container).append(pictureView.render().el);
            },

            readFile: function (file) {
                var defer = jQuery.Deferred();
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function shipOff(event) {
                    var result = event.target.result;
                    var fileName = file.name;
                    defer.resolve({file: result, name: fileName});
                };
                return defer.promise();
            },

            addFiles: function (e) {
                e.preventDefault();

                that = this;
                var uploadedFiles = that.uploadForm[0].file.files;
                for (var i = 0; i < uploadedFiles.length; i++) {
                    var file = uploadedFiles[i];
                    var request = that.readFile(file);
                    request.done(function (req) {
                        that.collection.create(req, {
                            wait: true,
                            type: 'post',
                            url: 'http://localhost:8080/addjson'
                        })
                    });
                }
            }
        }
    );

    var mainPageView = new GalleryView();

})(jQuery);
