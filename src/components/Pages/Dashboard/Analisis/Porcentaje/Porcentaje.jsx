import ReactApexChart from "react-apexcharts";

const Porcentaje = ({ censados, totalCensados }) => {
  const data = {
    series: [censados, totalCensados],
    options: {
      chart: {
        height: 350,
        type: "pie",
      },
      labels: ["Censados por Usuario", "Total Censados"],
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

export default Porcentaje;