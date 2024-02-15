import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import moment from "moment";
import { Box, Link } from "@mui/material";

export default function NewsCard({ article }) {
  const { author, title, description, url, urlToImage, publishedAt } = article;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={title}
        subheader={moment(publishedAt).format("MMM DD YYYY")}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          urlToImage ||
          "https://img.freepik.com/free-photo/global-business-internet-network-connection-iot-internet-things-business-intelligence-concept-busines-global-network-futuristic-technology-background-ai-generative_1258-176792.jpg?w=1380&t=st=1707991237~exp=1707991837~hmac=17a31d2402aa72846eea9b9481646c0ccd399c44a8a89ffe1b58876c8dd68c3a"
        }
        alt="News image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Box padding="15px" display="flex" justifyContent="space-between">
        <Typography variant="p">By {author || "Anonymous"}</Typography>
        <Link target="_blank" href={url}>
          Read More
        </Link>
      </Box>
    </Card>
  );
}
