import logoFindy from "/logo/LOGOFINDY.png";
const NavBar = () => {
  return (
    <nav>
      <div>
        <div>
          <img src={logoFindy} alt="LogoFIndy" />
        </div>
        <ul>
          <li>Inicio</li>
          <li>Búsqueda</li>
          <li>Notificaciones</li>
          <li>Mensajes</li>
          <li>Perfil</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
