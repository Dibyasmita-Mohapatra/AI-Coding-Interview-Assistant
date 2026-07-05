import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeBuilder = () => {

  const [template, setTemplate] =
    useState("modern");

  const [photo, setPhoto] =
    useState(null);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    address: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    certifications: "",
    achievements: "",
    languages: "",
  });

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };

  const handlePhoto = (e) => {

    const file = e.target.files[0];

    if (file) {

      setPhoto(
        URL.createObjectURL(file)
      );

    }

  };

  const downloadPDF = async () => {
    try {

      console.log("Function Started");

      const element =
        document.getElementById("resume-preview");

      if (!element) {
        alert("Resume Preview Not Found");
        return;
      }

      const canvas = await html2canvas(
        element,
        {
          scale: 2,
          useCORS: true,
          logging: true,
          backgroundColor: "#ffffff",
          allowTaint: true,
        }
      );

      console.log("Canvas Created");

      const imgData =
        canvas.toDataURL("image/jpeg", 1.0);

      const pdf =
        new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        (canvas.height * pageWidth) /
        canvas.width;

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pageWidth,
        pageHeight
      );

      pdf.save(
        `${data.name || "resume"}.pdf`
      );

      console.log("PDF Downloaded");

    } catch (err) {

      console.error(err);

      alert(
        "PDF Error: " + err.message
      );

    }
  };

  return (

    <div className="min-h-screen bg-black p-6">

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT SIDE */}

        <div className="bg-gray-900 p-6 rounded-2xl">

          <h1 className="text-4xl font-bold text-white mb-6">
            Resume Builder
          </h1>

          <select
            value={template}
            onChange={(e) =>
              setTemplate(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-black text-white mb-4"
          >

            <option value="modern">
              Modern ATS
            </option>

            <option value="google">
              Google Style
            </option>

            <option value="fresher">
              Fresher Resume
            </option>

          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="w-full p-3 rounded-xl bg-black text-white mb-4"
          />

          <div className="space-y-4">

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <input
              name="linkedin"
              placeholder="LinkedIn URL"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <input
              name="github"
              placeholder="GitHub URL"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <input
              name="portfolio"
              placeholder="Portfolio Website"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <textarea
              name="summary"
              placeholder="Professional Summary"
              rows="4"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <textarea
              name="skills"
              placeholder="React, Node.js, MongoDB"
              rows="3"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <textarea
              name="education"
              placeholder="Education"
              rows="4"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <textarea
              name="experience"
              placeholder="Experience"
              rows="4"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <textarea
              name="projects"
              placeholder="Projects"
              rows="4"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <textarea
              name="certifications"
              placeholder="Certifications"
              rows="3"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <textarea
              name="achievements"
              placeholder="Achievements"
              rows="3"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <textarea
              name="languages"
              placeholder="Languages"
              rows="2"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black text-white"
            />

            <button
              onClick={() => {
                console.log("BUTTON CLICKED");
                downloadPDF();
              }}
              className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-white font-semibold"
            >
              Download Resume PDF
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div
          id="resume-preview"
          className="bg-white text-black shadow-xl"
          style={{
            minHeight: "1123px"
          }}
        >

          {/* MODERN ATS */}

          {template === "modern" && (

            <div className="p-8">

              <div className="flex items-center gap-6">

                {photo && (

                  <img
                    src={photo}
                    alt=""
                    className="w-28 h-28 rounded-full object-cover"
                  />

                )}

                <div>

                  <h1 className="text-4xl font-bold">
                    {data.name || "Your Name"}
                  </h1>

                  <p>
                    {data.email}
                  </p>

                  <p>
                    {data.phone}
                  </p>

                  <p>{data.address}</p>
                  <p>{data.linkedin}</p>
                  <p>{data.github}</p>
                  <p>{data.portfolio}</p>

                </div>

              </div>

              <hr className="my-6" />

              <h2 className="font-bold text-xl">
                Professional Summary
              </h2>

              <p className="mt-2 whitespace-pre-wrap">
                {data.summary}
              </p>

              <h2 className="font-bold text-xl mt-6">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2 mt-2">

                {data.skills &&
                  data.skills
                    .split(",")
                  .filter(Boolean)
                  .map((skill, index) => (

                    <span
                      key={index}
                      style={{
                        backgroundColor: "#e5e7eb",
                        padding: "4px 12px",
                        borderRadius: "999px"
                      }}
                    >
                      {skill.trim()}
                    </span>

                  ))}

              </div>

              <h2 className="font-bold text-xl mt-6">
                Education
              </h2>

              <p className="mt-2 whitespace-pre-wrap">
                {data.education}
              </p>

              {data.experience && (
                <>
                  <h2 className="font-bold text-xl mt-6">
                    Experience
                  </h2>

                  <p className="mt-2 whitespace-pre-wrap">
                    {data.experience}
                  </p>
                </>
              )}

              {data.projects && (
                <>
                  <h2 className="font-bold text-xl mt-6">
                    Projects
                  </h2>

                  <p className="mt-2 whitespace-pre-wrap">
                    {data.projects}
                  </p>
                </>
              )}

              {data.certifications && (
                <>
                  <h2 className="font-bold text-xl mt-6">
                    Certifications
                  </h2>

                  <p className="mt-2 whitespace-pre-wrap">
                    {data.certifications}
                  </p>
                </>
              )}

              {data.achievements && (
                <>
                  <h2 className="font-bold text-xl mt-6">
                    Achievements
                  </h2>

                  <p className="mt-2 whitespace-pre-wrap">
                    {data.achievements}
                  </p>
                </>
              )}

              {data.languages && (
                <>
                  <h2 className="font-bold text-xl mt-6">
                    Languages
                  </h2>

                  <p className="mt-2 whitespace-pre-wrap">
                    {data.languages}
                  </p>
                </>
              )}

            </div>

          )}

          {/* GOOGLE */}

          {template === "google" && (

            <div className="p-10">

              <div className="text-center">

                {photo && (

                  <img
                    src={photo}
                    alt=""
                    className="w-28 h-28 rounded-full object-cover mx-auto mb-4"
                  />

                )}

                <h1 className="text-5xl font-bold">
                  {data.name}
                </h1>

                <p>{data.email}</p>

                <p>{data.phone}</p>

                <p>{data.address}</p>
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  {data.linkedin}
                </a>
                <p>{data.github}</p>
                <p>{data.portfolio}</p>

              </div>

              <div className="mt-8">

                <h2 className="text-2xl font-bold border-b pb-2">
                  Summary
                </h2>

                <p className="mt-3">
                  {data.summary}
                </p>

              </div>

              <div className="mt-6">

                <h2 className="text-2xl font-bold border-b pb-2">
                  Skills
                </h2>

                <p className="mt-3">
                  {data.skills}
                </p>

              </div>

              <div className="mt-6">

                <h2 className="text-2xl font-bold border-b pb-2">
                  Education
                </h2>

                <p className="mt-3">
                  {data.education}
                </p>

              </div>

              <div className="mt-6">

                <h2 className="text-2xl font-bold border-b pb-2">
                  Experience
                </h2>

                <p className="mt-3">
                  {data.experience}
                </p>

                <h2 className="font-bold text-xl mt-6">
                    Projects
                </h2>
                <p className="mt-2 whitespace-pre-wrap">
                    {data.projects}
                </p>

                <h2 className="font-bold text-xl mt-6">
                  Certifications
                </h2>

                <p className="mt-2 whitespace-pre-wrap">
                  {data.certifications}
                </p>

                <h2 className="font-bold text-xl mt-6">
                  Achievements
                </h2>

                <p className="mt-2 whitespace-pre-wrap">
                  {data.achievements}
                </p>

                <h2 className="font-bold text-xl mt-6">
                  Languages
                </h2>

                <p className="mt-2 whitespace-pre-wrap">
                  {data.languages}
                </p>

              </div>

            </div>

          )}

          {/* FRESHER */}

          {template === "fresher" && (

            <div className="p-8">

              <div className="text-center">

                {photo && (

                  <img
                    src={photo}
                    alt=""
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />

                )}

                <h1 className="text-4xl font-bold">
                  {data.name}
                </h1>

                <p>{data.email}</p>

                <p>{data.phone}</p>
                <p>{data.address}</p>
                <p>{data.linkedin}</p>
                <p>{data.github}</p>
                <p>{data.portfolio}</p>

              </div>

              <div className="mt-6">

                <h2 className="text-blue-700 text-xl font-bold">
                  Career Objective
                </h2>

                <p className="mt-2">
                  {data.summary}
                </p>

              </div>

              <div className="mt-6">

                <h2 className="text-blue-700 text-xl font-bold">
                  Education
                </h2>

                <p className="mt-2">
                  {data.education}
                </p>

              </div>

              <div className="mt-6">

                <h2 className="text-blue-700 text-xl font-bold">
                  Skills
                </h2>

                <p className="mt-2">
                  {data.skills}
                </p>

              </div>

              <div className="mt-6">

                <h2 className="text-blue-700 text-xl font-bold">
                  Projects
                </h2>

                <p className="mt-2">
                  {data.projects}
                </p>

                <h2 className="font-bold text-xl mt-6">
                  Certifications
                </h2>

                <p className="mt-2 whitespace-pre-wrap">
                  {data.certifications}
                </p>

                <h2 className="font-bold text-xl mt-6">
                  Achievements
                </h2>

                <p className="mt-2 whitespace-pre-wrap">
                  {data.achievements}
                </p>

                <h2 className="font-bold text-xl mt-6">
                  Languages
                </h2>

                <p className="mt-2 whitespace-pre-wrap">
                  {data.languages}
                </p>

              </div>



            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default ResumeBuilder;