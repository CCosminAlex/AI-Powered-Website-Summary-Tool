import { useState } from "react";
import { GetSummary } from "./api/getSummary";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [inputStyle, setInputStyle] = useState(
    "w-full mt-5 bg-white border rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
  );
  const validateUrl = (url: string) => {
    const protocols = ["http://", "https://", "ftp://"];
    let valid = false;
    for (const protocol of protocols) {
      if (url.startsWith(protocol)) {
        const domain = url.slice(protocol.length).split("/")[0];
        if (domain.includes(".")) {
          valid = true;
          break;
        }
      }
    }
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (url == "" || !validateUrl(url)) {
      setInputStyle(
        "w-full mt-5  bg-white border rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 border-2 border-red-500"
      );
      return;
    } else {
      setInputStyle(
        "w-full mt-5  bg-white border rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      );
      setSpinner(false);
    }
    const result = await GetSummary(url);
    setSummary(result.summary);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
      />
      <div className="flex flex-col bg-gray-100 min-h-screen">
        <div className="bg-gray-100 text-center text-4xl text-black flex flex-col mt-40">
          <h1>AI-Powered Website Summary Tool</h1>
          <i className="text-8xl las la-robot"></i>
        </div>
        <div className="flex flex-col justify-center items-center h-full bg-gray-100 gap-10">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label className="text-gray-600 text-lg mb-4 m-10">
              Enter URL <i className="las la-link"></i> to summarize:
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={inputStyle}
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            >
              Submit
            </button>
          </form>
          {summary ? (
            <div className="bg-gray-200 text-center justify-center items-center align-middle ">
              <p className="text-gray-700 text-lg font-medium ">
                Summary: {summary}
              </p>
            </div>
          ) : (
            <div role="status" className="m-20" hidden={spinner}>
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
