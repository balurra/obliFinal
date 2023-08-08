import ReactApexChart from "react-apexcharts";

const GraficoOcupacion = ({ totalesOcupaciones }) => {
  const data = {
    series: [
      {
        data: Object.values(totalesOcupaciones),
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: Object.keys(totalesOcupaciones),
      },
    },
  };
  return (
    <div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={210}
      />
    </div>
  );
};

export default GraficoOcupacion;