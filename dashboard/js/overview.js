/* =========================================
   OLIST ANALYTICS — OVERVIEW
========================================= */


/* =========================================
   HELPERS
========================================= */

function formatMillions(value) {

    return "R$" +
        (value / 1000000).toFixed(2) +
        "M";

}


function formatThousands(value) {

    return value.toLocaleString(
        "en-US"
    );

}


/* =========================================
   REVENUE CHART
========================================= */

const revenueContainer =
    document.querySelector(
        "#revenueChart svg"
    );


if (revenueContainer) {

    const width = 900;
    const height = 320;

    const padding = {

        top: 20,
        right: 30,
        bottom: 45,
        left: 60

    };


    const chartWidth =
        width -
        padding.left -
        padding.right;


    const chartHeight =
        height -
        padding.top -
        padding.bottom;


    const maxRevenue =
        Math.max(
            ...monthlyRevenue.map(
                item => item.revenue
            )
        );


    function x(index) {

        return padding.left +

            (
                index /
                (monthlyRevenue.length - 1)
            ) *

            chartWidth;

    }


    function y(value) {

        return padding.top +

            chartHeight -

            (
                value /
                maxRevenue
            ) *

            chartHeight;

    }


    /* GRID LINES */

    for (
        let i = 0;
        i <= 4;
        i++
    ) {

        const value =
            maxRevenue *
            (i / 4);

        const yPosition =
            y(value);


        revenueContainer.innerHTML += `

            <line
                x1="${padding.left}"
                y1="${yPosition}"
                x2="${width - padding.right}"
                y2="${yPosition}"
                stroke="#e5e7eb"
                stroke-width="1"
            />

            <text
                x="${padding.left - 10}"
                y="${yPosition + 4}"
                text-anchor="end"
                font-size="11"
                fill="#9ca3af"
            >
                R$${(
                    value / 1000000
                ).toFixed(1)}M
            </text>

        `;

    }


    /* AREA */

    const points =
        monthlyRevenue
            .map(
                (item, index) =>
                    `${x(index)},${y(item.revenue)}`
            )
            .join(" ");


    const areaPoints =

        `${x(0)},${padding.top + chartHeight} ` +

        points +

        ` ${x(monthlyRevenue.length - 1)},${padding.top + chartHeight}`;


    revenueContainer.innerHTML += `

        <polygon
            points="${areaPoints}"
            fill="#eff6ff"
        />

    `;


    /* LINE */

    revenueContainer.innerHTML += `

        <polyline
            points="${points}"
            fill="none"
            stroke="#2563eb"
            stroke-width="3"
            stroke-linejoin="round"
            stroke-linecap="round"
        />

    `;


    /* POINTS */

    monthlyRevenue.forEach(
        (item, index) => {

            revenueContainer.innerHTML += `

                <circle
                    cx="${x(index)}"
                    cy="${y(item.revenue)}"
                    r="4"
                    fill="#ffffff"
                    stroke="#2563eb"
                    stroke-width="2"
                />

            `;

        }
    );


    /* X AXIS */

    monthlyRevenue.forEach(
        (item, index) => {

            if (
                index % 3 === 0 ||
                index === monthlyRevenue.length - 1
            ) {

                revenueContainer.innerHTML += `

                    <text
                        x="${x(index)}"
                        y="${height - 12}"
                        text-anchor="middle"
                        font-size="10"
                        fill="#9ca3af"
                    >
                        ${item.month}
                    </text>

                `;

            }

        }
    );

}


/* =========================================
   CATEGORY CHART
========================================= */

const categoryContainer =
    document.querySelector(
        "#categoryChart svg"
    );


if (categoryContainer) {

    const width = 900;
    const height = 360;

    const left = 180;
    const right = 80;

    const chartWidth =
        width -
        left -
        right;

    const barHeight = 20;
    const gap = 14;


    const maxRevenue =
        Math.max(
            ...categoryRevenue.map(
                item => item.revenue
            )
        );


    categoryRevenue.forEach(
        (item, index) => {

            const y =
                10 +
                index *
                (barHeight + gap);


            const barWidth =
                (
                    item.revenue /
                    maxRevenue
                ) *
                chartWidth;


            /* LABEL */

            categoryContainer.innerHTML += `

                <text
                    x="${left - 12}"
                    y="${y + 14}"
                    text-anchor="end"
                    font-size="12"
                    fill="#4b5563"
                >
                    ${item.category}
                </text>

            `;


            /* BACKGROUND */

            categoryContainer.innerHTML += `

                <rect
                    x="${left}"
                    y="${y}"
                    width="${chartWidth}"
                    height="${barHeight}"
                    rx="5"
                    fill="#f1f3f5"
                />

            `;


            /* BAR */

            categoryContainer.innerHTML += `

                <rect
                    x="${left}"
                    y="${y}"
                    width="${barWidth}"
                    height="${barHeight}"
                    rx="5"
                    fill="#2563eb"
                />

            `;


            /* VALUE */

            categoryContainer.innerHTML += `

                <text
                    x="${left + barWidth + 8}"
                    y="${y + 14}"
                    font-size="11"
                    fill="#6b7280"
                >
                    ${formatMillions(item.revenue)}
                </text>

            `;

        }
    );

}


/* =========================================
   STATE CHART
========================================= */

const stateContainer =
    document.querySelector(
        "#stateChart svg"
    );


if (stateContainer) {

    const width = 1000;

    const left = 60;
    const right = 120;

    const chartWidth =
        width -
        left -
        right;

    const barHeight = 18;
    const gap = 7;


    const maxRevenue =
        Math.max(
            ...stateRevenue.map(
                item => item.revenue
            )
        );


    stateRevenue.forEach(
        (item, index) => {

            const y =
                10 +
                index *
                (barHeight + gap);


            const barWidth =
                (
                    item.revenue /
                    maxRevenue
                ) *
                chartWidth;


            /* STATE */

            stateContainer.innerHTML += `

                <text
                    x="${left - 14}"
                    y="${y + 13}"
                    text-anchor="end"
                    font-size="12"
                    font-weight="600"
                    fill="#374151"
                >
                    ${item.state}
                </text>

            `;


            /* BACKGROUND */

            stateContainer.innerHTML += `

                <rect
                    x="${left}"
                    y="${y}"
                    width="${chartWidth}"
                    height="${barHeight}"
                    rx="5"
                    fill="#f1f3f5"
                />

            `;


            /* BAR */

            stateContainer.innerHTML += `

                <rect
                    x="${left}"
                    y="${y}"
                    width="${barWidth}"
                    height="${barHeight}"
                    rx="5"
                    fill="#2563eb"
                />

            `;


            /* VALUE */

            stateContainer.innerHTML += `

                <text
                    x="${left + barWidth + 8}"
                    y="${y + 13}"
                    font-size="11"
                    fill="#6b7280"
                >
                    ${formatMillions(item.revenue)}
                </text>

            `;

        }
    );

}