<?php 

// $con = mysqli_connect("localhost", "root", "", "tutorial");

$error = "";

if(isset($_POST['download']))
{

		if(isset($_POST['files']) and count($_POST['files']) > 0)
		{
			$zip = new ZipArchive();
			$zip_name = time().'.zip';

			$zip->open($zip_name, ZIPARCHIVE::CREATE);

			foreach ($_POST['files'] as $key => $file)
			{
				$zip->addFile($file);
			}

			$zip->close();

			if(file_exists($zip_name))
			{
				header('Content-type: application/zip');
				header('Content-Disposition: attachment; filename="'.$zip_name.'"');
				readfile($zip_name);
				unlink($zip_name);
			}
		}
		else
		{
			$error .="* Please select file to zip";
		}

}





 ?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<script type="text/javascript" src="js/jquery-3.5.1.min.js"></script>	
	
</head>
<body>

	<div class="container">
		<br><br><br>
		<form name="zips" method="post">
			<?php echo $error; ?>
			<table class="table table-bordered table-sm">
				<tr>
					<td>*</td>
					<td>File Name</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="files[]" value="4.jpg"></td>
					<td>4.jpg</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="files[]" value="5.jpg"></td>
					<td>5.jpg</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="files[]" value="6.jpg"></td>
					<td>6.jpg</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="files[]" value="7.jpg"></td>
					<td>7.jpg</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="files[]" value="9.jpg"></td>
					<td>9.jpg</td>
				</tr>
				<tr>
					<td colspan="2" >
						<button type="submit" name="download" class="ml-3 btn btn-info btn-sm">Download zip file</button>
						<button type="reset" class="btn btn-warning btn-sm">Reset</button>
					</td>
				</tr>
			</table>
		</form>
	</div>


</body>
</html>






<script type="text/javascript">

	$(document).ready(function(){
		
	});

</script>


