/* =========================================
   OLIST ANALYTICS — SHARED DATA
========================================= */


/* =========================================
   MONTHLY REVENUE
========================================= */

const monthlyRevenue = [

    { month: "2016-09", revenue: 267.36 },
    { month: "2016-10", revenue: 49507.66 },
    { month: "2016-12", revenue: 10.90 },

    { month: "2017-01", revenue: 120312.87 },
    { month: "2017-02", revenue: 247303.02 },
    { month: "2017-03", revenue: 374344.30 },
    { month: "2017-04", revenue: 359927.23 },
    { month: "2017-05", revenue: 506071.14 },
    { month: "2017-06", revenue: 433038.60 },
    { month: "2017-07", revenue: 498031.48 },
    { month: "2017-08", revenue: 573971.68 },
    { month: "2017-09", revenue: 624401.69 },
    { month: "2017-10", revenue: 664219.43 },
    { month: "2017-11", revenue: 1010271.37 },
    { month: "2017-12", revenue: 743914.17 },

    { month: "2018-01", revenue: 950030.36 },
    { month: "2018-02", revenue: 844178.71 },
    { month: "2018-03", revenue: 983213.44 },
    { month: "2018-04", revenue: 996647.75 },
    { month: "2018-05", revenue: 996517.68 },
    { month: "2018-06", revenue: 865124.31 },
    { month: "2018-07", revenue: 895507.22 },
    { month: "2018-08", revenue: 854686.33 },
    { month: "2018-09", revenue: 145.00 },
    { month: "2018-10", revenue: 0.00 }

];


/* =========================================
   PRODUCT CATEGORIES
========================================= */

const categoryRevenue = [

    {
        category: "Health & Beauty",
        revenue: 1258681.34,
        percentage: 9.384664
    },

    {
        category: "Watches & Gifts",
        revenue: 1205005.68,
        percentage: 8.984461
    },

    {
        category: "Bed / Bath / Table",
        revenue: 1036988.68,
        percentage: 7.731735
    },

    {
        category: "Sports & Leisure",
        revenue: 988048.97,
        percentage: 7.366843
    },

    {
        category: "Computers & Accessories",
        revenue: 911954.32,
        percentage: 6.799485
    },

    {
        category: "Furniture & Decor",
        revenue: 729762.49,
        percentage: 5.441072
    },

    {
        category: "Cool Stuff",
        revenue: 635290.85,
        percentage: 4.736696
    },

    {
        category: "Housewares",
        revenue: 632248.66,
        percentage: 4.714014
    },

    {
        category: "Auto",
        revenue: 592720.11,
        percentage: 4.419291
    },

    {
        category: "Garden Tools",
        revenue: 485256.46,
        percentage: 3.618048
    }

];


/* =========================================
   REVENUE BY STATE
========================================= */

const stateRevenue = [

    {
        state: "SP",
        revenue: 5029555.05,
        customers: 40302,
        orders: 41746
    },

    {
        state: "RJ",
        revenue: 1824092.67,
        customers: 12384,
        orders: 12852
    },

    {
        state: "MG",
        revenue: 1585308.03,
        customers: 11259,
        orders: 11635
    },

    {
        state: "RS",
        revenue: 675304.02,
        customers: 5277,
        orders: 5466
    },

    {
        state: "PR",
        revenue: 683083.76,
        customers: 4882,
        orders: 5045
    },

    {
        state: "SC",
        revenue: 520553.34,
        customers: 3534,
        orders: 3637
    },

    {
        state: "BA",
        revenue: 511349.99,
        customers: 3277,
        orders: 3805
    },

    {
        state: "DF",
        revenue: 302603.94,
        customers: 2075,
        orders: 2140
    },

    {
        state: "GO",
        revenue: 294591.95,
        customers: 1952,
        orders: 2020
    },

    {
        state: "ES",
        revenue: 275037.31,
        customers: 1964,
        orders: 2033
    }

];


/* =========================================
   DELIVERY PERFORMANCE
========================================= */

const deliveryPerformance = {

    lateOrders: 77002,

    onTimeEarlyOrders: 88653,

    latePercentage: 46.53,

    onTimeEarlyPercentage: 53.47,

    lateAverageReview: 2.57,

    onTimeAverageReview: 4.29

};


/* =========================================
   REVIEW DATA
========================================= */

const reviewDistribution = [

    {
        score: 1,
        count: 11424
    },

    {
        score: 2,
        count: 3151
    },

    {
        score: 3,
        count: 8179
    },

    {
        score: 4,
        count: 19142
    },

    {
        score: 5,
        count: 57328
    }

];


const reviewMetrics = {

    averageScore: 4.09,

    positivePercentage: 77.07

};


/* =========================================
   GENERAL KPIs
========================================= */

const kpis = {

    totalRevenue: 13590000,

    totalOrders: 99441,

    averageOrderValue: 136.68,

    averageReview: 4.09

};