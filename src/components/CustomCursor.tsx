import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    const speed = 0.1;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const dx = mouseX - followerX;
      const dy = mouseY - followerY;
      followerX += dx * speed;
      followerY += dy * speed;

      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0)`;
      }
      if (follower) {
        follower.style.transform = `translate3d(${followerX - 16}px, ${followerY - 16}px, 0)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-white rounded-full pointer-events-none z-50"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border border-white rounded-full pointer-events-none z-50"
        style={{ mixBlendMode: 'difference', transition: 'transform 0.1s ease-out' }}
      />
    </>
  );
}
