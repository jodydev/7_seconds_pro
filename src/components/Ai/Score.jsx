// import { useState, useEffect } from "react";

// export default function Score({ score }) {
//   const [animatedValue, setAnimatedValue] = useState(0);

//   useEffect(() => {
//     const calculateIncrement = () => Math.ceil((score - animatedValue) / 10);
//     const interval = setInterval(() => {
//       setAnimatedValue((prevScore) => prevScore + calculateIncrement());
//     }, 50);

//     return () => clearInterval(interval);
//   }, [score, animatedValue]);

//   const progressBar = (value, gradient) => {
//     //! value is the percentage of the score
//     const radius = 65;
//     const score = (Math.PI * radius * value) / 100;

//     return (
//       <svg width="200" height="120">
//         <circle
//           cx="100"
//           cy="100"
//           r={radius}
//           fill="none"
//           strokeWidth="25"
//           strokeLinecap="round"
//           strokeDashoffset={-1 * Math.PI * radius}
//           strokeDasharray={`${score} 10000`}
//           stroke={gradient ? "url(#score-gradient)" : "#e5e5e5"}
//         ></circle>
//         {gradient && (
//           <defs>
//             <linearGradient id="score-gradient">
//               <stop offset="0%" stopColor="red" />
//               <stop offset="25%" stopColor="orange" />
//               <stop offset="100%" stopColor="green" />
//             </linearGradient>
//           </defs>
//         )}
//       </svg>
//     );
//   };

//   return (
//     <div className="score-wrap">
//       <div className="score">
//         <div className="score-bar">
//           <div className="score-circle">{progressBar(animatedValue, true)}</div>
//         </div>

//         <div className="score-value">
//           <div className="font-semibold">{score}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
