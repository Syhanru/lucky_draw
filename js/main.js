$(document).ready(function () {
	var user_list = [];

	$('select:not(.ignore)').niceSelect();

	$('.accordion').accordion({
		//whether the first section is expanded or not
		firstChildExpand: true,
		multiExpand: false,
		slideSpeed: 500,
		dropDownIcon: '<img src="images/apc/down-chevron.png" width="24"/>'
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
			{title: 'Mã hóa đơn'},
			{title: 'Serial'}
		],
		// columnDefs: [{'targets': [0], 'class': 'hide_col'}]
	};

	var output_tbl_configs = $.extend(true, {}, base_configs);
	output_tbl_configs.dom = 'Bfrtip';

	var output_tbl_4_configs = $.extend(true, {}, output_tbl_configs);
	output_tbl_4_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_4th_Prize'}];

	var output_tbl_3_configs = $.extend(true, {}, output_tbl_configs);
	output_tbl_3_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_3rd_Prize'}];

	var output_tbl_2_configs = $.extend(true, {}, output_tbl_configs);
	output_tbl_2_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_2nd_Prize'}];

	var output_tbl_1_configs = $.extend(true, {}, output_tbl_configs);
	output_tbl_1_configs.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_1st_Prize'}];

	var TABLE_CONFIGS = {
		4: output_tbl_4_configs,
		3: output_tbl_3_configs,
		2: output_tbl_2_configs,
		1: output_tbl_1_configs
	};

	function shuffle(arr) {
		for (var i = arr.length; i; i -= 1) {
			var j = Math.floor(Math.random() * i);
			var x = arr[i - 1];
			arr[i - 1] = arr[j];
			arr[j] = x;
		}
	}

	$('.btn_trigger').on('click', function () {
		//Shuffle user list before pick
		shuffle(user_list);

		var id = parseInt($(this).attr('data-id'));
		var $quantity = $('#quantity_' + id);
		var quantity = parseInt($quantity.val()) || 0;
		if (quantity <= 0) {
			alert('Vui lòng nhập số lượng quay thưởng hợp lệ !');
			return false;
		} else if (quantity > user_list.length) {
			alert('Số lượng quay thưởng không được lớn hơn danh sách quay thưởng (Còn lại: ' + user_list.length + ' khách hàng) !');
			return false;
		}
		$quantity.attr('readonly', '');

		var winner_list = [], winner_code_list = [];
		for (var i = 0; i < quantity; i++) {
			if (user_list.length > 0) {
				var winner = user_list[0];
				winner_list.push(winner);
				winner_code_list.push(winner[1]);
				for (var j = 0; j < user_list.length;) {
					if (user_list[j][1] === winner_list[i][1]) {
						user_list.splice(j, 1);
					} else {
						j++;
					}
				}
			} else {
				alert('Giải đã được trao hết !');
				break;
			}
		}

		append_loader(LOADER_SHOW);
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

			var output_tbl_configs = TABLE_CONFIGS[id];
			output_tbl_configs.data = winner_list;
			$output_table.DataTable(output_tbl_configs);

			$output_table.show();
			append_loader(LOADER_HIDE);
		}, 3000);

		// Disable button after click
		$(this).css('-webkit-filter', 'grayscale(100%)');
		$(this).prop('disabled', true);
	});

	$('.drawer').on('click', function () {
		var id = parseInt($(this).find('.btn_trigger').attr('data-id'));
		var title = "";
		switch (id) {
			case 1:
				title = "nhất";
				break;
			case 2:
				title = "nhì";
				break;
			case 3:
				title = "ba";
				break;
			case 4:
				title = "khuyến khích";
				break;
		}
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
			user_list.length = 0;

			oFileIn.addEventListener('change', filePicked, false);
		}
	});

	function filePicked(oEvent) {
		// Get The File From The Input
		var oFile = oEvent.target.files[0];
		var sFilename = oFile.name;  // unused
		// Create A File Reader HTML5
		var reader = new FileReader();

		// Ready The Event For When A File Gets Selected
		reader.onload = function (e) {
			var data = e.target.result;
			var cfb = XLS.CFB.read(data, {type: 'binary'});
			var wb = XLS.parse_xlscfb(cfb);
			// Loop Over Each Sheet
			wb.SheetNames.forEach(function (sheetName) {
				// Obtain The Current Row As CSV
				var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);  // unused
				var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
				// console.log(oJS);

				$.each(oJS, function (i, json_obj) {
					var ma_hoa_don = json_obj['ma_hoa_don'] || "";
					var serial = json_obj['serial'] || "";
					if (ma_hoa_don !== "" || serial !== "") {
						var new_data = [ma_hoa_don, serial];
						user_list.push(new_data);
					}
				});
				// console.log(user_list);

				var begin = Math.round(new Date().getTime() / 1000.0);

				var input_tbl_configs = $.extend(true, {}, base_configs);
				input_tbl_configs.data = user_list;

				var $input_table = $('#input_table');
				$input_table.DataTable(input_tbl_configs);
				$input_table.show();

				$('#input_file').hide();

				var end = Math.round(new Date().getTime() / 1000.0);
				console.log('import_total_time = ' + (end - begin));
			});
		};

		// Tell JS To Start Reading The File.. You could delay this if desired
		reader.readAsBinaryString(oFile);
	}

	var LOADER_HIDE = 0, LOADER_SHOW = 1;

	function append_loader(action) {
		if ($('#overlay').length)
			$('#overlay').remove();
		if (action === LOADER_SHOW) {
			var overlay = $('<div id="overlay"><div id="loader"><img id="loading" src="images/airpay_logo.png"></div></div>');
			overlay.show();
			overlay.appendTo(document.body);
		}
	}
});
