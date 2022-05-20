
// login area system  === === === === === === === 

$(document).ready(function(){

	$("#loginform").submit(function(e){
		e.preventDefault();
		var user_email = $("#user_email").val();
		var user_pass = $("#user_pass").val();
		var action = "login";
		if(user_email.length == "")
		{
			$("#error").html("Email Field is Required !");
		}
		else if(user_pass.length == "")
		{
			$("#error").html("Password Field is Required !");
		}
		else
		{
			$("#error").html("<span style='color:#00e2ae;'>Connection.......</span>");
			setTimeout(function(){
				$.ajax({
					url:"php_login.php",
					method:"post",
					data:{action:action, user_email:user_email, user_pass:user_pass},
					success:function(data)
					{
						if(data == 'NO')
						{
							$("#error").html("<a href='forget_password.php'>Forget your Password ?<a>");
						}
						else if(data == 'YES')
						{
							window.location.href="../home.php";
						}
						else
						{
							$("#error").html("<a href='forget_password.php'>Forget your Password ?<a>");
						}
					}
				});
			},2000);
		}
	});


// home page friends show

showFriends();
function showFriends()
{
	var action = "showFriends";
	$.ajax({
		url:"php_home.php",
		method:"post",
		data:{action:action},
		success:function(data)
		{
			$("#showFriends").html(data);
		}
	});
}


// home page add friend show

addFriendShow();
function addFriendShow()
{
	var action = "addFriendShow";
	$.ajax({
		url:"php_home.php",
		method:"post",
		data:{action:action},
		success:function(data)
		{
			$("#addFriendShow").html(data);
		}
	});
}

// home page friend add


$(document).on('click', '.add_friend', function(){
	var action = "addFriend";
	var friend_id = $(this).data('user_id');
	$.ajax({
		url:"php_home.php",
		method:"post",
		data:{action:action,friend_id:friend_id},
		success:function(data)
		{
			addFriendShow();
			showFriends();
		}
	});
});


// ========================== message send ================================

$(document).on('click', '#send',function(){
	var action = 'message';
	var message = $('#message_content').val();
	var receiver = $("#receiver").val();
	$.ajax({
		url:"message.php",
		method:"post",
		data:{action:action,message:message, receiver:receiver},
		success:function(data)
		{
			$("#message_content").val("");
			show_message();
		}
	});
});


// ============================

$(document).on('click', '.message', function(){
	var receiver = $(this).data('user_id');
	var action = 'friendSelect';
	$.ajax({
		url:"message.php",
		method:"post",
		data:{action:action,receiver:receiver},
		success:function(data)
		{
			$("#all_info").html(data);
			show_message();
		}
	});

});

// ===============================
show_message();
function show_message()
{
	var receiver = $("#receiver").val();
	var action = 'show_message';
	$.ajax({
		url:"message.php",
		method:"post",
		data:{action:action, receiver:receiver},
		success:function(data)
		{
			$(".infobody").html(data);
		}
	});
}
setInterval(function(){
	show_message();
},500);


// =============================== user_profile.php ===========================

$(".Profile").click(function(){
	var action = "user_profile";
	$.ajax({
		url:"user_profile.php",
		method:"post",
		data:{action:action},
		success:function(data)
		{
			$("#all_info").html(data);
			user_post();
		}
	});
});


// ============================== user_post.php =========================
user_post();
function user_post(){
	var action = "user_post";
	$.ajax({
		url:"user_post.php",
		method:"post",
		data:{action:action},
		success:function(data)
		{
			$(".card-body").html(data);
		}
	});
};
$(document).on('click', '.post', function(){
	user_post();
});

// ==================================================================================








































});