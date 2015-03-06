
var _ = require('underscore');

var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var child_process = require('child_process');

DEBUG_FLAG = 0;

function isblank(strA){
	if(strA){
		if( "string" === typeof(strA) ){
			if( "" === strA.trim()){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
    if( "number" === typeof(strA) ){
      return false;
    }else{
      return true;
    }
	}
}

function getYMD( aDate ){
	var year = aDate.getFullYear();
	var month = aDate.getMonth()+1;
	var day = aDate.getDate();

	return "" + year + "-" + month + "-" + day;

}

function getYMD_no_dash( aDate ){
	var year = aDate.getFullYear();
	var month = aDate.getMonth()+1;
	var day = aDate.getDate();

	return "" + year + month + day;

}


function makeBlankLine(aDate){
	var obj = {};
	
	obj.treat_date = getYMD( aDate );
	obj.patient_no =  "0";
    obj.case_no =  "0";
    obj.mobile =  "";
    obj.name =  "";
    obj.comment =  "";
	return obj;
}

function getBookingFilename( aDate ){
  return 'booking_' + getYMD(aDate) + '.json' ;
}

// 把内容附加到文件中的 Json 数组中，作为最后一个成员。
function appendToJsonFile( filename, aJsonObj ){
	
	// 打开文件，读入json串。  解析为json对象。
	var fileStr = fs.readFileSync(filename);

	//console.log("getBooking(): " + strBookingList);
    var jsonObj = JSON.parse(fileStr);

    // 将内容append为最后一个成员
    jsonObj.push(aJsonObj);

	var jsonStr = JSON.stringify(jsonObj);
	fs.writeFileSync( filename, jsonStr);
}

/*  读文件并且转为Json返回   */
function readFileToJson( filename ){
	
	aJson = "";
	if(fs.existsSync( filename) ){
		var strFileContent = fs.readFileSync(filename);   
		//console.log(strFileContent.lenght + "xxx");
	    aJson = JSON.parse(strFileContent);
	}
	return aJson;
}


document.onkeydown = function(event) { 
    keynum = event.which;
    //console.log(keynum);

    // 这一段是用来显示隐藏debug区的。
    if (keynum==192){
      
      if( debug_flag === 0 ){
        debug_flag++;
      }else if(debug_flag == 1 ){
        debug_flag++;
        document.getElementById('debug_area').style.display="";//显示
        
      }
      else if(debug_flag == 2 ){
        debug_flag = 0;
        document.getElementById('debug_area').style.display="none";//隐藏
      }
        
    }
    else if (keynum==27){
      
      if( debug_flag === 0 ){
        debug_flag++;
      }else if(debug_flag == 1 ){
        debug_flag++;
        
        var btn = document.getElementById("id_fill");
        btn.click();
        //$rootScope.test_fill();
      }
      else if(debug_flag == 2 ){
        debug_flag = 0;
        
      }
        
    }

    //alert(keynum);
    if (keynum==13){
        
        var skip_num = 0;
        var temp_id = event.srcElement.id;
        if( temp_id ){
          var str_id = temp_id.substring(3); 
          //console.log("id:" , str_id );
          var i_id = parseInt(str_id);

          while ( skip_num < 5 ){  // allow skip num , 
            
            var obj = document.getElementById('id_' + (i_id + 1 + skip_num) );
            if( obj ){

              obj.focus();
              obj.select();
              return;
            }
            skip_num++;
          }
          
          // loop to 0
          var obj2 = document.getElementById( 'id_0' );
          obj2.focus();
          //console.log(obj2.type );
          if(obj2.type === "text"){
          	obj2.select();
          } 
        }
        else{
          console.log("not input." );
        }
        return;
    }
  };









