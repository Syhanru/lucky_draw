function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(arr) {
    for (var i = arr.length; i; i -= 1) {
        var j = Math.floor(Math.random() * i);
        var x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
}

var LOADER_HIDE = 0, LOADER_SHOW = 1;

function appendLoader(action) {
    if ($('#overlay').length)
        $('#overlay').remove();
    if (action === LOADER_SHOW) {
        var overlay = $('<div id="overlay"><div id="loader"><img id="loading" src="images/logo-airpay.png"></div></div>');
        overlay.show();
        overlay.appendTo(document.body);
    }
}

$(document).ready(function () {
    var USER_LIST = [];

    $('select:not(.ignore)').niceSelect();

    $('.accordion').accordion({
        //whether the first section is expanded or not
        firstChildExpand: true,
        multiExpand: false,
        slideSpeed: 500,
        dropDownIcon: '<img src="images/down-chevron.png" width="24"/>'
        // dropDownIcon: "&#9660"
    });

    var s = window.innerWidth >= 1600 ? 1 : window.innerWidth / 1600;
    $('body').css({
        zoom: s
    });
    $(window).on('resize', function () {
        $('body').css({
            zoom: s
        });
    });

    var base_configs = {
        searching: false,
        paging: false,
        ordering: false,
        info: false,
        columns: [
            {title: 'Tên nhân viên'},
            {title: 'Số điện thoại'}
        ],
        // columnDefs: [{'targets': [0], 'class': 'hide_col'}]
    };

    var output_tbl_configs = $.extend(true, {}, base_configs);
    output_tbl_configs.dom = 'Bfrtip';

    var output_tbl_9_configs = $.extend(true, {}, output_tbl_configs);
    output_tbl_9_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_9th_Prize'}];

    var output_tbl_8_configs = $.extend(true, {}, output_tbl_configs);
    output_tbl_8_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_8th_Prize'}];

    var output_tbl_7_configs = $.extend(true, {}, output_tbl_configs);
    output_tbl_7_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_7th_Prize'}];

    var output_tbl_6_configs = $.extend(true, {}, output_tbl_configs);
    output_tbl_6_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_6th_Prize'}];

    var output_tbl_5_configs = $.extend(true, {}, output_tbl_configs);
    output_tbl_5_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_5th_Prize'}];

    var output_tbl_4_configs = $.extend(true, {}, output_tbl_configs);
    output_tbl_4_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_4th_Prize'}];

    var output_tbl_3_configs = $.extend(true, {}, output_tbl_configs);
    output_tbl_3_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_3rd_Prize'}];

    var output_tbl_2_configs = $.extend(true, {}, output_tbl_configs);
    output_tbl_2_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_2nd_Prize'}];

    var output_tbl_1_configs = $.extend(true, {}, output_tbl_configs);
    output_tbl_1_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_1st_Prize'}];

    var TABLE_CONFIGS = {
        9: [output_tbl_9_configs, 'Giải may mắn - 10.000Đ'],
        8: [output_tbl_8_configs, 'Giải may mắn - 20.000Đ'],
        7: [output_tbl_7_configs, 'Giải may mắn - 40.000Đ'],
        6: [output_tbl_6_configs, 'Giải may mắn - 60.000Đ'],
        5: [output_tbl_5_configs, 'Giải may mắn - 100.000Đ'],
        4: [output_tbl_4_configs, 'Giải Thịnh Vượng - Vé xem phim CGV'],
        3: [output_tbl_3_configs, 'Giải An Khang - Quà tặng Garena'],
        2: [output_tbl_2_configs, 'Giải Phú Quý - Bao tay & Khẩu trang'],
        1: [output_tbl_1_configs, 'Giải Lộc Xuân - Áo thun AirPay']
    };

    $('.btn_trigger').on('click', function () {
        shuffle(USER_LIST);  // Shuffle user list before pick

        var id = parseInt($(this).attr('data-id'));
        var $quantity = $('#quantity_' + id);
        var quantity = parseInt($quantity.val()) || 0;
        if (quantity <= 0) {
            alert('Vui lòng nhập số lượng quay thưởng hợp lệ !');
            return false;
        } else if (quantity > USER_LIST.length) {
            alert('Số lượng quay thưởng không được lớn hơn danh sách quay thưởng (Còn lại: ' + USER_LIST.length + ' nhân viên) !');
            return false;
        }
        $quantity.attr('readonly', '');

        // Disable button after click
        $(this).css('-webkit-filter', 'grayscale(100%)');
        $(this).prop('disabled', true);

        var winner_list = [], winner_code_list = [];
        for (var i = 0; i < quantity; i++) {
            if (USER_LIST.length > 0) {
                var winner_index = getRandomInteger(0, USER_LIST.length - 1);
                // console.log(winner_index);

                var winner = USER_LIST[winner_index];
                winner_list.push(winner);
                winner_code_list.push(winner[1]);

                USER_LIST.splice(winner_index, 1);
                // console.log(USER_LIST);

                // // NOTE: Đoạn code comment bên dưới dùng cho APA ngày xưa, trường hợp khách hàng có nhiều ref,
                // // nhưng mỗi khách hàng chỉ được nhận giải 1 lần, nên tìm và xóa hết các ref còn lại trước khi
                // // quay thưởng cho giải tiếp theo. FIXME: Cần tối ưu nếu sử dụng lại.
                // for (var j = 0; j < USER_LIST.length;) {
                //     if (USER_LIST[j][1] === winner_list[i][1]) {
                //         USER_LIST.splice(j, 1);
                //     } else {
                //         j++;
                //     }
                // }
            } else {
                alert('Giải đã được trao hết !');
                break;
            }
        }

        appendLoader(LOADER_SHOW);
        window.setTimeout(function () {
            // Display winner code
            var winner_code_str = winner_code_list.join(", ");
            $('#result_' + id).val(winner_code_str);

            // Display winner info
            var $output_table = $('#output_table_' + id);
            $.each(winner_list, function (i, winner_info_list) {
                for (i = 0; i < winner_info_list.length; i++) {
                    winner_info_list[i] += '<hr class="hr-table">';
                }
            });

            var output_tbl_configs = TABLE_CONFIGS[id][0];
            output_tbl_configs.data = winner_list;
            $output_table.DataTable(output_tbl_configs);

            $output_table.show();
            appendLoader(LOADER_HIDE);
        }, getRandomInteger(1000, 3000));
    });

    $('#result_title').text(TABLE_CONFIGS[9][1]);
    $('.drawer').on('click', function () {
        var id = parseInt($(this).find('.btn_trigger').attr('data-id'));
        var title = TABLE_CONFIGS[id][1];

        $('#result_title').text(title);
        $('.output').hide();

        $('.btn_export').attr('data-id', id);

        var output_table = $('#output_table_' + id);
        output_table.show();
    });

    $('.btn_export').on('click', function () {
        var id = parseInt($(this).attr('data-id'));
        var $output_table_wrapper = $('#output_table_' + id + '_wrapper');
        $output_table_wrapper.find('.buttons-excel').click();
    });

    $(function () {
        var oFileIn = document.getElementById('input_file');
        if (oFileIn.addEventListener) {
            // Clear all data before import new file
            // input_datatable.clear().draw();
            USER_LIST.length = 0;

            oFileIn.addEventListener('change', filePickedV2, false);
        }
    });

    function filePickedV2(oEvent) {
        // Get The File From The Input
        var oFile = oEvent.target.files[0];
        // var sFilename = oFile.name;  // unused

        // Create A File Reader HTML5
        var reader = new FileReader();

        // Ready The Event For When A File Gets Selected
        reader.onload = function (e) {
            var data = e.target.result;
            var cfb = XLSX.read(data, {type: 'binary'});
            // console.log(cfb);

            // Loop Over Each Sheet
            cfb.SheetNames.forEach(function (sheetName) {
                // Obtain The Current Row As CSV
                var oJS = XLSX.utils.sheet_to_json(cfb.Sheets[sheetName]);
                // console.log(oJS);

                $.each(oJS, function (i, json_obj) {
                    var name = json_obj['name'] || "";
                    var phone = json_obj['phone'] || "";
                    if (name !== "" || phone !== "") {
                        var new_data = [name, phone];
                        USER_LIST.push(new_data);
                    }
                });
                // console.log(USER_LIST);

                // var begin = Math.round(new Date().getTime() / 1000.0);

                var input_tbl_configs = $.extend(true, {}, base_configs);
                input_tbl_configs.data = USER_LIST.slice(0, 1000);

                var $input_table = $('#input_table');
                $input_table.DataTable(input_tbl_configs);
                $input_table.show();

                $('#input_file').hide();

                // var end = Math.round(new Date().getTime() / 1000.0);
                // console.log('import_total_time = ' + (end - begin));
            });
        };

        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(oFile);
    }

    // function filePicked(oEvent) {
    //     // Get The File From The Input
    //     var oFile = oEvent.target.files[0];
    //     var sFilename = oFile.name;  // unused
    //     // Create A File Reader HTML5
    //     var reader = new FileReader();
    //
    //     // Ready The Event For When A File Gets Selected
    //     reader.onload = function (e) {
    //         var data = e.target.result;
    //         var cfb = XLS.CFB.read(data, {type: 'binary'});
    //         var wb = XLS.parse_xlscfb(cfb);
    //         // Loop Over Each Sheet
    //         wb.SheetNames.forEach(function (sheetName) {
    //             // Obtain The Current Row As CSV
    //             var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);  // unused
    //             var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
    //             // console.log(oJS);
    //
    //             $.each(oJS, function (i, json_obj) {
    //                 var ma_hoa_don = json_obj['ma_hoa_don'] || "";
    //                 var serial = json_obj['serial'] || "";
    //                 if (ma_hoa_don !== "" || serial !== "") {
    //                     var new_data = [ma_hoa_don, serial];
    //                     USER_LIST.push(new_data);
    //                 }
    //             });
    //             // console.log(USER_LIST);
    //
    //             // var begin = Math.round(new Date().getTime() / 1000.0);
    //
    //             var input_tbl_configs = $.extend(true, {}, base_configs);
    //             input_tbl_configs.data = USER_LIST.slice(0, 1000);
    //
    //             var $input_table = $('#input_table');
    //             $input_table.DataTable(input_tbl_configs);
    //             $input_table.show();
    //
    //             $('#input_file').hide();
    //
    //             // var end = Math.round(new Date().getTime() / 1000.0);
    //             // console.log('import_total_time = ' + (end - begin));
    //         });
    //     };
    //
    //     // Tell JS To Start Reading The File.. You could delay this if desired
    //     reader.readAsBinaryString(oFile);
    // }
});
