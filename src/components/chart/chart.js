
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import classes from './chart.module.css';

window.Highcharts = Highcharts;
Exporting(Highcharts)

export default function Chart(props){

  const options = {
    title: {
      text: props.stock
    },
    series: [
      {
        name: props.stock,
        data: props.data,
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  }

  return(
    
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  )
}