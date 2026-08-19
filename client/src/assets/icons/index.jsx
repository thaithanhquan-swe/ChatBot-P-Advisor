import { useId } from 'react';

export const AppleIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
  </svg>
);

export const GooglePlayIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
    <path fill='#00C853' d='M3.18 23.76c.3.17.64.22.99.14l12.6-7.28-2.7-2.7-10.89 9.84z' />
    <path
      fill='#00B0FF'
      d='M.47 1.7C.17 2.04 0 2.56 0 3.22v17.56c0 .66.17 1.18.47 1.52l.08.08 9.83-9.83v-.23L.55 1.62l-.08.08z'
    />
    <path
      fill='#FFD600'
      d='M20.37 10.35l-2.56-1.48-2.98 2.97 2.98 2.97 2.56-1.48c.73-.42.73-1.1 0-1.52z'
    />
    <path fill='#FF3D00' d='M3.18.24L15.78 7.52l-2.7 2.7L2.19.38c.35-.09.69-.04.99.14z' />
  </svg>
);

export const FacebookIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
  </svg>
);

export const InstagramIcon = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
    <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
  </svg>
);

export const TwitterIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
    <path
      fill='currentColor'
      d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
    />
  </svg>
);

export const TikTokIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
    <path
      fill='#69C9D0'
      d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5
         2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01
         a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34
         6.34 6.34 0 0 0 6.33-6.34V8.95a8.16 8.16 0 0 0 4.77 1.52V7.01
         a4.85 4.85 0 0 1-1-.32z'
      style={{ transform: 'translate(-1px, 1px)' }}
    />
    <path
      fill='#EE1D52'
      d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5
         2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01
         a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34
         6.34 6.34 0 0 0 6.33-6.34V8.95a8.16 8.16 0 0 0 4.77 1.52V7.01
         a4.85 4.85 0 0 1-1-.32z'
      style={{ transform: 'translate(1px, -1px)' }}
    />
    <path
      fill='currentColor'
      d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5
         2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01
         a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34
         6.34 6.34 0 0 0 6.33-6.34V8.95a8.16 8.16 0 0 0 4.77 1.52V7.01
         a4.85 4.85 0 0 1-1-.32z'
    />
  </svg>
);

export const YoutubeIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
    <path
      fill='currentColor'
      d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545
         s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814
         a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505
         a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z'
    />
    <path fill='currentColor' d='M9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
  </svg>
);

// ─── Payment Icons ────────────────────────────────────────────────────────────

export const VisaIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size * 0.63} viewBox='0 0 780 500' fill='none' {...props}>
    <rect width='780' height='500' rx='40' fill='#1A1F71' />
    <path
      fill='#F7B600'
      d='M293.2 348.7l33.4-195.6h53.4l-33.4 195.6h-53.4z
         M524.3 157.9c-10.6-3.9-27.2-8.1-47.9-8.1-52.8 0-90 26.5-90.3 64.5
         -.3 28.1 26.5 43.7 46.7 53.1 20.7 9.6 27.7 15.7 27.6 24.3
         -.1 13.1-16.6 19.1-31.9 19.1-21.3 0-32.7-2.9-50.2-10.1l-6.9-3.1
         -7.5 43.7c12.5 5.4 35.5 10.1 59.4 10.3 56.1 0 92.5-26.2 92.9-66.8
         .2-22.3-14-39.2-44.6-53.2-18.6-9-30-15-29.9-24.2 0-8.1 9.7-16.8 30.5-16.8
         17.4-.3 30 3.5 39.8 7.5l4.8 2.2 7.5-42.4z
         M661.3 153.1h-41.3c-12.8 0-22.4 3.5-28 16.3l-79.4 179.3h56.1
         s9.2-24.1 11.3-29.4c6.1 0 60.7.1 68.5.1 1.6 6.8 6.5 29.3 6.5 29.3h49.6
         L661.3 153.1zm-65.7 126.6c4.4-11.2 21.3-54.7 21.3-54.7
         -.3.5 4.4-11.3 7.1-18.6l3.6 16.8s10.2 46.5 12.4 56.5h-44.4z
         M236.9 153.1l-52.3 133.5-5.6-27.1c-9.7-31.1-40-64.8-73.8-81.7l47.9 170.8 56.5-.1
         84.1-195.4h-56.8z'
    />
    <path
      fill='#F7B600'
      d='M131.5 153.1H46.6l-.7 4c66 15.9 109.7 54.3 127.8 100.4l-18.4-88
         c-3.2-12.5-12.6-16.1-23.8-16.4z'
    />
  </svg>
);

