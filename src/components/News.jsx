import { Box, Typography } from "@mui/material";
import NewsCard from "./NewsCard";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import useApi from "../hooks/useApi";
import Loader from "./Loader";

const News = () => {
  const [news, setNews] = useState([]);

  const api = useApi();

  useEffect(() => {
    async function getNews() {
      api.startLoading();
      try {
        const data = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=fe0cd0589e0742d6aab06eb476790fae"
        );

        setNews(data.data.articles);
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
              <NewsCard key={Date.now()} article={article} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default News;
