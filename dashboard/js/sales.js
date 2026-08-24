/* =========================================
   OLIST ANALYTICS — SALES PAGE
========================================= */


/* =========================================
   HELPERS
========================================= */

function salesFormatMoney(value) {

    if (Math.abs(value) >= 1000000) {

        return "R$" +
            (value / 1000000).toFixed(2) +
            "M";

    }


    if (Math.abs(value) >= 1000) {

        return "R$" +
            (value / 1000).toFixed(1) +
            "K";

    }


    return "R$" +
        value.toFixed(2);

}


function salesGetYear(month) {

    const match =
        String(month).match(/20\d{2}/);

    return match
        ? Number(match[0])
        : null;

}


/* =========================================
   FILTER
========================================= */

const salesPeriodFilter =
    document.getElementById(
        "salesPeriodFilter"
    );


let selectedPeriod = "all";


function getFilteredRevenue() {

    if (selectedPeriod === "all") {

        return [...monthlyRevenue];

    }


    return monthlyRevenue.filter(
        item =>
            salesGetYear(item.month) ===
            Number(selectedPeriod)
    );

}


function getSelectedYearData() {

    if (selectedPeriod === "all") {

        return null;

    }


    return yearlySales.find(
        item =>
            item.year ===
            Number(selectedPeriod)
    );

}


function getSelectedCategories() {

    if (selectedPeriod === "all") {

        return [...categoryRevenue]
            .map(item => ({
                ...item
            }));

    }


    return categoryYearlySales
        .filter(
            item =>
                item.year ===
                Number(selectedPeriod)
        )
        .map(item => ({

            category:
                formatCategoryName(
                    item.category
                ),

            revenue:
                item.revenue,

            percentage:
                item.percentage

        }));

}


function formatCategoryName(
    category
) {

    return category

        .replace(/_/g, " ")

        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );

}


/* =========================================
   UPDATE KPI
========================================= */

function updateSalesKPIs(
    filteredRevenue
) {

    const yearData =
        getSelectedYearData();


    let totalRevenue;

    let totalOrders;

    let aov;


    if (yearData) {

        totalRevenue =
            yearData.revenue;

        totalOrders =
            yearData.orders;

        aov =
            yearData.aov;

    } else {

        totalRevenue =
            filteredRevenue.reduce(
                (sum, item) =>
                    sum + item.revenue,
                0
            );

        totalOrders =
            kpis.totalOrders;

        aov =
            kpis.averageOrderValue;

    }


    const peak =
        filteredRevenue.reduce(
            (best, item) =>

                item.revenue >
                best.revenue
                    ? item
                    : best,

            filteredRevenue[0]
        );


    const totalRevenueElement =
        document.getElementById(
            "salesTotalRevenue"
        );


    const revenueFooter =
        document.getElementById(
            "salesRevenueFooter"
        );


    const ordersElement =
        document.querySelector(
            ".kpi-orders .kpi-value"
        );


    const aovElement =
        document.querySelector(
            ".kpi-aov .kpi-value"
        );


    const ordersFooter =
        document.querySelector(
            ".kpi-orders .kpi-footer"
        );


    const aovFooter =
        document.querySelector(
            ".kpi-aov .kpi-footer"
        );


    const peakRevenueElement =
        document.getElementById(
            "salesPeakRevenue"
        );


    const peakMonthElement =
        document.getElementById(
            "salesPeakMonth"
        );


    if (totalRevenueElement) {

        totalRevenueElement.textContent =
            salesFormatMoney(
                totalRevenue
            );

    }


    if (revenueFooter) {

        revenueFooter.textContent =
            selectedPeriod === "all"

                ? "● All-time product revenue"

                : `● ${selectedPeriod} product revenue`;

    }


    if (ordersElement) {

        ordersElement.textContent =
            totalOrders.toLocaleString(
                "en-US"
            );

    }


    if (ordersFooter) {

        ordersFooter.textContent =
            selectedPeriod === "all"

                ? "● All periods"

                : `● ${selectedPeriod}`;

    }


    if (aovElement) {

        aovElement.textContent =
            "R$" +
            aov.toFixed(2);

    }


    if (aovFooter) {

        aovFooter.textContent =
            selectedPeriod === "all"

                ? "● Overall average"

                : `● ${selectedPeriod} average`;

    }


    if (
        peakRevenueElement &&
        peak
    ) {

        peakRevenueElement.textContent =
            salesFormatMoney(
                peak.revenue
            );

    }


    if (
        peakMonthElement &&
        peak
    ) {

        peakMonthElement.textContent =
            `● ${peak.month}`;

    }

}


