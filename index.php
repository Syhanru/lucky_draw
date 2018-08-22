<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Đại lý AirPay</title>
	<link rel="shortcut icon" href="images/favicon.ico"/>

	<!-- Bootstrap -->
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/jquery.remodal.css" rel="stylesheet">
	<link href="css/nanoscroller.css" rel="stylesheet">
	<link href="css/nice-select.css" rel="stylesheet">
	<link href="css/accordion.min.css" rel="stylesheet">

	<!-- css-->
	<!--<link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css">-->
	<!--<link rel="stylesheet" href="css/main.css">-->
	<link rel="stylesheet" href="css/main.min.css?v=1.2">
</head>
<body>
<section class="main">
	<div class="inner-page">
		<div class="header">
			<!--<div class="top-logo"><img src="images/logo-toppay.jpg" alt=""/></div>-->
			<!--<div class="title-event"><img src="images/title-event.jpg" alt=""/></div>-->
			<div class="apc-top-logo"><img src="images/apc/top-logo.png" alt=""/></div>
		</div>
		<div class="main-cont clearfix">
			<div class="col-left">
				<div class="block">
					<p class="p-margin-10">Danh sách quay thưởng</p>
					<div class="bx-list-spin mCustomScrollbar" data-mcs-theme="inset-dark">
						<input type="file" id="input_file" class="form-control" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
						<table class="datatables input" id="input_table" width="98%"></table>
					</div>
				</div>
				<div class="block">
					<div class="accordion accor">
						<h1 class="text-uppercase">Giải khuyến khích</h1>
						<div>
							<div>Số Lượng:
								<input type="text" class="sl" id="quantity_4">
								<input type="button" value="Quay" class="bt btn_trigger text-uppercase" data-id="4">
							</div>
							<div>
								<p>Kết quả <span>(lưu trữ)</span>:</p>
								<p class="clearfix">
									<input type="text" id="result_4" readonly>
								</p>
							</div>
						</div>

						<h1 class="text-uppercase">Giải ba</h1>
						<div>
							<div>Số Lượng:
								<input type="text" class="sl" id="quantity_3">
								<input type="button" value="Quay" class="bt btn_trigger text-uppercase" data-id="3">
							</div>
							<div>
								<p>Kết quả <span>(lưu trữ)</span>:</p>
								<p class="clearfix">
									<input type="text" id="result_3" readonly>
								</p>
							</div>
						</div>

						<h1 class="text-uppercase">Giải hai</h1>
						<div>
							<div>Số Lượng:
								<input type="text" class="sl" id="quantity_2">
								<input type="button" value="Quay" class="bt btn_trigger text-uppercase" data-id="2">
							</div>
							<div>
								<p>Kết quả <span>(lưu trữ)</span>:</p>
								<p class="clearfix">
									<input type="text" id="result_2" readonly>
								</p>
							</div>
						</div>

						<h1 class="text-uppercase">Giải nhất</h1>
						<div>
							<div>Số Lượng:
								<input type="text" class="sl" id="quantity_1">
								<input type="button" value="Quay" class="bt btn_trigger text-uppercase" data-id="1">
							</div>
							<div>
								<p>Kết quả <span>(lưu trữ)</span>:</p>
								<p class="clearfix">
									<input type="text" id="result_1" readonly>
									<!--<select>-->
										<!--<option value="1">Kết quả</option>-->
										<!--<option value="2" data-display="Select" disabled>Lưu kết quả</option>-->
									<!--</select>-->
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-right">
				<div class="bxlist">
					<div class="title">
						<h2 class="h2-congrat">Xin chức mừng</h2>
						<p>Các khách hàng <b>đã trúng giải</b> <b id="result_title">khuyến khích</b></p>
					</div>
					<div class="cont-list mCustomScrollbar">
						<table class="datatables output" id="output_table_4" width="98%"></table>
						<table class="datatables output" id="output_table_3" width="98%"></table>
						<table class="datatables output" id="output_table_2" width="98%"></table>
						<table class="datatables output" id="output_table_1" width="98%"></table>
					</div>
				</div>
				<div class="text-center"><a class="bt btn_export" data-id="4">Lưu kết quả</a></div>
			</div>
		</div>
		<!--Footer Content-->
		<div class="footer">
			<p>&copy; <strong>Công ty Cổ phần Phát triển Thể thao Điện tử Việt Nam</strong> giữ mọi quyền hợp pháp của chương trình</p>
			<p>Copyright © 2014 - 2017 <strong>Vietnam Esports</strong>. All rights reserved.</p>
		</div>
	</div>
</section>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="js/jquery.min.js"></script>

<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.nanoscroller.min.js"></script>
<script src="js/jquery.nice-select.min.js"></script>
<script src="js/accordion.min.js"></script>

<!--XLSX-->
<!--<script src="js/js-xlsx/xls.full.min.js"></script>-->
<script src="js/js-xlsx/jszip.js"></script>
<script src="js/js-xlsx/xlsx.js"></script>

<!--Datatables-->
<script src="js/datatables/jquery.dataTables.min.js"></script>
<script src="js/datatables/dataTables.buttons.js"></script>
<script src="js/datatables/buttons.html5.js"></script>
<script src="js/datatables/jszip.js"></script>

<!--<script src="js/main.js"></script>-->
<script src="js/main.min.js?v=1.3"></script>

</body>
</html>
