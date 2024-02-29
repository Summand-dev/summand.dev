import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

// import { users } from "src/_mock/user";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import ErrorView from "src/components/error-view";

import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../../../api/user";
import ConfirmDialog from "../../dialog/configm-dialog";
import { getCameras } from "../../../api/camera";
import { errorToDict } from "../../../utils/error";
import { downloadFileByType } from "../../../utils/export";

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("desc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("created_at");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [confirmDialog, setConfirmDialog] = useState(false);

  const [formState, setFormState] = useState("none");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [principals, setPrincipals] = useState("");
  const [cameras, setCameras] = useState([]);
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = (user) => {
    setErrors({});
    setLoading(false);
    setErrors({});
    setUserId(user.id);
    setUsername(user.username);
    setPassword("");
    setPasswordConfirm("");
    setName(user.name);
    setFormState("update");
    setPrincipals(user.principals[0]);
    setSelectedCameras(user.cameras.map((camera) => camera.id));
  };
  const handleUpdateUserStatus = (user, status) => {
    user.status = status;
    updateUser(
      user.id,
      user.username,
      "",
      "",
      user.name,
      user.principals,
      user.selectedCameras,
      user.status
    ).then(() => {
      refreshUsers();
    });
  };
  const handleDeleteUser = (user) => {
    setUserId(user.id);
    setName(user.name);
    setConfirmDialog(true);
  };
  const handleDeleteSelected = () => {};
  const handleCreateUser = () => {
    setErrors({});
    setLoading(false);
    setUserId("");
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setName("");
    setPrincipals("role:viewer");
    setSelectedCameras([]);
    setFormState("create");
  };
  const backToList = () => {
    setFormState("none");
    refreshUsers();
  };

  const handleError = (res) => {
    setErrors(errorToDict(res));
  };

  const saveUser = () => {
    setLoading(true);
    if (formState == "create") {
      createUser(
        username,
        password,
        passwordConfirm,
        name,
        [principals],
        selectedCameras
      )
        .then(() => {
          backToList();
        })
        .catch((res) => handleError(res))
        .finally(() => {
          setLoading(false);
        });
    } else {
      updateUser(
        userId,
        username,
        password,
        passwordConfirm,
        name,
        [principals],
        selectedCameras
      )
        .then(() => {
          backToList();
        })
        .catch((res) => handleError(res))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    refreshUsers();
    getCameras().then((cams) => {
      setCameras(cams);
    });
  }, []);

  const refreshUsers = () => {
    getUsers().then((users) => {
      setUsers(users);
    });
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users
        .filter((n) => n.role !== "admin")
        .map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const onDownloadRequest = (type) => {
    downloadFileByType(users, type, "users");
  };

  const notFound = !dataFiltered.length && !!filterName;

  if (formState == "create" || formState == "update") {
    return (
      <Container dir="rtl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">
            {formState == "create" ? "ایجاد کاربر جدید" : "بروزرسانی کاربر"}
          </Typography>

          <Button
            onClick={backToList}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:close-line" />}
          >
            لغو
          </Button>
        </Stack>
        <Card>
          <Grid container spacing={3} sx={{ p: 3 }}>
            <Grid item xs={12}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                name="name"
                label="نام"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                name="username"
                label="نام کاربری"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                name="password"
                label="رمز عبور"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                fullWidth
                name="passwordConfirm"
                label="تکرار رمز عبور"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="principal-select">سطح دسترسی</InputLabel>
                <Select
                  labelId="principal-select"
                  value={principals}
                  fullWidth
                  label="سطح دسترسی"
                  onChange={(val) => setPrincipals(val.target.value)}
                >
                  {/* <MenuItem dir="rtl" value={"role:admin"}>
                    ادمین
                  </MenuItem> */}
                  <MenuItem dir="rtl" value={"role:manager"}>
                    مدیر
                  </MenuItem>
                  <MenuItem dir="rtl" value={"role:viewer"}>
                    ناظر
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="camera-select">دوربین ها</InputLabel>
                <Select
                  labelId="camera-select"
                  value={selectedCameras}
                  fullWidth
                  multiple
                  label="دوربین ها"
                  onChange={(val) => setSelectedCameras(val.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={cameras.find((i) => i.id == value).name}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {cameras.map((camera) => (
                    <MenuItem key={camera.id} dir="rtl" value={camera.id}>
                      {camera.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <ErrorView errors={errors}></ErrorView>
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: "end", display: "flex" }}>
              <LoadingButton
                sx={{ px: 3, py: 1 }}
                onClick={saveUser}
                color={formState == "create" ? "success" : "primary"}
                variant="contained"
                loading={loading}
              >
                {formState == "create" ? "ایجاد کاربر" : "بروزرسانی کاربر"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </Container>
    );
  } else {
    return (
      <Container dir="rtl">
        <ConfirmDialog
          value={confirmDialog}
          title="تایید حذف کاربر"
          message={"آیا از حذف کاربر `" + name + "` اطمینان دارید؟"}
          onChange={setConfirmDialog}
          onAccept={(id) => {
            deleteUser(id).then(() => {
              refreshUsers();
            });
            setConfirmDialog(false);
          }}
          onReject={() => setConfirmDialog(false)}
          data={userId}
        ></ConfirmDialog>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">کاربر ها</Typography>

          <Button
            onClick={handleCreateUser}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            کاربر جدید
          </Button>
        </Stack>

        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteSelected={handleDeleteSelected}
            onDownloadRequest={onDownloadRequest}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: "name", label: "نام" },
                    { id: "company", label: "نام کاربری" },
                    { id: "role", label: "سطح دسترسی" },
                    { id: "status", label: "وضعیت" },
                    { id: "" },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        name={row.name}
                        role={row.role}
                        status={row.status}
                        username={row.username}
                        avatarUrl={row.avatarUrl}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                        handleUpdateClick={(event) => handleUpdateUser(row)}
                        handleDeleteClick={(event) => handleDeleteUser(row)}
                        handleStatusClick={(event) =>
                          handleUpdateUserStatus(row, event)
                        }
                      />
                    ))}

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            labelRowsPerPage="تعداد در هر صفحه:"
            page={page}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    );
  }
}
