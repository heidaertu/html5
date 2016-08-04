var map;
var watchId = null;

window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(displayLocation, displayError);
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;

        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;

    } else {
        alert("Oops, no geolocation support.");
    }
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude : " + latitude + ", longtitude: " + longitude;
    div.innerHTML += " (with " + position.coords.accuracy + " meters accuracy)";

    showMap(position);

}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };

    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage += " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

//创建地图函数：
function showMap(position) {
    var point = new BMap.Point(position.coords.longitude, position.coords.latitude);//定义一个中心点坐标
    var div = document.getElementById("location");
    if (map == null) {
        div.innerHTML += "<br>create map.";
        map = new BMap.Map("map");//在百度地图容器中创建一个地图
        // var point = new BMap.Point(118.095915,24.485821);
        map.centerAndZoom(point,30);//设定地图的中心点和坐标并将地图显示在地图容器中
        // window.map = map;//将map变量存储在全局
        setMapEvent();
        addMapControl();
    }
    var marker = new BMap.Marker(point);//创建一个覆盖物
    map.addOverlay(marker);//增加一个标示到地图上
}

//地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }

    //地图控件添加函数：
    function addMapControl(){
        //向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
    }

