import Head from "next/head";
import React from "react";
import { useVirtual } from "react-virtual";
import styles from "../styles/Home.module.css";

function List(items = []) {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: 1000,
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
            Row {virtualRow.index}
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
          <p className={styles.description}>
            <List />
          </p>
        </section>
        <section>
          <h1 className={styles.title}>React-Query</h1>
          <p className={styles.description}>
            <List />
          </p>
        </section>
      </main>
    </div>
  );
}
