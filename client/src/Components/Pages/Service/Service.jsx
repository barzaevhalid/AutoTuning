import "./Service.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadService } from "../../../redux/features/reducerService";
import { Link } from "react-router-dom";
import { chooseService } from "../../../redux/features/reducerCart";

const Service = () => {
  const services = useSelector((state) => state.serviceReducer.service);

  const cart = useSelector((state) => state.cartsReducer.carts);
  const token = useSelector((state) => state.application.token);

  // useEffect(() => {
  //     dispatch(userLoad(token))
  // }, [])

  // const user = useSelector(state => state.profilfeReducer.user)

  // console.log(user);
  // const userId = user

  // console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadService());
  }, [dispatch]);

  const handleChooseService = (serviceId) => {
    token ? dispatch(chooseService(serviceId)) : alert("Авторизируйтесь");
  };

  return (
    <div className="service-main">
      <div className="service_container">
        <h1>Услуги</h1>
        <div className="service_services">
          {services.map((item) => {
            return (
              <div className="service_cart">
                <div className="service_image">
                  <img src={item.img} />
                </div>
                <div className="service_name">{item.name}</div>
                <Link
                  to={ token ? "/masters" : ""}
                  className="service_btn"
                  onClick={() => handleChooseService(item._id)}
                >
                  Выбрать
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Service;