export const MastercardIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size * 0.63} viewBox='0 0 780 500' fill='none' {...props}>
    <rect width='780' height='500' rx='40' fill='#252525' />
    <circle cx='300' cy='250' r='150' fill='#EB001B' />
    <circle cx='480' cy='250' r='150' fill='#F79E1B' />
    <path fill='#FF5F00' d='M390 132.7a150 150 0 0 1 0 234.6 150 150 0 0 1 0-234.6z' />
  </svg>
);

export const PaypalIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size * 0.63} viewBox='0 0 780 500' fill='none' {...props}>
    <rect width='780' height='500' rx='40' fill='#F0F0F0' />
    <path
      fill='#003087'
      d='M322.4 134h105.2c55.1 0 75.8 27.6 72.4 68.2-5.2 62.2-42.5 96.6-96.8 96.6H376
         c-7.3 0-12.1 4.8-14 15.1l-11.8 74.8c-.8 5-3.6 7.9-7.9 8.3H280
         c-6.5 0-8.8-5-7.2-14.8l43.2-240.5c1.9-10.5 7.1-7.7 6.4-7.7z'
    />
    <path
      fill='#0070E0'
      d='M508 175.7c0 56.1-37.8 105-109.8 105h-30.5c-8.8 0-14.6 5.8-16.9 18.2
         l-15 95c-1 6-4.3 9.5-9.5 9.9h-56c-7.8 0-10.6-6-8.6-17.8l51.9-289
         c2.3-12.6 8.5-9.2 7.7-9.2h126.3C500.6 88 508 124.9 508 175.7z'
    />
    <text
      x='390'
      y='290'
      textAnchor='middle'
      fill='#003087'
      fontFamily='Arial'
      fontWeight='bold'
      fontSize='100'
    >
      Pay
    </text>
    <text
      x='510'
      y='290'
      textAnchor='middle'
      fill='#0070E0'
      fontFamily='Arial'
      fontWeight='bold'
      fontSize='100'
    >
      Pal
    </text>
  </svg>
);

export const JCBIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size * 0.63} viewBox='0 0 780 500' fill='none' {...props}>
    <rect width='780' height='500' rx='40' fill='#fff' />
    <rect x='80' y='80' width='180' height='340' rx='30' fill='#003087' />
    <rect x='300' y='80' width='180' height='340' rx='30' fill='#CC0000' />
    <rect x='520' y='80' width='180' height='340' rx='30' fill='#007B40' />
    <text
      x='170'
      y='295'
      textAnchor='middle'
      fill='white'
      fontFamily='Arial'
      fontWeight='bold'
      fontSize='120'
    >
      J
    </text>
    <text
      x='390'
      y='295'
      textAnchor='middle'
      fill='white'
      fontFamily='Arial'
      fontWeight='bold'
      fontSize='120'
    >
      C
    </text>
    <text
      x='610'
      y='295'
      textAnchor='middle'
      fill='white'
      fontFamily='Arial'
      fontWeight='bold'
      fontSize='120'
    >
      B
    </text>
  </svg>
);

export const SepayIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size * 0.63} viewBox='0 0 780 500' fill='none' {...props}>
    <rect width='780' height='500' rx='40' fill='#0A0A23' />
    <circle cx='220' cy='250' r='100' fill='none' stroke='#00C9A7' strokeWidth='28' />
    <circle cx='220' cy='250' r='55' fill='#00C9A7' opacity='0.25' />
    <circle cx='220' cy='250' r='28' fill='#00C9A7' />
    <text
      x='420'
      y='305'
      fill='#00C9A7'
      fontFamily='Arial'
      fontWeight='900'
      fontSize='140'
      letterSpacing='4'
    >
      SEPAY
    </text>
  </svg>
);

