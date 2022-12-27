import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TableChartIcon from "@mui/icons-material/TableChart"; 

const EmployeeListView = ({tableDataList, setUpdateObj}) => {
 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("No data found");
  

  useEffect(() => {}, []);

  return (
    <>
      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="body1"
          color="info"
          gutterBottom
          component="div"
          style={{ background: "#ddd", padding: "10px 16px" }}
        >
          <TableChartIcon
            style={{ position: "relative", top: "4px", fontSize: "20px" }}
          />{" "}
          Employee List
        </Typography>

        <div
          style={{
            overflowX: "auto",

            minWidth: "100%",
            // width: "Calc(100vw - 367px)",
            padding: "10px 16px 0px",
            boxSizing: "border-box",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                tableDataList.length > 0 &&
                tableDataList.map((row, i) => (
                  <TableRow
                    key={i}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>{row?.department?.name}</TableCell>
                    

                    <TableCell align="center">
                      <IconButton
                        variant="contained"
                        // color="success"
                        disableElevation
                        onClick={()=>setUpdateObj(row)}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

              {tableDataList.length < 1 ? (
                <TableRow>
                  <TableCell colSpan={3} style={{ textAlign: "center" }}>
                    <strong> {message}</strong>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
          <br />
        </div>
      </div>
    </>
  );
};

export default EmployeeListView;
