if(1){ 
   Ip = "https://exchange.gcblock.cn/api";
}else{
   Ip = "http://192.168.0.114:8080";
}
var Globaltoken = "";
var count = 20; 
var InterValObj;
var timer1 ;
var flag_Globaltoken = true
var CPAddress=""
$(function () {
  $.ajaxSetup({
    beforeSend: function (request) {
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
    },
  });

  //   $.get(Ip + "/system/out/cppOutRechargeList",function(result){
  //     if(result.code == 401){
  //       $.tooltip(result.msg);
  //       return;
  //     }
  //     if (result.code != 200) {
  //       $.tooltip(result.msg);
  //       return;
  //     }
  //    console.log("result",result)
	
	// for(index in result.rows ){
	// 	let html = " <tr><td>id</td><td>toAddress</td><td>cashStatus</td>amount<td>createTime</td></tr>"
	// 	let data  = result.rows[index]
	// 	html = html.replace("id",data.id)
	// 	html = html.replace("cashStatus",data.cashStatus?"已完成":"提现中")
	// 	html = html.replace("toAddress",data.toAddress)
	// 	html = html.replace("amount",data.amount)
	// 	html = html.replace("createTime",data.createTime)
	// 	 $("#liebiao").append(html)
	// }
	
	
  //   });
  
   


});