export const FireworksIcon = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <defs>
      <linearGradient id='cone' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stopColor='#F59E0B' />
        <stop offset='100%' stopColor='#EF4444' />
      </linearGradient>
    </defs>

    <path d='M3 21 L10 14 L13 17 Z' fill='url(#cone)' />

    <path d='M5.5 18.5 L8.5 15.5' stroke='#FCD34D' strokeWidth='1' strokeLinecap='round' />

    <path
      d='M10 14 Q12 11 13 17'
      stroke='#F59E0B'
      strokeWidth='1'
      fill='#FCD34D'
      strokeLinejoin='round'
    />

    <path
      d='M14 10 Q16 8 15 6'
      stroke='#3B82F6'
      strokeWidth='1.5'
      strokeLinecap='round'
      fill='none'
    />
    <path
      d='M16 12 Q18 11 19 9'
      stroke='#FF3CAC'
      strokeWidth='1.5'
      strokeLinecap='round'
      fill='none'
    />
    <path
      d='M13 8 Q14 6 13 4'
      stroke='#A855F7'
      strokeWidth='1.5'
      strokeLinecap='round'
      fill='none'
    />

    <rect x='17' y='4' width='2' height='2' rx='0.3' fill='#10B981' transform='rotate(20 18 5)' />
    <rect x='19' y='8' width='2' height='2' rx='0.3' fill='#F59E0B' transform='rotate(-15 20 9)' />
    <rect
      x='15'
      y='3'
      width='1.5'
      height='1.5'
      rx='0.3'
      fill='#EF4444'
      transform='rotate(35 15 3)'
    />
    <rect
      x='20'
      y='12'
      width='1.5'
      height='1.5'
      rx='0.3'
      fill='#06B6D4'
      transform='rotate(-30 20 12)'
    />

    <circle cx='18' cy='6' r='1' fill='#FF3CAC' />
    <circle cx='21' cy='10' r='0.8' fill='#A855F7' />
    <circle cx='16' cy='5' r='0.7' fill='#F59E0B' />
    <circle cx='20' cy='4' r='0.6' fill='#10B981' />

    <path
      d='M19 3 L19.4 4.2 L20.6 4.2 L19.7 5 L20 6.2 L19 5.5 L18 6.2 L18.3 5 L17.4 4.2 L18.6 4.2 Z'
      fill='#FCD34D'
    />
  </svg>
);

