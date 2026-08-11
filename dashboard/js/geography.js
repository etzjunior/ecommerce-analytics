/* =========================================
   OLIST ANALYTICS — GEOGRAPHY
========================================= */


/* =========================================
   HELPERS
========================================= */

function geoMillions(value) {

    return "R$" +
        (
            value / 1000000
        ).toFixed(2) +
        "M";

}


/* =========================================
   REVENUE BY STATE
========================================= */

const stateRevenueContainer =
    document.querySelector(
        "#stateRevenueChart svg"
    );


if (stateRevenueContainer) {

    const width = 1100;

    const left = 75;
    const right = 120;

    const chartWidth =
        width -
        left -
        right;

    const barHeight = 27;
    const gap = 17;


    const maxRevenue =
        Math.max(
            ...stateRevenue.map(
                item => item.revenue
            )
        );


    stateRevenue.forEach(
        (item, index) => {

            const y =
                12 +
                index *
                (
                    barHeight +
                    gap
                );


            const barWidth =
                (
                    item.revenue /
                    maxRevenue
                ) *
                chartWidth;


            stateRevenueContainer.innerHTML += `

                <text
                    x="${left - 15}"
                    y="${y + 18}"
                    text-anchor="end"
                    font-size="13"
                    font-weight="700"
                    fill="#374151"
                >
                    ${item.state}
                </text>


                <rect
                    x="${left}"
                    y="${y}"
                    width="${chartWidth}"
                    height="${barHeight}"
                    rx="7"
                    fill="#f1f3f5"
                />


                <rect
                    x="${left}"
                    y="${y}"
                    width="${barWidth}"
                    height="${barHeight}"
                    rx="7"
                    fill="#2563eb"
                />


                <text
                    x="${left + barWidth + 10}"
                    y="${y + 18}"
                    font-size="12"
                    fill="#6b7280"
                >
                    ${geoMillions(item.revenue)}
                </text>

            `;

        }
    );

}


/* =========================================
   CUSTOMERS BY STATE
========================================= */

const customerContainer =
    document.querySelector(
        "#customerStateChart svg"
    );


if (customerContainer) {

    const width = 800;

    const left = 60;
    const right = 80;

    const chartWidth =
        width -
        left -
        right;

    const barHeight = 21;
    const gap = 12;


    const maxCustomers =
        Math.max(
            ...stateRevenue.map(
                item => item.customers
            )
        );


    stateRevenue.forEach(
        (item, index) => {

            const y =
                8 +
                index *
                (
                    barHeight +
                    gap
                );


            const barWidth =
                (
                    item.customers /
                    maxCustomers
                ) *
                chartWidth;


            customerContainer.innerHTML += `

                <text
                    x="${left - 10}"
                    y="${y + 15}"
                    text-anchor="end"
                    font-size="11"
                    font-weight="600"
                    fill="#4b5563"
                >
                    ${item.state}
                </text>


                <rect
                    x="${left}"
                    y="${y}"
                    width="${chartWidth}"
                    height="${barHeight}"
                    rx="6"
                    fill="#f1f3f5"
                />


                <rect
                    x="${left}"
                    y="${y}"
                    width="${barWidth}"
                    height="${barHeight}"
                    rx="6"
                    fill="#2563eb"
                />


                <text
                    x="${left + barWidth + 8}"
                    y="${y + 15}"
                    font-size="10"
                    fill="#6b7280"
                >
                    ${item.customers.toLocaleString()}
                </text>

            `;

        }
    );

}


/* =========================================
   ORDERS BY STATE
========================================= */

const orderContainer =
    document.querySelector(
        "#orderStateChart svg"
    );


if (orderContainer) {

    const width = 800;

    const left = 60;
    const right = 80;

    const chartWidth =
        width -
        left -
        right;

    const barHeight = 21;
    const gap = 12;


    const maxOrders =
        Math.max(
            ...stateRevenue.map(
                item => item.orders
            )
        );


    stateRevenue.forEach(
        (item, index) => {

            const y =
                8 +
                index *
                (
                    barHeight +
                    gap
                );


            const barWidth =
                (
                    item.orders /
                    maxOrders
                ) *
                chartWidth;


            orderContainer.innerHTML += `

                <text
                    x="${left - 10}"
                    y="${y + 15}"
                    text-anchor="end"
                    font-size="11"
                    font-weight="600"
                    fill="#4b5563"
                >
                    ${item.state}
                </text>


                <rect
                    x="${left}"
                    y="${y}"
                    width="${chartWidth}"
                    height="${barHeight}"
                    rx="6"
                    fill="#f1f3f5"
                />


                <rect
                    x="${left}"
                    y="${y}"
                    width="${barWidth}"
                    height="${barHeight}"
                    rx="6"
                    fill="#2563eb"
                />


                <text
                    x="${left + barWidth + 8}"
                    y="${y + 15}"
                    font-size="10"
                    fill="#6b7280"
                >
                    ${item.orders.toLocaleString()}
                </text>

            `;

        }
    );

}


/* =========================================
   STATE TABLE
========================================= */

const stateTable =
    document.getElementById(
        "stateTable"
    );


if (stateTable) {

    const totalRevenue =
        stateRevenue.reduce(
            (sum, item) =>
                sum + item.revenue,
            0
        );


    stateRevenue.forEach(
        (item, index) => {

            const share =
                (
                    item.revenue /
                    totalRevenue
                ) *
                100;


            stateTable.innerHTML += `

                <tr>

                    <td class="strong">
                        ${index + 1}
                    </td>


                    <td class="strong">
                        ${item.state}
                    </td>


                    <td>
                        ${geoMillions(item.revenue)}
                    </td>


                    <td>
                        ${item.customers.toLocaleString()}
                    </td>


                    <td>
                        ${item.orders.toLocaleString()}
                    </td>


                    <td>

                        <span class="badge badge-blue">

                            ${share.toFixed(2)}%

                        </span>

                    </td>

                </tr>

            `;

        }
    );

}