/* =========================================
   REVENUE INSIGHT
========================================= */

function updateRevenueInsight(
    filteredRevenue
) {

    const insight =
        document.getElementById(
            "salesRevenueInsight"
        );


    const tableInsight =
        document.getElementById(
            "monthlyTableInsight"
        );


    if (
        !insight ||
        !filteredRevenue.length
    ) {

        return;

    }


    const peak =
        filteredRevenue.reduce(
            (best, item) =>

                item.revenue >
                best.revenue
                    ? item
                    : best,

            filteredRevenue[0]
        );


    const totalRevenue =
        filteredRevenue.reduce(
            (sum, item) =>
                sum + item.revenue,
            0
        );


    if (selectedPeriod === "all") {

        insight.innerHTML = `

            Revenue accelerated significantly during
            2017 and remained close to
            <strong>R$1M per month</strong>
            through much of 2018.

        `;

    } else {

        insight.innerHTML = `

            <strong>${selectedPeriod}</strong>
            generated
            <strong>${salesFormatMoney(
                totalRevenue
            )}</strong>
            in product revenue.

            The highest month was
            <strong>${peak.month}</strong>
            at
            <strong>${salesFormatMoney(
                peak.revenue
            )}</strong>.

        `;

    }


    if (tableInsight) {

        tableInsight.innerHTML = `

            <strong>${peak.month}</strong>
            recorded the highest monthly revenue
            ${selectedPeriod === "all"
                ? "in the analyzed period"
                : `in ${selectedPeriod}`
            }.

        `;

    }

}


/* =========================================
   REVENUE CHART
========================================= */

