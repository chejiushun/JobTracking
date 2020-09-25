// 定义全局变量
var $;
layui.use(['form', 'layer', 'laydate'], function() {
	$ = layui.jquery;
	var form = layui.form,
		layer = layui.layer,
		laydate = layui.laydate;
	//日期1
	laydate.render({
		elem: '#grade',
		type: 'year'
	});
	//日期2
	laydate.render({
		elem: '#daterange',
		type: 'month',
		range: '~'
	});
	
	// 监听搜索_1操作
	form.on('submit(data-search-btn1)', function(data) {
		var result = JSON.stringify(data.field);
		layer.alert(result, {
			title: '最终的搜索信息'
		});
		//执行搜索重载
		table.reload('userloginlogTable', {
			page: {
				curr: 1
			},
			where: {
				searchParams: result
			}
		}, 'data');
		return false;
	});
	// 监听搜索_2操作
	form.on('submit(data-search-btn2)', function(data) {
		var result = JSON.stringify(data.field);
		layer.alert(result, {
			title: '最终的搜索信息'
		});
		//执行搜索重载
		table.reload('userloginlogTable', {
			page: {
				curr: 1
			},
			where: {
				searchParams: result
			}
		}, 'data');
		return false;
	});
	
	
	
	
    /**
	 * 图表统计
	 */
	var echarts_pienum = echarts.init(document.getElementById('pienum'), 'walden');
	var echarts_piewin = echarts.init(document.getElementById('piewin'), 'walden');
	var echarts_histogram = echarts.init(document.getElementById('histogrammajor'), 'walden');
	
	// 成员人数统计饼图
	var pienum = {
	    title : {
	        text: '应届毕业生就业去向饼图',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['北上广等一线城市','二三线城市','四五线小城市','家乡所在城市']
	    },
	    series : [
	        {
	            name: '就业城市',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:1835, name:'北上广等一线城市'},
	                {value:1160, name:'二三线城市'},
	                {value:621, name:'四五线小城市'},
	                {value:433, name:'家乡所在城市'},
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	// 各院系成员统计饼图
	var piewin = {
	    title : {
	        text: '应届毕业生从业类型饼图',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['本专业相关工作','非本专业相关工作','创业','服兵役']
	    },
	    series : [
	        {
	            name: '就业类型',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:3291, name:'本专业相关工作'},
	                {value:665, name:'非本专业相关工作'},
	                {value:145, name:'创业'},
	                {value:53, name:'服兵役'},
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

	var histogram = {
	    legend: {},
	    tooltip: {},
		toolbox : {
			show : true,
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
	    dataset: {
	        source: [
	            ['product', '就业人数', '暂未就业人数'],
	            ['2016年', 3600,  2561],
	            ['2017年', 4342,  1821],
	            ['2018年', 3720, 2400],
	            ['2019年', 3560, 2560],
	            ['2020年', 4154, 1974]
	        ]
	    },
	    xAxis: {type: 'category'},
	    yAxis: {},
	    // Declare several bar series, each will be mapped
	    // to a column of dataset.source by default.
	    series: [
	        {type: 'bar'},
	        {type: 'bar'}
	    ]
	};

	echarts_pienum.setOption(pienum);
	echarts_piewin.setOption(piewin);
	echarts_histogram.setOption(histogram);
	// echarts 窗口缩放自适应
	window.onresize = function() {
		echarts_pienum.resize();
		echarts_piewin.resize();
		echarts_histogram.resize();
	}

});