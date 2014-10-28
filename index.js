var $ = function(id) {
	return typeof id === "string" ? document.getElementById(id) : id;
}
/*
*	获取
*/
function getCommand(fullClassName) {
	var className = fullClassName.split(" ");
	if(className.length > 0) {
		var commandClassName = className[1];
		if(typeof commandClassName == "string") {
			return commandClassName;
		}
	}
	return;
}


function richEditor() {
	var frame = $(richedit);
	frame.document.designMode = "on";
	frame.document.contenteditable = true;
    var buttons = document.getElementsByClassName("toolbar-icon"),
        fontSelection = document.getElementById("font"),
        fontSizeSelection = document.getElementById("fontSize"),
        imageUpload = document.getElementById("upload");
    frame.focus();
    for(var i = 0, length = buttons.length ; i < length; i++) {
    	buttons[i].onclick = function() {
    		var command = getCommand.call(this,this.className),
                that = this;
    		return function() {
    			var newClassName = that.className.split(" ");
    			if(newClassName.length > 2) {
    				that.className = newClassName[0] + " " + newClassName[1];
    			}
    			else {
    				if(newClassName[1] != "fontColor") {
    					that.className = that.className.concat(" toolbar-icon-checked");
    				}
    			}
    			if(newClassName[1] == "createlink") {    				
    				var value = prompt("请输入链接：","http://");
    				frame.document.execCommand(command,false,value);
    				frame.focus();
    				that.className = newClassName[0] + " " + newClassName[1];
    			}
    			else if(newClassName[1] == "pic" && newClassName[2] != "toolbar-icon-checked") {
    				document.forms[0].file.click();
    				that.className = newClassName[0] + " " + newClassName[1];
    			}
    			else {
    			    frame.document.execCommand(command,false,null);
					frame.focus();	
    			}
    		}(i);
    	};
    }
    
    imageUpload.onchange = function() {
    	var file = this.files[0],
            reader = new FileReader();
    	if(file) {
    		reader.onload = function(e) {
    			var dataUri = e.target.result;
    				img = document.createElement("img");
    			img.src = dataUri;
    			frame.document.execCommand("insertimage",false,img.src);	
    		}
    		reader.readAsDataURL(file);
    		frame.focus();
    	}
    }

	fontSizeSelection.onchange = function() {
		var that = this;
		return function() {
			var value = that.options[that.selectedIndex].value;
			frame.document.execCommand("fontsize",false,value);
			frame.focus();
		}();
	};

	fontSelection.onchange = function() {
		var that = this;
		var fontname = ["宋体","微软雅黑","楷体","黑体","隶书"];
		return function() {
			var index = that.options.selectedIndex;
			frame.document.execCommand("fontname",false,fontname[index]);
			frame.focus();    				
		}();
	};
}

window.onload = function() {
	richEditor();
}