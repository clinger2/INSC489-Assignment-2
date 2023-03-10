const data = [
    {campus: "UT KNOXVILLE", enrollment: 29460, color: '#fd8105' },
    {campus: "UT CHATTANOOGA", enrollment:11590, color:'#ecaa1f'},
    {campus: "MARTIN", enrollment: 7280, color: '#0e223f'},
    {campus: "HEALTH SCIENCE CENTER", enrollment: 2815, color: '#036646'}
];

showBarChart(data);
function showBarChart(data) {
    const margin = {top: 50, right: 5, bottom: 45, left: 50};
    const width = 700 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;

    const svg = d3.select('body').append('svg')
        .attr('width', 700)
        .attr('height', 500)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Initialize linear and ordinal scales (input domain and output range)
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.enrollment)])
        .range([height, 0]);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.campus))
        .range([0, width])
        .paddingInner(0.3);

    // Initialize axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Draw the axis
    svg.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    svg.append('g')
        .call(yAxis.tickFormat(function(d){
            return d;
        }).ticks(5))
        .append("text")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value");

    // Add rectangles
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('fill', d => d.color)
        .attr('width', xScale.bandwidth() - 5)
        .attr("height", function(d) { return height - yScale(d.enrollment);})
        .attr('y', d => yScale(d.enrollment))
        .attr('x', d => xScale(d.campus) + 5);
}
