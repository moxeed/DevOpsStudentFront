import { Typography, Card, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ServiceProvider from "../../Services/Product/PackageService";

const ProviderIntro = ({ providerId, category }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    ServiceProvider.GetServiceContent(Number(providerId), category).then(
      (res) => setData(res)
    );
  }, [category, providerId]);

  return (
    <Card>
      <Grid container justifyContent="center" align="center">
        {data?.slice(0, 2).map((item, i) => (
          <a
            key={i}
            href={item.link}
            style={{ color: "white" }}
            target="_blank"
            rel="noreferrer"
          >
            <button className="button-important">
              {category === "Tutoring" ? (
                <>
                  {item.contentType === 0 ? (
                    <Typography>دانلود فایل نمونه تدریس</Typography>
                  ) : (
                    <Typography>
                      مشاهده کارنامه ها و محتواهای علمی و مشاوره ای مشاور
                    </Typography>
                  )}
                </>
              ) : (
                <>
                  {item.contentType === 1 ? (
                    <Typography>فایل نمونه برنامه</Typography>
                  ) : (
                    <Typography>
                      مشاهده کارنامه ها و محتواهای علمی و مشاوره ای مشاور
                    </Typography>
                  )}
                </>
              )}
            </button>
          </a>
        ))}
      </Grid>
    </Card>
  );
};

export default ProviderIntro;
