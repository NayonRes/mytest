import React, { useState, useEffect } from "react";
import allSector from "./database/Sectors";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import uuid from "react-uuid";
import { useSnackbar } from "notistack";
import PulseLoader from "react-spinners/PulseLoader";
import ClearIcon from "@mui/icons-material/Clear";
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "30px 30px 30px 30px",
    background: "#fff",
    borderRadius: "10px",
    // width: "700px",
    // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    margin: "auto",
    // [theme.breakpoints.down("xl")]: {
    //   width: "900px",
    // },
  },
  marginStyle: {
    marginBottom: "20px !important",
  },
  selectTitleStyle: {
    margin: "0 !important",
    color: "#878585",
  },
  formTitleStyle: {
    fontSize: "24px",
    color: "#00A9BE",
    margin: "0 0 20px 0 !important",
  },
}));

const EmployeeForm = ({
  tableDataList,
  setTableDataList,
  updateObj,
  setUpdateObj,
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [isAgreeToTerms, setIsAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [sectorData, setSectorData] = useState({
    sectorNameList: [],
    departmentNameList: [],
    subDepartmentNameList: [],
    subDepartmentItemNameList: [],
  });
  const [selectedSectors, setSelectedSectors] = useState({
    sectorObject: {},
    departmentObject: {},
    subDepartmentObject: {},
    subDepartmentItemObject: {},
  });
  const [sectorValues, setSectorValues] = useState({
    sectorValue: "",
    departmentValue: "",
    subDepartmentValue: "",
    subDepartmentItemValue: "",
  });
  const [errors, setErrors] = useState({
    nameError: false,
    sectorError: false,
    departmentError: false,
    subDepartmentError: false,
    subDepartmentItemError: false,
    termsError: false,
  });

  const handleSnakbarOpen = (msg, vrnt) => {
    let duration;
    if (vrnt === "error") {
      duration = 3000;
    } else {
      duration = 1000;
    }
    enqueueSnackbar(msg, {
      variant: vrnt,
      autoHideDuration: duration,
    });
  };

  const handleSectorChange = (event) => {
    let allDepartmentName = allSector?.filter(
      (item) => item.parentId === event.target.value
    );

    setSectorData({
      ...sectorData,
      departmentNameList: allDepartmentName,
      subDepartmentNameList: [],
      subDepartmentItemNameList: [],
    });
    let selectedSectorData = allSector?.find(
      (item) => item.value === event.target.value
    );

    setSelectedSectors({
      ...selectedSectors,
      sectorObject: selectedSectorData,
      departmentObject: {},
      subDepartmentObject: {},
      subDepartmentItemObject: {},
    });
    setSectorValues({
      ...sectorValues,
      sectorValue: event.target.value,
      departmentValue: "",
      subDepartmentValue: "",
      subDepartmentItemValue: "",
    });
  };

  const handleDepartmentChange = (event) => {
    let allSubDepartmentName = allSector?.filter(
      (item) => item.parentId === event.target.value
    );

    setSectorData({
      ...sectorData,
      subDepartmentNameList: allSubDepartmentName,
      subDepartmentItemNameList: [],
    });
    let selectedSectorData = allSector?.find(
      (item) => item.value === event.target.value
    );

    setSelectedSectors({
      ...selectedSectors,
      departmentObject: selectedSectorData,
      subDepartmentObject: {},
      subDepartmentItemObject: {},
    });
    setSectorValues({
      ...sectorValues,
      departmentValue: event.target.value,
      subDepartmentValue: "",
      subDepartmentItemValue: "",
    });
  };
  const handleSubdepartmentChange = (event) => {
    let allSubDepartmentItemName = allSector?.filter(
      (item) => item.parentId === event.target.value
    );

    setSectorData({
      ...sectorData,
      subDepartmentItemNameList: allSubDepartmentItemName,
    });
    let selectedSectorData = allSector?.find(
      (item) => item.value === event.target.value
    );

    setSelectedSectors({
      ...selectedSectors,
      subDepartmentObject: selectedSectorData,
      subDepartmentItemObject: {},
    });
    setSectorValues({
      ...sectorValues,
      subDepartmentValue: event.target.value,
      subDepartmentItemValue: "",
    });
  };
  const handleSubdepartmentItemChange = (event) => {
    let selectedSectorData = allSector?.find(
      (item) => item.value === event.target.value
    );

    setSelectedSectors({
      ...selectedSectors,
      subDepartmentItemObject: selectedSectorData,
    });
    setSectorValues({
      ...sectorValues,
      subDepartmentItemValue: event.target.value,
    });
  };

  const handleAgreeToTermsChange = (event) => {
    setIsAgreeToTerms(event.target.checked);
  };
  const validation = () => {
    let isError = false;
    let newNameError = false;
    let newSectorError = false;
    let newDepartmentError = false;
    let newSubDepartmentError = false;
    let newSubDepartmentItemError = false;
    let newTermsError = false;

    if (!name.trim()) {
      document.getElementById("name").focus();
      newNameError = true;
      isError = true;
    }

    if (
      sectorData.sectorNameList.length > 0 &&
      selectedSectors.sectorObject.value === undefined
    ) {
      newSectorError = true;
      isError = true;
    }
    if (
      sectorData.departmentNameList.length > 0 &&
      selectedSectors.departmentObject.value === undefined
    ) {
      newDepartmentError = true;
      isError = true;
    }
    if (
      sectorData.subDepartmentNameList.length > 0 &&
      selectedSectors.subDepartmentObject.value === undefined
    ) {
      newSubDepartmentError = true;
      isError = true;
    }
    if (
      sectorData.subDepartmentItemNameList.length > 0 &&
      selectedSectors.subDepartmentItemObject.value === undefined
    ) {
      newSubDepartmentItemError = true;
      isError = true;
    }
    if (isAgreeToTerms === false) {
      newTermsError = true;
      isError = true;
    }
    setErrors({
      nameError: newNameError,
      sectorError: newSectorError,
      departmentError: newDepartmentError,
      subDepartmentError: newSubDepartmentError,
      subDepartmentItemError: newSubDepartmentItemError,
      termsError: newTermsError,
    });
    return isError;
  };
  const onSubmit = (event) => {
    event.preventDefault();
    let err = validation();

    if (err) {
      return;
    } else {
      setLoading(true);

      let employeeID = "";
      if (id.length > 0) {
        employeeID = id;
      } else {
        employeeID = uuid();
      }
      let employeeDepartment = {};

      if (selectedSectors.subDepartmentItemObject.value !== undefined) {
        employeeDepartment = selectedSectors.subDepartmentItemObject;
      } else if (selectedSectors.subDepartmentObject.value !== undefined) {
        employeeDepartment = selectedSectors.subDepartmentObject;
      } else if (selectedSectors.departmentObject.value !== undefined) {
        employeeDepartment = selectedSectors.departmentObject;
      } else if (selectedSectors.sectorObject.value !== undefined) {
        employeeDepartment = selectedSectors.sectorObject;
      }

      setTimeout(() => {
        if (id.length > 0) {
          let newTableDataList = [];
          tableDataList.map((el) => {
            if (el.employeeID === id) {
              newTableDataList.push({
                employeeID: id,
                name: name,
                department: employeeDepartment,
                agreeTerms: isAgreeToTerms,
              });
            } else {
              newTableDataList.push(el);
            }
          });
          setTableDataList(newTableDataList);
          handleSnakbarOpen("Updated successfully", "success");
        } else {
          handleSnakbarOpen("Saved successfully", "success");
          setTableDataList([
            ...tableDataList,
            {
              employeeID: employeeID,
              name: name,
              department: employeeDepartment,
              agreeTerms: isAgreeToTerms,
            },
          ]);
        }
        setId(employeeID);
        setUpdateObj({});
        setLoading(false);
      }, 500);
    }
  };

  const getListAndValue = (updateObj) => {
    console.log("updateObj", updateObj);
    if (updateObj?.employeeID) {
      clearForm();
      setName(updateObj.name);
      setId(updateObj?.employeeID);
      setIsAgreeToTerms(updateObj?.agreeTerms);

      let listOfList = [];
      let valueList = [];
      let lastParentList = [];
      let secondlastParent = {};
      let secondlastParentList = [];
      let thirdlastParent = {};
      let thirdlastParentList = [];
      let forthlastParent = {};
      let forthlastParentList = [];
      if (updateObj.department !== undefined) {
        valueList.push(updateObj.department);
        lastParentList = allSector?.filter(
          (item) => item.parentId === updateObj.department.parentId
        );

        if (lastParentList !== undefined && lastParentList.length > 0) {
          listOfList.push(lastParentList);
        }
        secondlastParent = allSector?.find(
          (item) => item.value === updateObj.department.parentId
        );
      }
      if (secondlastParent !== undefined) {
        valueList.push(secondlastParent);
        secondlastParentList = allSector?.filter(
          (item) => item.parentId === secondlastParent.parentId
        );
        if (
          secondlastParentList !== undefined &&
          secondlastParentList.length > 0
        ) {
          listOfList.push(secondlastParentList);
        }

        thirdlastParent = allSector?.find(
          (item) => item.value === secondlastParent.parentId
        );
      }
      if (thirdlastParent !== undefined) {
        valueList.push(thirdlastParent);
        thirdlastParentList = allSector?.filter(
          (item) => item.parentId === thirdlastParent.parentId
        );

        if (
          thirdlastParentList !== undefined &&
          thirdlastParentList.length > 0
        ) {
          listOfList.push(thirdlastParentList);
        }
        forthlastParent = allSector?.find(
          (item) => item.value === thirdlastParent.parentId
        );
      }
      if (forthlastParent !== undefined) {
        valueList.push(forthlastParent);
        forthlastParentList = allSector?.filter(
          (item) => item.parentId === forthlastParent.parentId
        );

        if (
          forthlastParentList !== undefined &&
          forthlastParentList.length > 0
        ) {
          listOfList.push(forthlastParentList);
        }
      }
      console.log("listOfList", listOfList);
      if (listOfList.length === 4) {
        setSectorValues({
          sectorValue: forthlastParent?.value,
          departmentValue: thirdlastParent?.value,
          subDepartmentValue: secondlastParent?.value,
          subDepartmentItemValue: updateObj.department?.value,
        });

        setSelectedSectors({
          ...sectorValues,
          sectorObject: forthlastParent,
          departmentObject: thirdlastParent,
          subDepartmentObject: secondlastParent,
          subDepartmentItemObject: updateObj.department,
        });
        setSectorData({
          ...sectorData,
          sectorNameList: forthlastParentList,
          departmentNameList: thirdlastParentList,
          subDepartmentNameList: secondlastParentList,
          subDepartmentItemNameList: lastParentList,
        });
      } else if (listOfList.length === 3) {
        setSectorValues({
          sectorValue: thirdlastParent?.value,
          departmentValue: secondlastParent?.value,
          subDepartmentValue: updateObj.department?.value,
          subDepartmentItemValue: "",
        });

        setSelectedSectors({
          ...sectorValues,
          sectorObject: thirdlastParent,
          departmentObject: secondlastParent,
          subDepartmentObject: updateObj.department,
          subDepartmentItemObject: {},
        });
        setSectorData({
          ...sectorData,
          sectorNameList: thirdlastParentList,
          departmentNameList: secondlastParentList,
          subDepartmentNameList: lastParentList,
          subDepartmentItemNameList: [],
        });
      } else if (listOfList.length === 2) {
        setSectorValues({
          sectorValue: secondlastParent?.value,
          departmentValue: updateObj.department?.value,
          subDepartmentValue: "",
          subDepartmentItemValue: "",
        });

        setSelectedSectors({
          ...sectorValues,
          sectorObject: secondlastParent,
          departmentObject: updateObj.department,
          subDepartmentObject: {},
          subDepartmentItemObject: {},
        });
        setSectorData({
          ...sectorData,
          sectorNameList: secondlastParentList,
          departmentNameList: lastParentList,
          subDepartmentNameList: [],
          subDepartmentItemNameList: [],
        });
      } else if (listOfList.length === 1) {
        setSectorValues({
          sectorValue: updateObj.department?.value,
          departmentValue: "",
          subDepartmentValue: "",
          subDepartmentItemValue: "",
        });

        setSelectedSectors({
          ...sectorValues,
          sectorObject: updateObj.department,
          departmentObject: {},
          subDepartmentObject: {},
          subDepartmentItemObject: {},
        });
        setSectorData({
          ...sectorData,
          sectorNameList: lastParentList,
          departmentNameList: [],
          subDepartmentNameList: [],
          subDepartmentItemNameList: [],
        });
      }
    }
  };

  const clearForm = () => {
    setId("");
    setName("");

    setIsAgreeToTerms(false);
    setSectorData({
      ...sectorData,
      departmentNameList: [],
      subDepartmentNameList: [],
      subDepartmentItemNameList: [],
    });
    setSelectedSectors({
      sectorObject: {},
      departmentObject: {},
      subDepartmentObject: {},
      subDepartmentItemObject: {},
    });
    setSectorValues({
      sectorValue1: "",
      departmentValue1: "",
      subDepartmentValue1: "",
      subDepartmentItemValue1: "",
    });
    setErrors({
      nameError: false,
      sectorError: false,
      departmentError: false,
      subDepartmentError: false,
      subDepartmentItemError: false,
      termsError: false,
    });
  };

  useEffect(() => {
    let primarySectorName = allSector?.filter((item) => item.parentId === "0");
    setSectorData({ ...sectorData, sectorNameList: primarySectorName });
  }, []);
  useEffect(() => {
    getListAndValue(updateObj);
  }, [updateObj]);

  return (
    <div style={{ position: "relative" }}>
      <IconButton
        style={{ position: "absolute", right: 25, top: 30, color: "#878585" }}
        onClick={clearForm}
      >
        <ClearIcon />
      </IconButton>

      <form className={classes.form} onSubmit={onSubmit}>
        <p className={classes.formTitleStyle}>Employee Form</p>
        <p
          className={classes.selectTitleStyle}
          style={{ color: errors.nameError && "red" }}
        >
          Name *
        </p>
        <TextField
          className={classes.marginStyle}
          id="name"
          variant="outlined"
          size="small"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p
          className={classes.selectTitleStyle}
          style={{ color: errors.sectorError && "red" }}
        >
          Select your sector name *
        </p>
        <FormControl fullWidth size="small" className={classes.marginStyle}>
          <Select
            labelId="sector-name"
            id="sector-name-select"
            value={sectorValues?.sectorValue}
            onChange={handleSectorChange}
          >
            {sectorData?.sectorNameList?.map((item, i) => (
              <MenuItem key={i} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Collapse in={sectorData?.departmentNameList?.length > 0}>
          <p
            className={classes.selectTitleStyle}
            style={{ color: errors.departmentError && "red" }}
          >
            Select {selectedSectors?.sectorObject?.name?.toLowerCase()}{" "}
            department name *
          </p>
          <FormControl fullWidth size="small" className={classes.marginStyle}>
            <Select
              labelId="department-name"
              id="department-name-select"
              value={sectorValues?.departmentValue}
              onChange={handleDepartmentChange}
            >
              {sectorData?.departmentNameList?.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Collapse>
        <Collapse in={sectorData?.subDepartmentNameList?.length > 0}>
          <p
            className={classes.selectTitleStyle}
            style={{ color: errors.subDepartmentError && "red" }}
          >
            Select {selectedSectors?.departmentObject.name?.toLowerCase()}{" "}
            department name *
          </p>
          <FormControl fullWidth size="small" className={classes.marginStyle}>
            <Select
              labelId="subDepartment-name"
              id="subDepartment-name-select"
              value={sectorValues?.subDepartmentValue}
              onChange={handleSubdepartmentChange}
            >
              {sectorData?.subDepartmentNameList?.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Collapse>
        <Collapse in={sectorData?.subDepartmentItemNameList?.length > 0}>
          <p
            className={classes.selectTitleStyle}
            style={{ color: errors.subDepartmentItemError && "red" }}
          >
            Select {selectedSectors.subDepartmentObject.name?.toLowerCase()}{" "}
            department name *
          </p>
          <FormControl fullWidth size="small" className={classes.marginStyle}>
            <Select
              labelId="subDepartment-item-name"
              id="subDepartment-item-name-select"
              value={sectorValues?.subDepartmentItemValue}
              onChange={handleSubdepartmentItemChange}
            >
              {sectorData?.subDepartmentItemNameList?.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Collapse>
        <FormGroup
          className={classes.marginStyle}
          style={{ color: errors.termsError ? "red" : "#878585" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                label="Agree to terms *"
                checked={isAgreeToTerms}
                onChange={handleAgreeToTermsChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Agree to terms *"
          />
        </FormGroup>
        {id.length > 0 ? (
          <>
            <Button
              fullWidth
              disableElevation
              disabled={loading}
              variant="contained"
              type="submit"
              style={{ minHeight: "37px" }}
            >
              <PulseLoader
                color={"#00A9BE"}
                loading={loading}
                size={10}
                speedMultiplier={0.5}
              />{" "}
              {loading === false && "Update"}
            </Button>
          </>
        ) : (
          <>
            <Button
              fullWidth
              disableElevation
              disabled={loading}
              variant="contained"
              type="submit"
              style={{ minHeight: "37px" }}
            >
              <PulseLoader
                color={"#00A9BE"}
                loading={loading}
                size={10}
                speedMultiplier={0.5}
              />{" "}
              {loading === false && "Save"}
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default EmployeeForm;
