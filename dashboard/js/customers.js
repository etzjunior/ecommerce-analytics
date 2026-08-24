/* =========================================
   OLIST ANALYTICS — CUSTOMERS & DELIVERY
========================================= */


/* =========================================
   REVIEW DISTRIBUTION CHART
========================================= */

const reviewContainer =
    document.querySelector(
        "#reviewChart svg"
    );


if (reviewContainer) {

    const width = 800;
    const height = 300;

    const padding = {
        top: 20,
        right: 25,
        bottom: 45,
        left: 55
    };


    const chartWidth =
        width -
        padding.left -
        padding.right;


    const chartHeight =
        height -
        padding.top -
        padding.bottom;


    const maxReviews =
        Math.max(
            ...reviewDistribution.map(
                item => item.count
            )
        );


    const barWidth =
        chartWidth /
        reviewDistribution.length *
        0.58;


    reviewDistribution.forEach(
        (item, index) => {

            const x =
                padding.left +

                index *
                (
                    chartWidth /
                    reviewDistribution.length
                ) +

                (
                    chartWidth /
                    reviewDistribution.length -
                    barWidth
                ) / 2;


            const barHeight =
                (
                    item.count /
                    maxReviews
                ) *
                chartHeight;


            const y =
                padding.top +
                chartHeight -
                barHeight;


            /* BAR */

            reviewContainer.innerHTML += `

                <rect
                    x="${x}"
                    y="${y}"
                    width="${barWidth}"
                    height="${barHeight}"
                    rx="6"
                    fill="#2563eb"
                />

            `;


            /* COUNT */

            reviewContainer.innerHTML += `

                <text
                    x="${x + barWidth / 2}"
                    y="${y - 8}"
                    text-anchor="middle"
                    font-size="11"
                    font-weight="600"
                    fill="#374151"
                >
                    ${item.count.toLocaleString()}
                </text>

            `;


            /* SCORE */

            reviewContainer.innerHTML += `

                <text
                    x="${x + barWidth / 2}"
                    y="${height - 15}"
                    text-anchor="middle"
                    font-size="12"
                    fill="#6b7280"
                >
                    ${item.score} ★
                </text>

            `;

        }
    );


    /* BASELINE */

    reviewContainer.innerHTML += `

        <line
            x1="${padding.left}"
            y1="${padding.top + chartHeight}"
            x2="${width - padding.right}"
            y2="${padding.top + chartHeight}"
            stroke="#e5e7eb"
        />

    `;

}


/* =========================================
   REVIEW TABLE
========================================= */

const reviewTable =
    document.getElementById(
        "reviewTable"
    );


if (reviewTable) {

    const totalReviews =
        reviewDistribution.reduce(
            (sum, item) =>
                sum + item.count,
            0
        );


    reviewDistribution.forEach(
        item => {

            const percentage =
                (
                    item.count /
                    totalReviews
                ) *
                100;


            let sentiment;
            let badgeClass;


            if (item.score >= 4) {

                sentiment = "Positive";
                badgeClass = "badge-success";

            } else if (item.score === 3) {

                sentiment = "Neutral";
                badgeClass = "badge-warning";

            } else {

                sentiment = "Negative";
                badgeClass = "badge-danger";

            }


            reviewTable.innerHTML += `

                <tr>

                    <td class="strong">

                        ${item.score} ★

                    </td>

                    <td>

                        ${item.count.toLocaleString()}

                    </td>

                    <td>

                        ${percentage.toFixed(2)}%

                    </td>

                    <td>

                        <span class="badge ${badgeClass}">

                            ${sentiment}

                        </span>

                    </td>

                </tr>

            `;

        }
    );

}