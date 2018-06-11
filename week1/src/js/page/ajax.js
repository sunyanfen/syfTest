(function() {
    $.ajax({
        url: '/list',
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.warn(err);
        }
    })
})