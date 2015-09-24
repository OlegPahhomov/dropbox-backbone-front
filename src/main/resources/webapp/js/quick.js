var quick = function () {
    $('#file').change(function () {
        var files = $(this)[0].files;
        value = "";
        var i = files.length;
        if (i === 1){
            value = files[0].name;
        } else {
            value = i + " files"
        }

        /*for (i = 0; i < files.length; i++) {
            if (i === 0) {
                value = files[i].name;
            } else {
                value = value + ", " + files[i].name;
            }
        }*/
        $('#filename').val(value);
    });
}
