// specify the svg container

d3.json("dataset.json").then(data => {
  let bookNested = d3
    .nest()
    .key(data => data.Year)
    .rollup(function(data) {
      return data.length;
    })
    .entries(data);

  const svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", 1400)
    .attr("height", 1600);

  console.log(bookNested);
  let yearCount = bookNested.map(d => {
    return Number(d.key);
  });
  let bookCount = bookNested.map(d => {
    return Number(d.value);
  });

  console.log("dit is Yearcount", yearCount);
  console.log("dit is bookCount", bookCount);

  let dataYears = data.map(d => {
    return Number(d.Year);
  });

  // set the domains and ranges for the axis
  let y = d3
    .scaleLinear()
    .domain([d3.max(bookCount), d3.min(bookCount)])
    .range([0, 500]);
  let x = d3
    .scaleLinear()
    .domain([d3.min(yearCount), d3.max(yearCount)])
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

  // sort data for the line
  let sortedDataYears = yearCount.sort();

  // d3 line path generator
  const line = d3
    .line()
    // where the x coordinate of the line shoudl be

    .x(function(d) {
      return x(Number(d.key));
    })

    // where the y coordinatie of the line shoudl be
    .y(function(d) {
      return y(d.value);
    });

  // line path element
  const path = svg.append("path");

  // create and call the axisLeft
  let y_Axis = d3.axisLeft().scale(y);
  let x_Axis = d3
    .axisBottom()
    .scale(x)
    .tickFormat(d3.format("d"));
  xAxisGroup.call(x_Axis);
  yAxisGroup.call(y_Axis);

  // create circles for books by year
  const circles = svg
    .selectAll("circle")
    .attr("cx", yearCount)
    .attr("cy", bookCount)
    .data(bookNested);

  circles
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d => {
      return x(Number(d.key));
    })
    .attr("cy", d => {
      return y(Number(d.value));
    })
    .attr("fill", "white")
    .attr("transform", "translate(42,0)");

  // sort data years
  // let pathSorted = bookNested.sort((a, b) => a.key - b.value);
  bookNested.sort(function(a, b) {
    return a.key - b.key;
  });
  path
    .data([bookNested])
    .attr("fill", "none")
    .attr("stroke", "#00bfa5")
    .attr("transform", "translate(42,0)")
    .attr("stroke-width", 2)
    .attr("d", line);
});
