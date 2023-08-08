import ReactApexChart from "react-apexcharts";
const GraficoDepto = ({ totalesDeptos }) => {
  const data = {
    series: Object.values(totalesDeptos),
    options: {
      chart: {
        height: 350,
        type: "pie",
      },
      labels: Object.keys(totalesDeptos),
      legend: {
        position: "bottom",
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart options={data.options} series={data.series} type="pie" />
    </div>
  );
};

export default GraficoDepto;