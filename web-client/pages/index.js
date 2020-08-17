import Head from "next/head";
import React from "react";
import { useVirtual } from "react-virtual";
import { useSWRInfinite } from "swr";
import { useInfiniteQuery } from "react-query";
import styles from "../styles/Home.module.css";

// SWR

const fetcher = (...args) => fetch(...args).then(res => res.json());

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.data.length) return null;
  return `http://localhost:5000/products?page[number]=${pageIndex +
    1}&page[size]=10`;
};

function SWRList() {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  if (!data) return "loading";

  let items = [];
  for (let i = 0; i < data.length; i++) {
    items = items.concat(data[i].data);
  }

  return (
    <div>
      <p>{items.length} products listed</p>
      <List products={items} />
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
}

// React Query

function RQList() {
  const fetchProducts = (key, cursor = 1) =>
    fetch(
      `http://localhost:5000/products?page[number]=${cursor}&page[size]=10`
    ).then(res => res.json());

  const {
    status,
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    error,
    canFetchMore
  } = useInfiniteQuery("products", fetchProducts, {
    getFetchMore: (lastGroup, allGroups) => {
      return allGroups.length + 1;
    }
  });

  let items = [];
  if (data) {
    data.map(group => {
      items = items.concat(group.data);
    });
  }

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div>
      <p>{items.length} products listed</p>
      <List products={items} />
      <div>
        <button
          onClick={() => fetchMore()}
          disabled={!canFetchMore || isFetchingMore}
        >
          {isFetchingMore
            ? "Loading more..."
            : canFetchMore
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingMore ? "Fetching..." : null}</div>
    </div>
  );
}

function List({ products = [] }) {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: products.length,
    parentRef,
    estimateSize: React.useCallback(() => 35, [])
  });

  return (
    <div ref={parentRef} className={styles.list}>
      <div
        className="ListInner"
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative"
        }}
      >
        {rowVirtualizer.virtualItems.map(virtualRow => (
          <div
            key={virtualRow.index}
            className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            {products[virtualRow.index].id} &mdash;&nbsp;
            {products[virtualRow.index].attributes.name} &mdash;&nbsp;
            {products[virtualRow.index].attributes.price}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SWR vs React-Query</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section>
          <h1 className={styles.title}>SWR</h1>
          <div className={styles.description}>
            <SWRList />
          </div>
        </section>
        <section>
          <h1 className={styles.title}>React-Query</h1>
          <div className={styles.description}>
            <RQList />
          </div>
        </section>
      </main>
    </div>
  );
}
