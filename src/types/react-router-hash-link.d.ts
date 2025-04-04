declare module 'react-router-hash-link' {
  import { NavLinkProps } from 'react-router-dom';
  
  interface HashLinkProps extends NavLinkProps {
    scroll?: (element: HTMLElement) => void;
  }
  
  export const HashLink: React.FC<HashLinkProps>;
  export const NavHashLink: React.FC<HashLinkProps>;
} 