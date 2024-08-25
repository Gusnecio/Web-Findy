import logoFindy from "/logo/LOGOFINDY.png";
import iconInicio from "/icons/home.svg";
import iconBuscar from "/icons/search.svg";
import iconNoti from "/icons/heart.svg";
import iconMensaje from "/icons/mensaje.svg";
const SideBar = () => {
  return (
    <nav className="flex fixed z-10 ml-3 h-[100vh] items-center w-[250px] justify-center border-r-2 border-gray-300">
      <div className="flex flex-col">
        <div className="mb-10">
          <img src={logoFindy} alt="LogoFIndy" />
        </div>
        <ul className="flex flex-col lg:w-[38%] space-y-11 font-balsamiq lg:text-[20px]">
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img className="mr-3 " src={iconInicio} alt="iconInicio" />
            Inicio
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img className="mr-3" src={iconBuscar} alt="iconBuscar" />
            Búsqueda
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img className="mr-3" src={iconNoti} alt="iconBuscar" />{" "}
            Notificaciones
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img className="mr-3" src={iconMensaje} alt="iconBuscar" />
            Mensajes
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img className="mr-3" src={iconNoti} alt="iconBuscar" /> Perfil
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
