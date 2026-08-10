# Olist E-commerce Analytics Dashboard

An interactive e-commerce analytics dashboard built using the Olist Brazilian E-commerce dataset.

The project analyzes sales performance, customer behavior, delivery performance, product categories, and customer satisfaction to identify useful business insights.

## Dashboard

The dashboard provides a visual overview of:

- Revenue trends over time
- Delivery performance
- Top product categories
- Customer satisfaction
- Revenue by Brazilian state

## Key Insights

### Revenue

The dataset generated approximately **R$13.59M** in product revenue across **99,441 orders**.

The average order value was approximately **R$136.68**.

Revenue increased substantially throughout 2017 and reached its highest levels during early-to-mid 2018.

### Delivery Performance

Approximately **53.47%** of orders were delivered on time or early, while **46.53%** were late.

Delivery performance showed a strong relationship with customer satisfaction:

| Delivery Status | Average Review |
|---|---:|
| On Time / Early | 4.29 / 5 |
| Late | 2.57 / 5 |

This indicates that late delivery is associated with substantially lower customer review scores.

### Customer Satisfaction

The overall average review score was **4.09 / 5**.

Approximately **77.07%** of reviews were positive, defined as ratings of 4 or 5 stars.

### Product Categories

The highest-revenue product categories included:

1. Health & Beauty — R$1.26M
2. Watches & Gifts — R$1.21M
3. Bed / Bath / Table — R$1.04M
4. Sports & Leisure — R$0.99M
5. Computers & Accessories — R$0.91M

### Revenue by State

São Paulo generated the highest product revenue at approximately **R$5.03M**, followed by:

- Rio de Janeiro — R$1.82M
- Minas Gerais — R$1.59M
- Paraná — R$0.68M
- Rio Grande do Sul — R$0.68M

This highlights a strong concentration of revenue in Brazil's southeastern states.

## Dataset

The project uses the **Brazilian Olist E-commerce Dataset**, containing information about orders, customers, products, payments, reviews, sellers, and geographic locations.

The original raw dataset is intentionally excluded from this repository because of its size. Only the processed analytical datasets required for the dashboard are included.

## Technologies

- Python
- Pandas
- Jupyter Notebook
- HTML
- CSS
- JavaScript
- SVG
- Git / GitHub

## Project Structure

```text
ecommerce-analytics/
│
├── dashboard/
│   └── index.html
│
├── data/
│   └── processed/
│       ├── category_sales.csv
│       ├── delivery_reviews.csv
│       ├── monthly_revenue.csv
│       └── state_revenue.csv
│
├── analysis/
│
├── .gitignore
└── README.md