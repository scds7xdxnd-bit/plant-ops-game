import type { ReactNode } from "react";

interface ScreenHeaderProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

export function ScreenHeader({ eyebrow, title, children }: ScreenHeaderProps) {
  return (
    <header className="screen-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      {children && <div className="screen-actions">{children}</div>}
    </header>
  );
}
