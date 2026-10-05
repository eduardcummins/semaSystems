export function Logo({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size * 0.83} viewBox="180 135 825 680" fill="currentColor" role="img" aria-label="Sema Systems">
      <path d="M207 347C207 250 380 190 580 190C650 190 690 170 699 142L997 142C990 240 850 298 595 298C530 298 490 320 485 347Z" />
      <path d="M207 373L485 373C490 400 530 422 595 422C850 422 985 480 986 579L690 579C680 548 650 530 580 528C380 525 207 470 207 373Z" />
      <path d="M690 605L986 605C980 700 850 760 595 760C530 760 490 780 466 810L187 810C190 710 380 652 580 652C650 652 680 635 690 605Z" />
    </svg>
  );
}
