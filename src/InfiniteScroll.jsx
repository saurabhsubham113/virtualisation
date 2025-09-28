import React, { useEffect, useState } from "react";
import axios from "axios";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const url = `https://picsum.photos/v2/list?page=${page}&limit=5`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setData((prev) => [...prev, ...res.data]);
      })
      .catch((err) => console.log(err));
  }, [url]);

  useEffect(() => {
    const lastImage = document.querySelector(".image-post:last-child");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.unobserve(lastImage);
          setPage((prev) => prev + 1);
        }
      }
    });

    if (!lastImage) {
      return;
    }

    observer.observe(lastImage);

    return () => {
      if (lastImage) {
        observer.unobserve(lastImage);
      }
      observer.disconnect();
    };
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      {data.map(({ id, download_url, author }) => {
        return (
          <img
            className="image-post"
            key={id}
            src={download_url}
            alt={author}
          />
        );
      })}
    </div>
  );
};

export default InfiniteScroll;
