/* =========================================
   OLIST ANALYTICS — SALES PAGE
========================================= */


/* =========================================
   MONTHLY REVENUE CHART
========================================= */

const salesRevenueContainer =
    document.querySelector(
        "#salesRevenueChart svg"
    );


if (salesRevenueContainer) {

    const width = 1100;
    const height = 380;

    const padding = {

        top: 25,
        right: 35,
        bottom: 50,
        left: 70

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


    function salesX(index) {

        return padding.left +

            (
                index /
                (monthlyRevenue.length - 1)
            ) *

            chartWidth;

    }


    function salesY(value) {

        return padding.top +

            chartHeight -

            (
                value /
                maxRevenue
            ) *

            chartHeight;

    }


    /* GRID */

    for (
        let i = 0;
        i <= 5;
        i++
    ) {

        const value =
            maxRevenue *
            (i / 5);

        const y =
            salesY(value);


        salesRevenueContainer.innerHTML += `

            <line
                x1="${padding.left}"
                y1="${y}"
                x2="${width - padding.right}"
                y2="${y}"
                stroke="#e5e7eb"
            />

            <text
                x="${padding.left - 12}"
                y="${y + 4}"
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
                    `${salesX(index)},${salesY(item.revenue)}`
            )
            .join(" ");


    const areaPoints =

        `${salesX(0)},${padding.top + chartHeight} ` +

        points +

        ` ${salesX(monthlyRevenue.length - 1)},${padding.top + chartHeight}`;


    salesRevenueContainer.innerHTML += `

        <polygon
            points="${areaPoints}"
            fill="#eff6ff"
        />

    `;


    /* LINE */

    salesRevenueContainer.innerHTML += `

        <polyline
            points="${points}"
            fill="none"
            stroke="#2563eb"
            stroke-width="3"
            stroke-linejoin="round"
            stroke-linecap="round"
        />

    `;


    /* HIGHLIGHT PEAK */

    const peakIndex =
        monthlyRevenue.reduce(
            (
                best,
                item,
                index
            ) =>

                item.revenue >
                monthlyRevenue[best].revenue

                    ? index
                    : best,

            0
        );


    const peak =
        monthlyRevenue[peakIndex];


    salesRevenueContainer.innerHTML += `

        <circle
            cx="${salesX(peakIndex)}"
            cy="${salesY(peak.revenue)}"
            r="6"
            fill="#ffffff"
            stroke="#2563eb"
            stroke-width="3"
        />

        <text
            x="${salesX(peakIndex)}"
            y="${salesY(peak.revenue) - 14}"
            text-anchor="middle"
            font-size="11"
            font-weight="600"
            fill="#2563eb"
        >
            Peak · R$${(
                peak.revenue / 1000000
            ).toFixed(2)}M
        </text>

    `;


    /* X AXIS */

    monthlyRevenue.forEach(
        (item, index) => {

            if (
                index % 2 === 0 ||
                index === monthlyRevenue.length - 1
            ) {

                salesRevenueContainer.innerHTML += `

                    <text
                        x="${salesX(index)}"
                        y="${height - 15}"
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

const salesCategoryContainer =
    document.querySelector(
        "#salesCategoryChart svg"
    );


if (salesCategoryContainer) {

    const width = 800;

    const left = 175;
    const right = 100;

    const chartWidth =
        width -
        left -
        right;

    const barHeight = 22;
    const gap = 15;


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


            salesCategoryContainer.innerHTML += `

                <text
                    x="${left - 12}"
                    y="${y + 15}"
                    text-anchor="end"
                    font-size="12"
                    fill="#4b5563"
                >
                    ${item.category}
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
                    x="${left + barWidth + 9}"
                    y="${y + 15}"
                    font-size="11"
                    fill="#6b7280"
                >
                    R$${(
                        item.revenue / 1000000
                    ).toFixed(2)}M
                </text>

            `;

        }
    );

}


/* =========================================
   MONTHLY PERFORMANCE TABLE
========================================= */

const monthlyTable =
    document.getElementById(
        "monthlyTable"
    );


if (monthlyTable) {

    const sortedMonths =
        [...monthlyRevenue]
            .sort(
                (a, b) =>
                    b.revenue -
                    a.revenue
            )
            .slice(0, 8);


    sortedMonths.forEach(
        (item, index) => {

            monthlyTable.innerHTML += `

                <tr>

                    <td class="strong">

                        ${index + 1}.
                        ${item.month}

                    </td>

                    <td>

                        R$${(
                            item.revenue /
                            1000000
                        ).toFixed(2)}M

                    </td>

                </tr>

            `;

        }
    );

}


/* =========================================
   CATEGORY TABLE
========================================= */

const categoryTable =
    document.getElementById(
        "categoryTable"
    );


if (categoryTable) {

    categoryRevenue.forEach(
        (item, index) => {

            categoryTable.innerHTML += `

                <tr>

                    <td class="strong">
                        ${index + 1}
                    </td>

                    <td class="strong">
                        ${item.category}
                    </td>

                    <td>
                        R$${(
                            item.revenue /
                            1000000
                        ).toFixed(2)}M
                    </td>

                    <td>

                        <span class="badge badge-blue">

                            ${item.percentage.toFixed(2)}%

                        </span>

                    </td>

                </tr>

            `;

        }
    );

}