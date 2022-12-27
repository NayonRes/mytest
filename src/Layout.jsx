import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import Grid from "@mui/material/Grid";
import EmployeeListView from "./EmployeeListView";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  tableStyle: {
    order: 0,
    [theme.breakpoints.down("md")]: {
      order: 1,
    },
  },
  formStyle: {
    order: 1,
    [theme.breakpoints.down("md")]: {
      order: 0,
    },
  },
}));
const Layout = () => {
  const classes = useStyles();
  const [tableDataList, setTableDataList] = useState([
    {
      employeeID: "6003f42c-1303-a4f8-cd86-a03380948897",
      name: "Nayon",
      department: {
        name: "Aluminium and steel workboats",
        parentId: "97",
        value: "271",
      },
      agreeTerms: true,
    },
    {
      employeeID: "cd9fd774-1127-97de-087f-adc120650ebd",
      name: "Jhon Doe",
      department: {
        name: "Air",
        parentId: "21",
        value: "111",
      },
      agreeTerms: true,
    },
  ]);
  const [updateObj, setUpdateObj] = useState({});
  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} xl={8} className={classes.tableStyle}>
          <EmployeeListView
            tableDataList={tableDataList}
            setUpdateObj={setUpdateObj}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={4} className={classes.formStyle}>
          <EmployeeForm
            tableDataList={tableDataList}
            setTableDataList={setTableDataList}
            updateObj={updateObj}
            setUpdateObj={setUpdateObj}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
