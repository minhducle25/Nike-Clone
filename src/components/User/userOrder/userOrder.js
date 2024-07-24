import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../../Axios/API";
import * as action from "../userOrder/module/Action/action";
import * as ActionType from "../userOrder/module/Constants/constant";
import moment from "moment";
import CustomizedSteppers from "./orderIcon";

const useStyles = makeStyles((theme) => ({
  Container: {
    padding: "40px 48px",
    fontSize: 16,
    minHeight: 500,
  },
  Title: {
    fontSize: 24,
    backgroundColor: "black",
    color: "white",
    fontWeight: 500,
    padding: "20px",
  },
  OrderType: {
    padding: "20px 0",
    fontSize: 22,
    fontWeight: 500,
    borderBottom: "1px #cccccc solid",
  },
  Order: {
    backgroundColor: "white",
    outline: 0,
    border: 0,
    textAlign: "left",
    margin: "15px 0 0 0",
    width: 700,

    padding: "10px 0 10px 10px",
    // border: '1px #cccccc solid',
    overflow: "auto",
    borderRadius: 5,
    boxShadow:
      "0 1px 2px 2px rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)",
  },
  OrderHeader: {
    cursor: "pointer",
  },
  OrderStatus: {
    float: "right",
    marginBottom: 0,
  },
  OrderInfo: {
    paddingBottom: 10,
  },
  OrderProduct: {
    width: "70%",

    clear: "both",
    padding: "24px 0",
    margin: "15px auto 0",
    borderTop: "1px #cccccc solid",
  },
  ProductImageContainer: {
    paddingRight: 16,
    float: "left",
  },
  ProductImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    // [theme.breakpoints.down('xs')]: {
    //     width: 110,
    //     height: 110,
    // },
  },
  ProductDetail: {
    lineHeight: 1.75,
  },
  ProductName: {
    textDecoration: "none",
    color: "black",
  },
  Price: {
    float: "right",
  },
  SubDetail: {
    color: "#757575",
  },
  OrderCancel: {
    color: "#757575",
  },
}));

const UserOrder = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const dataOrder = useSelector(state => state.reducerOrder.dataOrder)
  const dataProcess = useSelector(state => state.reducerOrder.dataProcess)
  const dataDelivered = useSelector(state => state.reducerOrder.dataDelivered)
  React.useEffect(() => {
      const callAPI = async () => {
          try {
              const { token } = JSON.parse(localStorage.getItem("user"))
              const res = await API("cart", "GET", null, token)
              const dataProcessRedux = []
              const dataDeliveredRedux = []

              for (let i = res.data.length - 1; i >= 0; i--) {
                  if (res.data[i].status === 1 || res.data[i].status === 2) {
                      dataProcessRedux.push(res.data[i])
                  } else if (res.data[i].status === 3) {
                      dataDeliveredRedux.push(res.data[i])
                  }
              }

              dispatch(
                  action.createAction({
                      type: ActionType.DATA_ORDER,
                      payload: res.data
                  })
              )
              dispatch(
                  action.createAction({
                      type: ActionType.DATA_PROCESS,
                      payload: dataProcessRedux
                  })
              )
              dispatch(
                  action.createAction({
                      type: ActionType.DATA_DELIVERED,
                      payload: dataDeliveredRedux
                  })
              )
          } catch (error) {
              console.log({ ...error });
          }
      }
      callAPI()
  }, [])
  const [dataProcessClick, setDataProcessClick] = React.useState(0)
  const [dataDeliveredClick, setDataDeliveredClick] = React.useState(0)

  const handleOrderClick = (index) => {
      if (index === dataProcessClick) {
          setDataProcessClick(-1)
      } else {
          setDataProcessClick(index)
      }
  }
  const handleDeliveredClick = (index) => {
      if (index === dataDeliveredClick) {
          setDataDeliveredClick(-1)
      } else {
          setDataProcessClick(index)
      }
  }
  const convertDay = (index) => {
      return (
          moment(index).format("YYYY/MM/DD, h:mm:ss a")
      )
  }
  const handleCancel = (id) => {
      const { token } = JSON.parse(localStorage.getItem("user"))
      dispatch(action.cancelAPIOrder(id, token))
      const index = dataProcess.findIndex(item => {
          return item._id === id
      })
      dataProcess.splice(index, 1)
  }
  return (
<div className={classes.Container}>
            <div className={classes.Title}>your order</div>
            <div>
                <div className={classes.OrderType}> Processing order</div>

                <div>
                    {dataProcess?.map((item, key) => {
                        return (
                            <button className={classes.Order} key={key}>
                                <div className={classes.OrderHeader}
                                    onClick={() => { handleOrderClick(key) }}>
                                    <div className={classes.OrderStatus}>
                                        <CustomizedSteppers status={item.status} />
                                    </div>
                                    <div className={classes.OrderInfo}>
                                        ID: {item._id}
                                    </div>
                                    <div className={classes.OrderInfo}>
                                        Date: {convertDay(item.updatedAt)}
                                    </div>
                                    {item.isPayed === true ?
                                        <div className={classes.OrderInfo}>payment : paypal</div>
                                        :
                                        <div className={classes.OrderInfo}>payment : ship cod</div>
                                    }
                                    {item.status == 1 && item.isPayed != true &&
                                        <div className={classes.OrderCancel}
                                            onClick={() => handleCancel(item._id)}>cancel order</div>
                                    }
                                </div>
                                {item.products.map((item1, index1) => {
                                    return <div key={index1}>
                                        {dataProcessClick == index1 &&
                                            <div>
                                                {dataProcessClick == index1 &&
                                                    <div className={classes.OrderProduct} >
                                                        <div className={classes.ProductImageContainer} >
                                                            <img src={item1.img} className={classes.ProductImage} />
                                                        </div>
                                                        <div className={classes.ProductDetail}>
                                                            <p className={classes.ProductName}> {item1.name}</p>
                                                            <div className={classes.Price} >{item1.price.toLocaleString()} Đ</div>
                                                            <div >
                                                                <div >
                                                                    size: {item1.size}
                                                                </div>
                                                                <div >
                                                                    qty: {item1.quantity}
                                                                </div>
                                                                <div >
                                                                    color: {item1.color}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                })}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
  );
};

export default UserOrder;
