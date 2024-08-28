import { useState } from "react";
import logoFindy from "/logo/LOGOFINDY.png";
import iconInicio from "/icons/home.svg";
import iconBuscar from "/icons/search.svg";
import iconNoti from "/icons/heart.svg";
import iconMensaje from "/icons/mensaje.svg";
import iconCreate from "/icons/create.svg";
import Modal from "./Modal"; // Asegúrate de importar el componente Modal

const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="lg:flex fixed z-10 lg:w-[250px] w-full lg:top-0 lg:left-0 bottom-0 lg:h-[100vh] lg:ml-3 lg:items-center lg:justify-center border-r-2 border-gray-300 lg:bg-white bg-pastel lg:rounded-b-none rounded-b-[25%]">
      <div className="lg:flex lg:flex-col">
        <div className="mb-10 lg:flex hidden">
          <img src={logoFindy} alt="LogoFIndy" />
        </div>
        <ul className="flex lg:flex-col lg:w-[38%] lg:space-y-11 font-balsamiq lg:text-[20px] justify-around lg:bg-none ">
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img
              className="mr-3 lg:invert-0 invert"
              src={iconInicio}
              alt="iconInicio"
            />
            <span className="lg:flex hidden">Inicio</span>
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img
              className="mr-3 lg:invert-0 invert"
              src={iconBuscar}
              alt="iconBuscar"
            />
            <span className="lg:flex hidden">Busqueda</span>
          </li>
          <li
            className="flex cursor-pointer hover:text-pastel items-center"
            onClick={handleCreateClick}
          >
            <img
              className="mr-3 lg:mb-0 mb-10 lg:invert-0 invert"
              src={iconCreate}
              alt="iconCreate"
            />
            <span className="lg:flex hidden">Crear</span>
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img
              className="mr-3 lg:invert-0 invert"
              src={iconNoti}
              alt="iconNotificaciones"
            />
            <span className="lg:flex hidden">Notificaciones</span>
          </li>
          <li className="lg:flex hidden cursor-pointer hover:text-pastel items-center">
            <img className="mr-3" src={iconMensaje} alt="iconMensaje" />
            Mensajes
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img
              className="mr-3 lg:invert-0 invert"
              src={iconNoti}
              alt="iconPerfil"
            />
            <span className="lg:flex hidden">Perfil</span>
          </li>
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </nav>
  );
};

export default SideBar;
