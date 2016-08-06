var totalNum = 0;
var lastReportTime = 0;
window.onload = function() {
    setInterval(handleRefresh, 3000);
}

function handleRefresh() {
    var url = "http://gumball.wickedlysmart.com?" +
    "callback=updateSales" +
    "&lastreporttime=" + lastReportTime +
    "&random=" + (new Date()).getTime();

    var newScriptElement = document.createElement("script");
    newScriptElement.setAttribute("src", url);
    newScriptElement.setAttribute("id", "jsonp");

    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElementsByTagName("head")[0];
    if (oldScriptElement == null) {
        head.appendChild(newScriptElement);
    } else {
        head.replaceChild(newScriptElement, oldScriptElement);
    }
}

function updateSales(sales) {
    var salesDiv = document.getElementById("sales");
    var totalDiv = document.getElementById("total");
    for (var i = 0; i < sales.length; ++i) {
        var sale = sales[i];
        if (lastReportTime >= sale.time) {
            continue;
        }
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs" + " time: " + sale.time;
        salesDiv.appendChild(div);
        totalNum += parseInt(sale.sales);
        totalDiv.innerHTML = "Total: " + totalNum;
        lastReportTime = sale.time;
    }

}