let svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 70},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let parseDate = d3.timeParse("%b-%y"),
    formatDate = d3.timeFormat("%Y");

let x = d3.scaleTime()
    .domain([new Date(2019, 0, 1), new Date(2023, 0, 1)])
    .range([0, width]);

let y = d3.scaleLinear()
    .range([height, 0]);

let xAxis = d3.axisBottom(x);

let yAxis = d3.axisLeft(y);

let area = d3.area()
  .x(function(d) { return x(d.date); })
  .y0(y(0))
  .y1(function(d) { return y(d.close); })
  .curve(d3.curveBasis);

let areaPath = g.append("path")
    .attr("clip-path", "url(#clip)")
    .attr("class","area1");

let areaPath2 = g.append("path")
    .attr("clip-path", "url(#clip)")
    .attr("class","area2");

let areaPath3 = g.append("path")
    .attr("clip-path", "url(#clip)")
    .attr("class","area3");

let yGroup = g.append("g");

let xGroup = g.append("g")
    .attr("transform", "translate(0," + height + ")");

let zoom = d3.zoom()
    .scaleExtent([1, 50])
    .translateExtent([[-width, -Infinity], [2 * width, Infinity]])
    .on("zoom", zoomed);

let zoomRect = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .call(zoom);

g.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);


d3.csv("data_trimester_covid.csv", function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
    return d;
  }, function(error, data) {
    if (error) throw error;
    let xExtent = d3.extent(data, function(d) { return d.date; });
    zoom.translateExtent([[x(xExtent[0]), -Infinity], [x(xExtent[1]), Infinity]])
    y.domain([0, d3.max(data, function(d) { return d.close; })]);
    yGroup.call(yAxis).select(".domain").remove();
    areaPath2.datum(data);
    zoomRect.call(zoom.transform, d3.zoomIdentity);
  });

d3.csv("data_trimester_cine.csv", function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
    return d;
  }, function(error, data) {
    if (error) throw error;
    let xExtent = d3.extent(data, function(d) { return d.date; });
    zoom.translateExtent([[x(xExtent[0]), -Infinity], [x(xExtent[1]), Infinity]])
    y.domain([0, d3.max(data, function(d) { return d.close; })]);
    yGroup.call(yAxis).select(".domain").remove();
    areaPath3.datum(data);
    zoomRect.call(zoom.transform, d3.zoomIdentity);
  });

d3.csv("data_trimester_netflix.csv", function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
    return d;
  }, function(error, data) {
    if (error) throw error;
    let xExtent = d3.extent(data, function(d) { return d.date; });
    zoom.translateExtent([[x(xExtent[0]), -Infinity], [x(xExtent[1]), Infinity]])
    y.domain([0, d3.max(data, function(d) { return d.close; })]);
    yGroup.call(yAxis).select(".domain").remove();
    areaPath.datum(data);
    zoomRect.call(zoom.transform, d3.zoomIdentity);
  });

function zoomed() {
  let xz = d3.event.transform.rescaleX(x);
  xGroup.call(xAxis.scale(xz));
  areaPath2.attr("d", area.x(function(d) { return xz(d.date); }));
  areaPath.attr("d", area.x(function(d) { return xz(d.date); }));
  areaPath3.attr("d", area.x(function(d) { return xz(d.date); }));

}