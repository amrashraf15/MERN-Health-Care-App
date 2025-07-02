import { specialityData } from '../assets/assets_frontend/assets.js';
import { Link } from 'react-router-dom';

const Speciality = () => {
  return (
    <div id="speciality" className="flex flex-col gap-6 py-10 items-center">
      <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center">Find By Speciality</h1>
      <p className="text-sm text-center max-w-xl">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      {/* Speciality Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
        {specialityData.map((s) => (
          <Link
            to={`/doctors/${s.speciality}`}
            key={s.speciality}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
          >
            <img
              src={s.image}
              alt={s.speciality}
              className="w-24 h-24 object-contain"
            />
            <p className="mt-2 font-medium">{s.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
