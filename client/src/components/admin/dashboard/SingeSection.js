import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SingeSection = ({ icon, name, length, link }) => {
  return (
    <div
      className={`products relative bg-sky-500 opacity-95  text-gray-100 pt-6 text-center`}
    >
      <span className={`text-4xl block font-bold`}>{length}</span>
      <span className={`text-md block font-medium py-5`}>{name}</span>
      <FontAwesomeIcon
        icon={icon}
        className="absolute top-0 start-24 text-gray-600 opacity-20 -z-10"
        size="7x"
      />
      <Link to={`/admin/${link}`} className={`bg-sky-600 py-2 block`}>
        More info
        <FontAwesomeIcon className={`ms-2`} icon={faArrowAltCircleRight} />
      </Link>
    </div>
  );
};

export default SingeSection;
