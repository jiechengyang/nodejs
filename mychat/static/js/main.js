(function(){
	window.onload = () => {
		layer.prompt({title: '欢迎来到Jie聊天室,请输入您的昵称：', formType: 0, area: ['200px', '50px']}, (text, index) => {
				layer.msg(text);
				layer.close(index);
		});		
	}
})();