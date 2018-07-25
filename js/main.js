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
	$("body").css({
		zoom: s
	});
	$(window).on("resize", function () {
		$("body").css({
			zoom: s
		});
	});

	var _config = {
		searching: false,
		paging: false,
		ordering: false,
		info: false,
		columns: [
			{title: "Mã hóa đơn"},
			{title: "Serial"}
		],
		// columnDefs: [{"targets": [0], "class": 'hide_col'}]
	};

	var input_table = $('#input_table');
	input_table.DataTable(_config);
	var input_datatable = input_table.DataTable();

	var tabl_config = $.extend(true, {}, _config);
	tabl_config.dom = 'Bfrtip';

	var tabl_4_config = $.extend(true, {}, tabl_config);
	tabl_4_config.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_4th_Prize'}];
	$('#output_table_4').DataTable(tabl_4_config);

	var tabl_3_config = $.extend(true, {}, tabl_config);
	tabl_3_config.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_3rd_Prize'}];
	$('#output_table_3').DataTable(tabl_3_config);

	var tabl_2_config = $.extend(true, {}, tabl_config);
	tabl_2_config.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_2nd_Prize'}];
	$('#output_table_2').DataTable(tabl_2_config);

	var tabl_1_config = $.extend(true, {}, tabl_config);
	tabl_1_config.buttons = [{extend: 'excelHtml5', title: 'DailyAirPay_1st_Prize'}];
	$('#output_table_1').DataTable(tabl_1_config);

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
		var quantity = parseInt($('#quantity_' + id).val()) || 0;
		var winner_list = [], winner_code_list = [];
		for (var i = 0; i < quantity; i++) {
			if (user_list.length > 0) {
				var winner = user_list[0];
				winner_list.push(winner);
				winner_code_list.push(winner[1]);
				for (var j = 0; j < user_list.length;) {
					if (user_list[j][1] === winner_list[i][1])
						user_list.splice(j, 1);
					else
						j++;
				}
			} else {
				alert('Giải đã được trao hết !');
				break;
			}
		}

		// Display winner code
		var winner_code_str = winner_code_list.join(", ");
		$('#result_' + id).val(winner_code_str);

		// Display winner info
		var output_table = $('#output_table_' + id);
		var output_datatables = output_table.DataTable();
		$.each(winner_list, function (i, json_obj) {
			output_datatables.row.add(json_obj).draw(false);
		});
		output_table.show();

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
		var totalRecords = output_table.DataTable().page.info().recordsTotal;
		if (totalRecords)
			output_table.show();
	});

	$('.btn_export').on('click', function () {
		var id = parseInt($(this).attr('data-id'));
		var output_table_wrapper = $('#output_table_' + id + '_wrapper');
		output_table_wrapper.find('.buttons-excel').click();
	});

	var input_file = $('#input_file');
	$(function () {
		var oFileIn = document.getElementById('input_file');
		if (oFileIn.addEventListener) {
			// Clear all data before import new file
			input_datatable.clear().draw();
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
						input_datatable.row.add(new_data).draw(false);
					}
				});
				// console.log(user_list);

				input_table.show();
				input_file.hide();
			});
		};

		// Tell JS To Start Reading The File.. You could delay this if desired
		reader.readAsBinaryString(oFile);
	}
});
