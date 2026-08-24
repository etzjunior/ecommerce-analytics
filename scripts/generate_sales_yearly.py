import pandas as pd
from pathlib import Path


# =========================================
# PATHS
# =========================================

BASE = Path(__file__).resolve().parents[1]

DATA = BASE / "data" / "raw" / "olist" / "olist-dataset"

OUTPUT = BASE / "data" / "processed"


# =========================================
# LOAD DATA
# =========================================

orders = pd.read_csv(
    DATA / "olist_orders_dataset.csv"
)

items = pd.read_csv(
    DATA / "olist_order_items_dataset.csv"
)

products = pd.read_csv(
    DATA / "olist_products_dataset.csv"
)

translation = pd.read_csv(
    DATA / "product_category_name_translation.csv"
)


# =========================================
# PREPARE ORDER DATES
# =========================================

orders["order_purchase_timestamp"] = pd.to_datetime(
    orders["order_purchase_timestamp"]
)

orders["year"] = (
    orders["order_purchase_timestamp"]
    .dt.year
)


# =========================================
# KEEP VALID PURCHASE ORDERS
# =========================================

orders = orders[
    orders["order_status"] == "delivered"
].copy()


# =========================================
# YEARLY SALES
# =========================================

yearly_revenue = (
    items
    .merge(
        orders[
            ["order_id", "year"]
        ],
        on="order_id",
        how="inner"
    )
    .groupby("year")
    .agg(
        revenue=("price", "sum"),
        orders=("order_id", "nunique")
    )
    .reset_index()
)


yearly_revenue["aov"] = (
    yearly_revenue["revenue"] /
    yearly_revenue["orders"]
)


yearly_revenue = yearly_revenue.sort_values(
    "year"
)


# =========================================
# CATEGORY BY YEAR
# =========================================

category_yearly = (
    items
    .merge(
        orders[
            ["order_id", "year"]
        ],
        on="order_id",
        how="inner"
    )
    .merge(
        products[
            [
                "product_id",
                "product_category_name"
            ]
        ],
        on="product_id",
        how="left"
    )
    .merge(
        translation,
        on="product_category_name",
        how="left"
    )
)


category_yearly["category"] = (
    category_yearly[
        "product_category_name_english"
    ]
    .fillna("Unknown")
)


category_yearly = (
    category_yearly
    .groupby(
        ["year", "category"]
    )
    .agg(
        revenue=("price", "sum")
    )
    .reset_index()
)


# =========================================
# CATEGORY PERCENTAGE
# =========================================

category_yearly["percentage"] = (

    category_yearly["revenue"]

    /

    category_yearly
    .groupby("year")["revenue"]
    .transform("sum")

) * 100


category_yearly = category_yearly.sort_values(
    ["year", "revenue"],
    ascending=[True, False]
)


# =========================================
# SAVE
# =========================================

OUTPUT.mkdir(
    parents=True,
    exist_ok=True
)


yearly_revenue.to_csv(
    OUTPUT / "yearly_sales.csv",
    index=False
)


category_yearly.to_csv(
    OUTPUT / "category_yearly_sales.csv",
    index=False
)


# =========================================
# PRINT RESULTS
# =========================================

print("\nYEARLY SALES")
print("=" * 50)

print(
    yearly_revenue.to_string(
        index=False
    )
)


print("\n\nTOP CATEGORIES BY YEAR")
print("=" * 50)

print(
    category_yearly
    .groupby("year")
    .head(5)
    .to_string(index=False)
)


print("\n\nFiles created:")
print(
    OUTPUT / "yearly_sales.csv"
)

print(
    OUTPUT / "category_yearly_sales.csv"
)