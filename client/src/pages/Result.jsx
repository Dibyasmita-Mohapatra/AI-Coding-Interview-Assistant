import axios from "axios";

const Result = () => {

  const downloadReport = async () => {

    try {

      const response =
        await axios.post(
          "https://ai-coding-interview-assistant-1.onrender.com/api/report/generate",
          {
            type: "Coding Interview",
            score: 92,
            feedback:
              "Excellent problem solving and coding skills."
          },
          {
            responseType: "blob",
          }
        );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "InterviewReport.pdf"
      );

      document.body.appendChild(link);

      link.click();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">

      <h1 className="text-5xl font-bold mb-8">
        Interview Complete
      </h1>

      <button
        onClick={downloadReport}
        className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl"
      >
        Download Report
      </button>

    </div>

  );
};

export default Result;
