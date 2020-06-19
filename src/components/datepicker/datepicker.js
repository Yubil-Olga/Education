import 'air-datepicker';

$('.js-datepicker-here').datepicker(
    {   
        showButtonPanel: true,
        clearButton: true,
        range: true,
        toggleSelected: false,
        minDate: new Date(),
        multipleDatesSeparator: " - ",
        navTitles: {
            days: 'MM <i>yyyy</i>',
            months: 'yyyy',
            years: 'yyyy1 - yyyy2'
        },
        prevHtml: '<i class="material-icons">arrow_back</i>',
        nextHtml: '<i class="material-icons">arrow_forward</i>',
        onShow: function (dp, animationCompleted) {
            if (!animationCompleted) {
                if (dp.$el.parents('.date-dropdown').length>0) {
                    let start = dp.$el.closest('.date-dropdown').find('.datepicker-start').datepicker().data('datepicker').selectedDates;
                    let end = dp.$el.closest('.date-dropdown').find('.datepicker-end').datepicker().data('datepicker').selectedDates;
                    if (dp.el.classList.contains('datepicker-start')) {
                        dp.$el.closest('.date-dropdown').find('.datepicker-end').datepicker().data('datepicker').clear();
                        dp.selectDate(end);
                    }
                    if (dp.el.classList.contains('datepicker-end')) {
                        dp.$el.closest('.date-dropdown').find('.datepicker-start').datepicker().data('datepicker').clear();
                        dp.selectDate(start);
                    }
                }  
            applyButton(dp);
            }
        }
    }
);

function applyButton(dp) {
    if (dp.$datepicker.find('.apply--button').html()===undefined) {
        dp.$datepicker.children('.datepicker--buttons').append('<span class="apply--button">Применить</span></div>')
    }
    dp.$datepicker.find('.apply--button').click(function() {
        dp.hide();
     });
}