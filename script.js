// specify the svg container
const svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 1000);

d3.json("dataset.json").then(data => {
  console.log("Alle data:", data);

  let allBooks = data.length;

  let bookYears = [...new Set(data.map(d => Number(d.Year)))];
  console.log("Object alle jaren van de boeken", bookYears);
  console.log("allbooks", allBooks);
  console.log(Object.values(bookYears));

  // set the domains and ranges for the axis
  let y = d3
    .scaleLinear()
    .domain([data.length, 0])
    .range([0, 500]);
  let x = d3
    .scaleLinear()
    .domain([d3.min(bookYears), d3.max(bookYears)])
    .range([0, 750]);

  // group the axis
  let xAxisGroup = svg
    .append("g")
    .attr("transform", "translate(42, " + 500 + ")")
    .attr("color", "white");
  let yAxisGroup = svg
    .append("g")
    .attr("transform", "translate(40,0)")
    .attr("color", "white");

  // create and call the axisLeft
  let y_Axis = d3.axisLeft(y).ticks(6);
  let x_Axis = d3.axisBottom(x).tickFormat(d3.format("d"));
  xAxisGroup.call(x_Axis);
  yAxisGroup.call(y_Axis);

  // create circles for books by year
  const circles = svg.selectAll("circle").data(data);

  circles
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d)
    .attr("cy", d => y)
    .attr("fill", "white");
});
