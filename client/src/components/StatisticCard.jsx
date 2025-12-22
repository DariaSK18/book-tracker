import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faListOl,
  faCalendarDay,
  faTrophy,
  faRocket,
  faGauge,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

const iconsMap = {
  pagesRead: faBook,
  totalTime: faClock,
  booksRead: faListOl,
  totalReadingDays: faCalendarDay,
  bestDayPages: faTrophy,
  bestDayMinutes: faRocket,
  readingSpeed: faGauge,
  longestStreak: faFire,
};

const labelsMap = {
  pagesRead: "Pages Read",
  totalTime: "Total Time (min)",
  booksRead: "Books Read",
  totalReadingDays: "Reading Days",
  bestDayPages: "Best Day Pages",
  bestDayMinutes: "Best Day Minutes",
  readingSpeed: "Reading Speed",
  longestStreak: "Longest Streak",
};

const valuesMap = {
  pagesRead: "pages",
  totalTime: "minutes",
  booksRead: "books",
  totalReadingDays: "days",
  bestDayPages: "pages",
  bestDayMinutes: "minutes",
  readingSpeed: "pages/h",
  longestStreak: "days",
};

export default function StatisticCard({ data }) {
    // console.log('data', data);
    
  return (
    <div className="statistic__statistic-card statistic-card">
      {Object.keys(data).map((key) => (
        <div className="statistic-card__item" key={key}>
          <div className="statistic-card__icon">
            <FontAwesomeIcon icon={iconsMap[key]} size="2x" />
          </div>
          <div className="statistic-card__text">{labelsMap[key]}</div>
          <div className="statistic-card__values"><span className="statistic-card__nums">{data[key]}</span> {valuesMap[key]}</div>
        </div>
      ))}
    </div>
  );
}
