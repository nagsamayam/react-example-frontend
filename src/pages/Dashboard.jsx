import Wrapper from "../componets/Wrapper"
import * as c3 from 'c3';
import { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {

    useEffect(() => {
        (
            async () => {
                const chart = c3.generate({
                    bindto: '#chart',
                    data: {
                        x: 'x',
                        columns: [
                            ['x'],
                            ['Sales'],
                        ],
                        types: {
                            Sales: 'bar'
                        }
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                format: '%Y-%m-%d'
                            }
                        }
                    }
                });

                const {data} = await axios.get('chart');

                chart.load({
                    columns: [
                        ['x', ...data.map((order) => order.date)],
                        ['Sales', ...data.map((order) => order.sum)]
                    ]
                })
            }
        )()
    }, []);

    return(
        <Wrapper>
            <h2 className="mt-3">Daily Sales</h2>
            <div id="chart"></div>
        </Wrapper>
    )
}

export default Dashboard