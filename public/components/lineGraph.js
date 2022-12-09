import React, {useRef, useCallback} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

//https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/line/default?from-embed=&file=/App.tsx:1134-1173
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '07/11/2022 - 13/11/2022 Energy Usage',
        },
    },
};

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];



export const data = {
    labels,
    datasets: [
        {
            label: 'This week',
            data: [13, 11, 13, 7, 12, 17, 20],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Previous week',
            data: [10, 12, 19, 7, 13, 21, 19],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Daily average',
            data: [12, 12, 12, 12, 12, 12, 12],
            borderColor: 'rgb(60, 60, 60)',
            backgroundColor: 'rgba(60, 60, 60, 1)',
        },
    ],
};

class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:""
        };
    }




    render() {
        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );







        return<Line options={options} data={data} />;
    }
}

export default LineGraph;