export const SendIcon = ({ size = 24, ...props }) => {
  return (
    <div className='flex items-center justify-center col-span-2'>
      <svg
        width={size}
        viewBox='0 0 680 480'
        role='img'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <title>Animated email icon purple theme</title>
        <desc>
          An envelope icon with a paper plane flying around it in a circular orbit, purple theme
        </desc>

        <style>{`
      @keyframes orbitAngle {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-8px); }
      }
      @keyframes pulse1 {
        0%, 100% { opacity: 0.25; r: 130; }
        50%       { opacity: 0.55; r: 138; }
      }
      @keyframes pulse2 {
        0%, 100% { opacity: 0.15; r: 165; }
        50%       { opacity: 0.35; r: 173; }
      }
      .envelope-group {
        animation: float 3.5s ease-in-out infinite;
        transform-origin: 340px 235px;
      }
      .pulse-ring1 { animation: pulse1 3.5s ease-in-out infinite; }
      .pulse-ring2 { animation: pulse2 3.5s ease-in-out infinite 0.5s; }
    `}</style>

        <circle cx='340' cy='235' r='200' fill='#12102b' />
        <circle
          className='pulse-ring2'
          cx='340'
          cy='235'
          r='165'
          fill='none'
          stroke='#7c3aed'
          strokeWidth='1'
        />
        <circle
          className='pulse-ring1'
          cx='340'
          cy='235'
          r='130'
          fill='none'
          stroke='#8b5cf6'
          strokeWidth='1.5'
        />
        <circle cx='340' cy='235' r='100' fill='#1a1535' />

        <g className='envelope-group'>
          <rect x='250' y='185' width='180' height='120' rx='8' fill='#3b1fa8' />
          <polygon points='250,185 340,245 430,185' fill='#4c1d95' />
          <polygon points='250,185 340,248 430,185 430,178 340,238 250,178' fill='#6d28d9' />
          <polygon points='250,185 250,305 310,245' fill='#4c1d95' />
          <polygon points='430,185 430,305 370,245' fill='#4c1d95' />

          <circle cx='307' cy='245' r='20' fill='#2e1065' stroke='#a78bfa' strokeWidth='2' />
          <text
            x='307'
            y='253'
            textAnchor='middle'
            fill='#a78bfa'
            fontFamily='sans-serif'
            fontSize='22'
            fontWeight='bold'
          >
            @
          </text>

          <rect x='345' y='232' width='55' height='36' rx='4' fill='#ede9fe' />
          <rect x='351' y='239' width='35' height='5' rx='2' fill='#a78bfa' />
          <rect x='351' y='248' width='25' height='4' rx='2' fill='#c4b5fd' />
          <rect x='351' y='256' width='30' height='4' rx='2' fill='#c4b5fd' />
        </g>

        <g id='plane-real'>
          <polygon points='0,-10 18,0 0,6' fill='white' opacity='0.95' />
          <polygon points='0,-10 -6,0 0,6' fill='#ddd6fe' opacity='0.85' />
          <polygon points='-6,0 0,6 2,2' fill='#a78bfa' opacity='0.8' />
        </g>

        <animateMotion
          xlinkHref='#plane-real'
          dur='4s'
          repeatCount='indefinite'
          path='M 340,90 A 145,145 0 1,1 339.9,90'
          rotate='auto'
        />
      </svg>
    </div>
  );
};

