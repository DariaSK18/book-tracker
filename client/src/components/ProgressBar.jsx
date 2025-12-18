export default function ProgressBar({
  value = 0,
  size = 80,
  strokeWidth = 7,
  color = "#2fb9dc",
  bg = "#bdbdbdff",
  children
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={bg}
        strokeWidth={strokeWidth}
        fill="none"
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 0.5s ease",
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%"
        }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
      >
        {children}
      </text>
    </svg>
  );
}
