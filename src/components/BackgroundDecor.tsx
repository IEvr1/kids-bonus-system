const DECORATIONS = [
  { emoji: '♥', top: '8%', left: '5%', size: '1.8rem', delay: '0s', duration: '6s' },
  { emoji: '⭐', top: '15%', right: '8%', size: '1.5rem', delay: '1s', duration: '7s' },
  { emoji: '🐰', top: '70%', left: '3%', size: '2rem', delay: '2s', duration: '8s' },
  { emoji: '♥', top: '85%', right: '12%', size: '1.4rem', delay: '0.5s', duration: '5.5s' },
  { emoji: '🦊', top: '40%', left: '2%', size: '1.8rem', delay: '1.5s', duration: '7.5s' },
  { emoji: '⭐', top: '55%', right: '4%', size: '1.6rem', delay: '2.5s', duration: '6.5s' },
  { emoji: '🦁', top: '25%', right: '3%', size: '2rem', delay: '3s', duration: '8s' },
  { emoji: '♥', top: '60%', left: '10%', size: '1.2rem', delay: '1.2s', duration: '5s' },
  { emoji: '🐻', top: '10%', left: '45%', size: '1.5rem', delay: '0.8s', duration: '7s' },
  { emoji: '⭐', top: '78%', left: '40%', size: '1.3rem', delay: '2.2s', duration: '6s' },
  { emoji: '🐱', top: '35%', right: '15%', size: '1.7rem', delay: '1.8s', duration: '7.2s' },
  { emoji: '♥', top: '48%', left: '85%', size: '1.5rem', delay: '0.3s', duration: '5.8s' },
];

export default function BackgroundDecor() {
  return (
    <div className="background-decor" aria-hidden="true">
      {DECORATIONS.map((item, index) => (
        <span
          key={index}
          className="background-decor__item"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            fontSize: item.size,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
