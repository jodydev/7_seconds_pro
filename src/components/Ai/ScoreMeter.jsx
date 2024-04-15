import { useState, useEffect } from "react";

const ScoreMeter = ({ score }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const calculateIncrement = () => Math.ceil((score - animatedValue) / 10);
    const interval = setInterval(() => {
      setAnimatedValue((prevScore) => prevScore + calculateIncrement());
    }, 50);

    return () => clearInterval(interval);
  }, [score, animatedValue]);

  const progressBar = (value, gradient) => {
    //! value is the percentage of the score
    const radius = 65;
    const score = (Math.PI * radius * value) / 100;

    return (
      <svg width="200" height="120">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth="25"
          strokeLinecap="round"
          strokeDashoffset={-1 * Math.PI * radius}
          strokeDasharray={`${score} 10000`}
          stroke={gradient ? "url(#score-gradient)" : "#e5e5e5"}
        ></circle>
        {gradient && (
          <defs>
            <linearGradient id="score-gradient">
              <stop offset="0%" stopColor="red" />
              <stop offset="25%" stopColor="orange" />
              <stop offset="100%" stopColor="green" />
            </linearGradient>
          </defs>
        )}
      </svg>
    );
  };

  return (
    <div className="container mt-5 px-10 py-5">
      <div className="grid grid-cols-2 gap-4">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          <li className="mb-5 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
              April 2024
            </time>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Send cv to Ai for Front End Developer at Apple.inc
            </h3>
          </li>
          <li className="mb-5 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
              March 2024
            </time>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Send cv to Ai for Front End Developer at Apple.inc
            </h3>
          </li>
        </ol>

        <div className="score-wrap">
          <div className="score">
            <div className="score-bar">
              <div className="score-circle">
                {progressBar(animatedValue, true)}
              </div>
            </div>

            <div className="score-value">
              <div className="font-semibold">Score</div>
              <div className="score-number">{Math.round(animatedValue)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreMeter;
