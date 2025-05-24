import { Link } from 'react-router';

import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

export function TheHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-8 border-b px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            className="h-0 sm:h-14"
            src="/seoul-cinema-logo.svg"
            alt="seoul cinema logo"
          />
          <img
            className="h-0 max-sm:h-14"
            src="/seoul-cinema-favicon.svg"
            alt="seoul cinema favicon"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/join">Join</Link>
        </Button>
        <div>
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </header>
  );
}
