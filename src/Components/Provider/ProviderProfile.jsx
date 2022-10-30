import React, { useState, useEffect } from "react";
import ProviderService from "../../Services/Provider/ProviderService";
import ProviderProfileCard from "./ProviderProfileCard";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Text from "../../Assets/Text/text.json";
export default function ProviderProfile({ providerId }) {
  const [profile, setProfile] = useState();

  useEffect(() => {
    ProviderService.GetProfile(providerId).then((res) => {
      setProfile(res.data);
    });
  }, [providerId]);

  return (
    <>
      <ProviderProfileCard profile={profile} />
      {profile?.isOnline ? null : (
        <Card
          style={{
            maxWidth: "800px",
            textAlign: "center",
            margin: "20px 0",
            padding: "10px",
          }}
        >
          <Typography style={{ color: "#EB9D11", fontSize: "14px" }}>
            این مشاور هم اکنون در دسترس نمیباشد.
          </Typography>
          <Typography>
            {Text.textProviderProfile}
            <Link
              style={{ color: "#3EB24D" }}
              to="/Selection/Provider/Consultation/3"
            >
              {" "}
              لیست مشاوران
            </Link>{" "}
            یکی از مشاوران آنلاین را انتخاب کنید.
          </Typography>
        </Card>
      )}
    </>
  );
}
