import React, { useEffect, useState } from "react";
import { Menu, Checkbox } from "antd";
import "./FilterSection.scss";
import "antd/dist/antd.css";
import { Paper, Switch, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

const { SubMenu } = Menu;
export default function FilterSection({
  filters,
  onChange,
  selectedFilters,
  handleFreePrice,
  category,
}) {
  const [showFree, setShowFree] = useState(false);
  const { FreeWebinars } = useParams();
  useEffect(() => {
    if (FreeWebinars === "free" && handleFreePrice) {
      setShowFree(true);
    }
  }, [FreeWebinars]);
  if (filters)
    return (
      <>
        <Paper style={{ textAlign: "center", padding: "10px" }}>
          <Typography
            style={{ fontSize: "15px", fontWeight: "bold", color: "#868686" }}
          >
            فیلترها
          </Typography>
        </Paper>
        {category === "Webinar" ? (
          <Paper
            style={{
              textAlign: "right",
              padding: "10px",
              margin: "5px 0px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontSize: "15px", color: "#808080" }}>
              نمایش همایش های رایگان
            </Typography>
            <Switch
              checked={showFree}
              onChange={(event) => {
                handleFreePrice(event.target.checked);
                setShowFree(event.target.checked);
              }}
              name="showFree"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Paper>
        ) : null}
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          className="menuStyle"
          style={{ backgroundColor: "transparent", border: 0 }}
        >
          {Object.keys(filters).map((k, i) => {
            return (
              <React.Fragment key={k}>
                {category === "Tutoring" ? (
                  k !== "GroupIds" && k !== "CourseIds" ? (
                    <SubMenu
                      key={filters[k].name + i}
                      title={filters[k].name}
                      className="subMenuStyle"
                    >
                      {filters[k]?.options?.map((item, i) => (
                        <Menu.Item
                          key={"options_a" + i}
                          className="chekboxStyle"
                        >
                          <Checkbox
                            onChange={(e) => {
                              onChange(k, item.id, e.target.checked);
                            }}
                            name={item.id}
                            checked={
                              selectedFilters &&
                              selectedFilters[k]?.includes(item.id)
                            }
                          >
                            {item.name}
                          </Checkbox>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ) : null
                ) : k !== "GroupIds" && k !== "CourseIds" ? (
                  <SubMenu
                    key={filters[k].name + i}
                    title={filters[k].name}
                    className="subMenuStyle"
                  >
                    {filters[k]?.options?.map((item, i) => (
                      <Menu.Item
                        key={item.id + "_options_" + i}
                        className="chekboxStyle"
                      >
                        <Checkbox
                          onChange={(e) => {
                            onChange(k, item.id, e.target.checked);
                          }}
                          name={item.id}
                          checked={
                            selectedFilters &&
                            selectedFilters[k]?.includes(item.id)
                          }
                        >
                          {item.name}
                        </Checkbox>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : null}
              </React.Fragment>
            );
          })}
        </Menu>
      </>
    );
  return null;
}
