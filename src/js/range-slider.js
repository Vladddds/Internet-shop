{
    $(function () {
        $('#slider-range').slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function (event, ui) {
                $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
            }
        });
        $('#amount').val('$' + $('#slider-range').slider('values', 0) +
            ' - $' + $('#slider-range').slider('values', 1));

        $('#m-slider-range').slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function (event, ui) {
                $('#m-amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
            }
        });
        $('#m-amount').val('$' + $('#m-slider-range').slider('values', 0) +
            ' - $' + $('#m-slider-range').slider('values', 1));
    });

    // $(function () {
    //
    // });
}