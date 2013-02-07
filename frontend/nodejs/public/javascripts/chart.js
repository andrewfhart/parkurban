function generate_data () {
  var pageViewDays = 7;
  var now = Date.now();
  var fictionalPageViews = [];
  var longLabels = [];
  var shortLabels = [];
  for (var i = 0; i < pageViewDays; i++) {
    fictionalPageViews.push(Math.random() * 1000);
    var d = new Date(now - (pageViewDays - i) * 86400000);
    longLabels.push(d.toLocaleDateString());
    shortLabels.push(d.getDate());
  }
    
  return {data: fictionalPageViews, labels: longLabels};
}

function init_charts () {

  var data = generate_data();

  DOMCharts.bar(
    DOMCharts.barTable(data.data, data.labels)
    .attr('id', 'timeseries1')
    .prepend('<caption>Revenue This Week</caption>')
    .appendTo($('#charts')));
}

$(document).bind('pageinit', function() {
  init_charts();
});
