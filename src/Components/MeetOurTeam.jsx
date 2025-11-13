import { Facebook, Mail, MessageCircle, Phone } from "lucide-react";
import team1 from "../assets/team_01.jpg"
import team2 from "../assets/team_02.jpg"
import team4 from "../assets/team2-4.png"
import team6 from "../assets/team2-6.png"

const teamMembers = [
  {
    name: "Steve Bruce",
    role: "Plumber",
    img: team1,
  },
  {
    name: "Denis Irwin",
    role: "Plumber",
    img: team2,
  },
  {
    name: "Andy Cole",
    role: "Electrician",
    img: team4,
  },
  {
    name: "Peter Electrician",
    role: "Plumber",
    img: team6,
  },
];

export default function MeetOurTeam() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">
          Meet our <span className="text-blue-500">team</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-72 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900">
                  <span className="text-blue-500">
                    {member.name.split(" ")[0]}
                  </span>{" "}
                  {member.name.split(" ")[1]}
                </h3>
                <p className="text-gray-500 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4 text-blue-500">
                  <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-700 transition" />
                  <Mail className="w-5 h-5 cursor-pointer hover:text-blue-700 transition" />
                  <MessageCircle className="w-5 h-5 cursor-pointer hover:text-blue-700 transition" />
                  <Phone className="w-5 h-5 cursor-pointer hover:text-blue-700 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