function renderRevenueChart(
    filteredRevenue
) {

    const salesRevenueContainer =
        document.querySelector(
            "#salesRevenueChart svg"
        );


    if (
        !salesRevenueContainer ||
        !filteredRevenue.length
    ) {

        return;

    }


    salesRevenueContainer.innerHTML = "";


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
            ...filteredRevenue.map(
                item => item.revenue
            )
        );


    function salesX(index) {

        if (
            filteredRevenue.length ===
            1
        ) {

            return padding.left +
                chartWidth / 2;

        }


        return padding.left +

            (
                index /
                (filteredRevenue.length - 1)
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
                stroke-width="1"
            />

            <text
                x="${padding.left - 12}"
                y="${y + 4}"
                text-anchor="end"
                font-size="11"
                fill="#9ca3af"
            >
                ${salesFormatMoney(value)}
            </text>

        `;

    }


    /* POINTS */

    const points =
        filteredRevenue
            .map(
                (item, index) =>
                    `${salesX(index)},${salesY(item.revenue)}`
            )
            .join(" ");


    /* AREA */

    const areaPoints =

        `${salesX(0)},${padding.top + chartHeight} ` +

        points +

        ` ${salesX(filteredRevenue.length - 1)},${padding.top + chartHeight}`;


    salesRevenueContainer.innerHTML += `

        <defs>

            <linearGradient
                id="salesRevenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >

                <stop
                    offset="0%"
                    stop-color="#2563eb"
                    stop-opacity="0.18"
                />

                <stop
                    offset="100%"
                    stop-color="#2563eb"
                    stop-opacity="0"
                />

            </linearGradient>

        </defs>

        <polygon
            points="${areaPoints}"
            fill="url(#salesRevenueGradient)"
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


    /* POINTS */

    filteredRevenue.forEach(
        (item, index) => {

            salesRevenueContainer.innerHTML += `

                <circle
                    cx="${salesX(index)}"
                    cy="${salesY(item.revenue)}"
                    r="3.5"
                    fill="#ffffff"
                    stroke="#2563eb"
                    stroke-width="2"
                />

            `;

        }
    );


    /* PEAK */

    const peakIndex =
        filteredRevenue.reduce(
            (
                best,
                item,
                index
            ) =>

                item.revenue >
                filteredRevenue[best].revenue
                    ? index
                    : best,

            0
        );


    const peak =
        filteredRevenue[peakIndex];


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
            Peak · ${salesFormatMoney(
                peak.revenue
            )}
        </text>

    `;


    /* X AXIS */

    const step =
        filteredRevenue.length > 18
            ? 2
            : 1;


    filteredRevenue.forEach(
        (item, index) => {

            if (
                index % step === 0 ||
                index ===
                    filteredRevenue.length - 1
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


    /* BASELINE */

    salesRevenueContainer.innerHTML += `

        <line
            x1="${padding.left}"
            y1="${padding.top + chartHeight}"
            x2="${width - padding.right}"
            y2="${padding.top + chartHeight}"
            stroke="#d1d5db"
            stroke-width="1"
        />

    `;

}


/* =========================================
   CATEGORY CHART
========================================= */

function renderCategoryChart() {

    const salesCategoryContainer =
        document.querySelector(
            "#salesCategoryChart svg"
        );


    if (!salesCategoryContainer) {

        return;

    }


    salesCategoryContainer.innerHTML = "";


    const categories =
        getSelectedCategories();


    if (!categories.length) {

        return;

    }


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
            ...categories.map(
                item => item.revenue
            )
        );


    categories.forEach(
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
                    ${salesFormatMoney(
                        item.revenue
                    )}
                </text>

            `;

        }
    );

}


/* =========================================
   MONTHLY TABLE
========================================= */

function renderMonthlyTable(
    filteredRevenue
) {

    const monthlyTable =
        document.getElementById(
            "monthlyTable"
        );


    if (!monthlyTable) {

        return;

    }


    monthlyTable.innerHTML = "";


    const sortedMonths =
        [...filteredRevenue]
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

                        ${salesFormatMoney(
                            item.revenue
                        )}

                    </td>

                </tr>

            `;

        }
    );

}


/* =========================================
   CATEGORY TABLE
========================================= */

function renderCategoryTable() {

    const categoryTable =
        document.getElementById(
            "categoryTable"
        );


    if (!categoryTable) {

        return;

    }


    categoryTable.innerHTML = "";


    const categories =
        getSelectedCategories();


    categories.forEach(
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
                        ${salesFormatMoney(
                            item.revenue
                        )}
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


/* =========================================
   RENDER EVERYTHING
========================================= */

function renderSalesPage() {

    const filteredRevenue =
        getFilteredRevenue();


    updateSalesKPIs(
        filteredRevenue
    );


    updateRevenueInsight(
        filteredRevenue
    );


    renderRevenueChart(
        filteredRevenue
    );


    renderMonthlyTable(
        filteredRevenue
    );


    renderCategoryChart();

    renderCategoryTable();


    const badge =
        document.getElementById(
            "salesChartBadge"
        );


    if (badge) {

        badge.textContent =
            selectedPeriod === "all"
                ? "All time"
                : selectedPeriod;

    }

}


/* =========================================
   FILTER EVENT
========================================= */

if (salesPeriodFilter) {

    salesPeriodFilter.addEventListener(
        "change",
        function () {

            selectedPeriod =
                this.value;

            renderSalesPage();

        }
    );

}


/* =========================================
   INITIAL RENDER
========================================= */

renderSalesPage();