import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import Welcome from './Welcome';


export default function BarChart() {
    const { categories } = useSelector((state) => state.category);
    const categoryTaskObject = useSelector((state) => state.task);

    function getData(subCategory) {
        var to_return = [];
        for (var category of categories) {
            to_return.push(categoryTaskObject[category][subCategory].length);
        }

        return to_return;

    }

    const [data, setData] = useState("");
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Bar Chart - # of task vs categories',
            },
        },
        responsive: true,
        interaction: {
            intersect: false,
        },
        maintainAspectRatio: false
    };


    useEffect(() => {
        const labels = categories;
        const chartData = {
            labels,
            datasets: [
                {
                    label: 'Upcoming',
                    data: getData('upcoming'),
                    backgroundColor: '#3ABFF8',
                    stack: 'Stack 0',
                },
                {
                    label: 'Completed',
                    data: getData('completed'),
                    backgroundColor: '#36D399',
                    stack: 'Stack 1',
                },
                {
                    label: 'Missed',
                    data: getData('missed'),
                    backgroundColor: '#F87272',
                    stack: 'Stack 2',
                },
                {
                    label: 'Delayed',
                    data: getData('delayed'),
                    backgroundColor: '#FBBD23',
                    stack: 'Stack 3',
                },
            ],
        };
        setData(chartData);
    }, [categories])


    function BarChartRequired() {
        let sum = 0;

        if(data!==""){
            data.datasets.forEach(dataset => {
                sum += dataset.data.reduce((total, value) => total + value, 0);
            });
        }
        return sum;

    }
    return (
        <>
            {(categories.length !== 0 && data && BarChartRequired() )? (data ? <Bar options={options} data={data} /> : <p className="font-serif font-bold">No data to display</p>) : <Welcome />}
        </>

    );
}
