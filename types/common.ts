export type NextImageSrc =
    | {
          src: string;
          height: number;
          width: number;
          blurDataURL?: string;
      }
    | string;
