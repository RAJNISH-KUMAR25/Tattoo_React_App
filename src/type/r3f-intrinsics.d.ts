import type * as THREE from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      backdropMat: {
        ref?: React.Ref<any>;
        uTime?: number;
        uColor?: THREE.Color | string;
      } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      wavyMat: {
        ref?: React.Ref<any>;
        uTime?: number;
        uColor?: THREE.Color | string;
        uNoiseScale?: number;
      } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {};
