import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@mui/material";
import API from "../../../Axios/API";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: 150,
  },
}));
export default function Carts() {
  const [change, setChange] = React.useState(false);
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      { title: "order Id", field: "_id", editable: "never" },
      {
        title: "Create At",
        field: "CreatedAt",
        editable: "never",
        render: (rowData) => {
          return <p>{moment(rowData.createAt).format("LL")}</p>;
        },
      },
      {
        title: "Product",
        field: "products",
        editable: "never",
        render: (cart) =>
          cart.products.map((item) => {
            return (
              <div>
                <h5>
                  {" "}
                  {item.name} [QT: {item.quantity}, SIZE: {item.size}]
                </h5>
                <img
                  src={item.img}
                  style={{ width: 100, borderRadius: "50%" }}
                />
              </div>
            );
          }),
      },
      {
        title: "Status",
        field: "status",
        type: "numeric",
        editable: "never",
        render: (rowData) => {
          return (
            <div>
              {rowData.status === 1 && (
                <div severity="warning">Pending Order</div>
              )}
              {rowData.status === 2 && (
                <div severity="info">Delivery Order</div>
              )}
              {rowData.status === 3 && (
                <div severity="success">Payment Success</div>
              )}
            </div>
          );
        },
        validate: (rowData) => rowData.status >=1 && rowData.status <=3,
      },
      {
        title: "Payment",
        field: "isPayed",
        type: "boolean",
        editable: "never",
        render: (rowData) => {
            if(rowData.isPayed === true){
                return(
                    <div variant="outlined" severity="success">
                        Paid(Paypal)
                    </div>
                );
            } else if(rowData.isPayed === false && rowData.status === 3){
                return (
                    <div variant="outlined" severity="success">
                        Paid (COD)
                    </div>
                );
            } else if(rowData.isPayed === false){
                return(
                    <div variant="outlined" severity="infor">
                        No payment
                    </div>
                );
            }
        },
      },
    ],
    data: [],
  });
  const adminLocal = JSON.parse(localStorage.getItem("user"));
  const {token} = adminLocal;
  React.useEffect(() => {
    const callAPI = async() => {
        try{
            const res = await API(`cart/showAdmin`, "GET", null, token);
            setState((prevState) => {
                return{...prevState, data: res.data};
            });
        }catch(error){}
    };
    callAPI();
  }, [change]);

  const handleDeleteCart = async(cart) => {
    try{
        const res = await API(`cart/delte`, "DELETE", {_id: cart._id}, token)
        alert("Delete successful")
    } catch(error){
        alert("Delete fail");
    }
  };

  const updateStatus = async(cart, noti) => {
    try{
        const res = await API(
            `cart/updateStatus/${cart._id}`,
            "PUT",
            {status: noti},
            token
        );
        alert("Update Successful")

    }catch(error){
        alert("Update Fail");
    }
  };
  return(
    <div>
        <MaterialTable title="Manager Order" columns={state.columns} data={state.data} options={{
            pageSize: 10,
            pageSizeOptions: [10,15,20,25],
            emptyRowsWhenPaging: false,
        }}
        editable={{
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                    if(oldData){
                        if(oldData.status === 3){
                            alert("Payment success cannot update");
                        } else if(oldData.status === 1) {
                            updateStatus(newData, (newData.status = 2));
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return{...prevState, data};
                            });
                        }else if(oldData.status === 2){
                            updateStatus(newData, (newData.status = 3));
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return{...prevState, data};
                            });
                        }
                    }
                }, 600);
            }),
            onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            handleDeleteCart(oldData);
                            setState((prevState) => {
                              const data = [...prevState.data];
                              data.splice(data.indexOf(oldData), 1);
                              return { ...prevState, data };
                            });
                          }, 600);
                        }),
                    }} 
            />
            </div>
  )
}
