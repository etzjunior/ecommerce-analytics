# Olist E-Commerce Analytics Dashboard

An interactive e-commerce analytics dashboard built using the Olist Brazilian E-Commerce dataset.

The project transforms raw transactional data into a multi-page analytics dashboard covering sales performance, customer satisfaction, delivery performance, and geographic revenue distribution.

## 🚀 Live Demo

👉 [View the live dashboard](https://etzjunior.github.io/ecommerce-analytics/dashboard/)

## Dashboard

The dashboard provides four main analytical views:

- **Executive Overview** — Overall revenue, orders, average order value, reviews, delivery performance and category performance.
- **Sales Analysis** — Revenue trends, yearly performance, monthly revenue and category contribution.
- **Customers & Delivery** — Customer review distribution and the relationship between delivery performance and customer satisfaction.
- **Geographic Analysis** — Revenue, customers and order activity across Brazilian states.

## Key Insights

Some of the main findings include:

- Total product revenue of approximately **R$13.59M**
- **99,441 orders** analyzed
- Average order value of approximately **R$136.68**
- Overall customer review score of **4.09 / 5**
- **77.07%** of reviews were 4–5 stars
- Orders delivered on time or early received an average review of **4.29 / 5**
- Late deliveries received an average review of **2.57 / 5**
- São Paulo was the leading state by product revenue
- Health & Beauty was the highest-revenue category in the analyzed category data

## Technologies

- HTML
- CSS
- JavaScript
- Python
- Pandas
- SVG
- Git & GitHub

## Data

The project uses the **Olist Brazilian E-Commerce dataset**.

Raw data is processed with Python/Pandas into analytical datasets used by the dashboard.

Processed datasets include:

- Monthly revenue
- Yearly sales
- Category sales
- Yearly category sales
- Delivery and review analysis
- State revenue

## Project Structure

```text
ecommerce-analytics/
│
├── dashboard/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── data.js
│   │   ├── overview.js
│   │   ├── sales.js
│   │   ├── customers.js
│   │   └── geography.js
│   ├── index.html
│   ├── sales.html
│   ├── customers.html
│   └── geography.html
│
├── data/
│   └── processed/
│       ├── category_sales.csv
│       ├── category_yearly_sales.csv
│       ├── delivery_reviews.csv
│       ├── monthly_revenue.csv
│       ├── state_revenue.csv
│       └── yearly_sales.csv
│
├── scripts/
│   └── generate_sales_yearly.py
│
├── README.md
└── .gitignore