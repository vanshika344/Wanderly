import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/landing");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-[#F8F4EF]">
      <div className="text-center">
        <h1 className="text-5xl font-serif text-[#5D4A66]">Wanderly</h1>
        <p className="mt-4 text-gray-600">Your AI Travel Diary</p>
      </div>
    </div>
  );
}