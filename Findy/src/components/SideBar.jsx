import logoFindy from "/logo/LOGOFINDY.png";
import iconInicio from "/icons/home.svg";
import iconBuscar from "/icons/search.svg";
import iconNoti from "/icons/heart.svg";
import iconMensaje from "/icons/mensaje.svg";
import iconCreate from "/icons/create.svg";
import iconHistoria from "/histories/JennieKim.png";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <nav className="lg:flex fixed z-10 lg:w-[250px] lg:p-0 p-2 w-full lg:top-0 lg:left-0 bottom-0 lg:h-[100vh] lg:ml-3 lg:items-center lg:justify-center border-r-2 border-gray-300  bg-nav-bg bg-cover bg-no-repeat bg-bottom lg:rounded-b-none rounded-b-[30px] lg:bg-none">
      <div className="lg:flex lg:flex-col">
        <div className="mb-10 lg:flex hidden">
          <img src={logoFindy} alt="LogoFIndy" />
        </div>
        <ul className="flex lg:flex-col lg:w-[38%] lg:space-y-11 font-balsamiq lg:text-[20px] justify-between lg:bg-none ">
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <Link to="/layout" className="flex items-center">
              <img
                className="lg:mr-3 lg:ml-0 ml-3 lg:invert-0 invert"
                src={iconInicio}
                alt="iconInicio"
              />
              <span className="lg:flex hidden">Inicio</span>
            </Link>
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img
              className="lg:mr-3 lg:invert-0 invert"
              src={iconBuscar}
              alt="iconBuscar"
            />
            <span className="lg:flex hidden">Busqueda</span>
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center justify-center">
            <div className="lg:flex lg:relative absolute lg:top-0 top-[-30px] lg:bg-transparent bg-pastel lg:rounded-none rounded-full flex z-10 lg:w-[85px] lg:h-[24px] w-[65px] h-[65px] lg:justify-normal justify-center lg:left-0 left-[42%]">
              <img
                className="lg:mr-3 lg:invert-0 invert lg:w-[24px] w-10"
                src={iconCreate}
                alt="iconCreate"
              />
              <span className="lg:flex hidden ">Crear</span>
            </div>
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img
              className="lg:mr-3 lg:invert-0 invert"
              src={iconNoti}
              alt="iconNotificaciones"
            />
            <span className="lg:flex hidden">Notificaciones</span>
          </li>
          <li className="lg:flex hidden cursor-pointer hover:text-pastel items-center">
            <img className="lg:mr-3" src={iconMensaje} alt="iconMensaje" />
            Mensajes
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img
              className="lg:mr-3 mr-3 w-10"
              src={iconHistoria}
              alt="iconPerfil"
            />
            <span className="lg:flex hidden">Perfil</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