export const SecurityIcon = ({ size = 24, animated = true, ...props }) => {
  const id = useId().replace(/:/g, '');
  const s = size;
  const cx = s / 2,
    cy = s / 2;
  const r = s * 0.3;

  // Shield path scale theo size
  const shieldPath = `M${cx} ${s * 0.1} L${s * 0.77} ${s * 0.2} L${s * 0.77} ${s * 0.48} C${s * 0.77} ${s * 0.65} ${s * 0.64} ${s * 0.76} ${cx} ${s * 0.83} C${s * 0.36} ${s * 0.76} ${s * 0.23} ${s * 0.65} ${s * 0.23} ${s * 0.48} L${s * 0.23} ${s * 0.2} Z`;

  // Lock
  const lx = s * 0.406,
    ly = s * 0.448,
    lw = s * 0.188,
    lh = s * 0.135;
  const lockPath = `M${lx} ${ly} L${lx} ${ly - s * 0.055} C${lx} ${ly - s * 0.11} ${lx + lw} ${ly - s * 0.11} ${lx + lw} ${ly - s * 0.055} L${lx + lw} ${ly}`;

  // Center của lock body
  const lcx = lx + lw / 2; // = s * 0.5
  const lcy = ly + lh / 2; // ≈ s * 0.515

  // Check
  const ckLeft = lcx - lw * 0.38;
  const ckMid = lcx - lw * 0.08;
  const ckRight = lcx + lw * 0.44;
  const ckOffset = lh * 0.25;
  const checkPath = [
    `M${ckLeft}  ${lcy + ckOffset * 0.2}`,
    `L${ckMid}   ${lcy + ckOffset}`,
    `L${ckRight} ${lcy - ckOffset * 1.4}`,
  ].join(' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ overflow: 'visible', display: 'block' }}
      {...props}
    >
      <defs>
        <radialGradient id={`sf-${id}`} cx='50%' cy='35%' r='65%'>
          <stop offset='0%' stopColor='#4c2aa0' stopOpacity='0.7' />
          <stop offset='100%' stopColor='#1a0a4a' stopOpacity='0.95' />
        </radialGradient>
        <linearGradient id={`sg-${id}`} x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#d8b4fe' />
          <stop offset='50%' stopColor='#8b5cf6' />
          <stop offset='100%' stopColor='#4f46e5' />
        </linearGradient>
        <linearGradient id={`lg-${id}`} x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#ede9fe' />
          <stop offset='100%' stopColor='#c4b5fd' />
        </linearGradient>
        <linearGradient id={`cg-${id}`} x1='0%' y1='100%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor='#a78bfa' />
          <stop offset='100%' stopColor='#f5d0fe' />
        </linearGradient>
        <filter id={`gw-${id}`} x='-40%' y='-40%' width='180%' height='180%'>
          <feGaussianBlur stdDeviation={size * 0.04} result='blur' />
          <feMerge>
            <feMergeNode in='blur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
        <filter id={`ck-${id}`} x='-60%' y='-60%' width='220%' height='220%'>
          <feGaussianBlur stdDeviation={size * 0.025} result='blur' />
          <feMerge>
            <feMergeNode in='blur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>

        {animated && (
          <style>{`
            @keyframes secFloat-${id} {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-${size * 0.03}px); }
            }
            @keyframes secPulse-${id} {
              0% { r: ${r * 0.5}px; opacity: 0.7; stroke-width: 1.5; }
              100% { r: ${r * 1.3}px; opacity: 0; stroke-width: 0.3; }
            }
            @keyframes secGlow-${id} {
              0%, 100% { filter: url(#gw-${id}); }
              50% { filter: url(#gw-${id}) brightness(1.3); }
            }
            .sec-float-${id} { animation: secFloat-${id} 3s ease-in-out infinite; }
            .sec-shield-${id} { animation: secGlow-${id} 2.5s ease-in-out infinite; }
            .sec-pulse1-${id} { animation: secPulse-${id} 2.5s ease-out infinite; }
            .sec-pulse2-${id} { animation: secPulse-${id} 2.5s ease-out infinite; animation-delay: 0.85s; }
            .sec-pulse3-${id} { animation: secPulse-${id} 2.5s ease-out infinite; animation-delay: 1.7s; }
          `}</style>
        )}
      </defs>

      <g className={animated ? `sec-float-${id}` : ''}>
        {animated && (
          <>
            <circle
              className={`sec-pulse1-${id}`}
              cx={cx}
              cy={cy}
              r={r * 0.5}
              fill='none'
              stroke='#7c5cfc'
            />
            <circle
              className={`sec-pulse2-${id}`}
              cx={cx}
              cy={cy}
              r={r * 0.5}
              fill='none'
              stroke='#7c5cfc'
            />
            <circle
              className={`sec-pulse3-${id}`}
              cx={cx}
              cy={cy}
              r={r * 0.5}
              fill='none'
              stroke='#7c5cfc'
            />
          </>
        )}

        <path
          d={shieldPath}
          fill={`url(#sf-${id})`}
          stroke={`url(#sg-${id})`}
          strokeWidth={size * 0.026}
          filter={`url(#gw-${id})`}
          className={animated ? `sec-shield-${id}` : ''}
        />

        <rect
          x={lx}
          y={ly}
          width={lw}
          height={lh}
          rx={size * 0.03}
          stroke={`url(#lg-${id})`}
          strokeWidth={size * 0.023}
          strokeLinecap='round'
          strokeLinejoin='round'
          filter={`url(#gw-${id})`}
        />
        <path
          d={lockPath}
          stroke={`url(#lg-${id})`}
          strokeWidth={size * 0.023}
          strokeLinecap='round'
          filter={`url(#gw-${id})`}
        />

        <path
          d={checkPath}
          stroke={`url(#cg-${id})`}
          strokeWidth={size * 0.026}
          strokeLinecap='round'
          strokeLinejoin='round'
          filter={`url(#ck-${id})`}
        />
      </g>
    </svg>
  );
};

export const GoogleIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' {...props}>
    <path
      fill='#4285F4'
      d='M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z'
    />
    <path
      fill='#34A853'
      d='M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.73-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.11A12 12 0 0 0 12 24z'
    />
    <path fill='#FBBC05' d='M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.6H1.26a12 12 0 0 0 0 10.8z' />
    <path
      fill='#EA4335'
      d='M12 4.75c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.6l4.01 3.11C6.22 6.86 8.87 4.75 12 4.75z'
    />
  </svg>
);
