import { Box, Typography } from "@mui/material";
import NewsCard from "./NewsCard";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import useApi from "../hooks/useApi";
import Loader from "./Loader";
import getTopFinancialNews from "../lib/news/getTopFinancialNews";

const News = () => {
  const [news, setNews] = useState([]);

  const api = useApi();

  useEffect(() => {
    async function getNews() {
      api.startLoading();
      try {
        const newsdata = await getTopFinancialNews();
        setNews(newsdata.data);
      } catch (error) {
        api.setError(error.message);
      } finally {
        api.stopLoading();
      }
    }

    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: "1.5rem", md: "3rem", sm: "2rem" } }}
      >
        Top financial news
      </Typography>
      {api.isLoading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              marginTop: "20px",
              flexWrap: "wrap",
              gap: "30px",
              justifyContent: { md: "space-around", sm: "center" },
            }}
          >
            {news.map((article) => (
              <NewsCard key={nanoid()} article={article} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default News;
