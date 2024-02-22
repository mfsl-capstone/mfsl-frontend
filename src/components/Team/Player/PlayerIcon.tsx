import React from 'react';

interface PlayerIconProps {
    fillColor: string;
    numberColor: string;
    number: string;
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ fillColor, numberColor, number }) => {
    return (
        <div style={{ position: 'relative', width: '100pt', height: '100pt', transform: 'rotate(270deg)'}}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                 width="100%" height="100%" viewBox="0 0 512.000000 512.000000"
                 preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                   fill={fillColor} stroke="none">
                    <path
                        d="M2003 5104 c-3 -9 -3 -50 0 -92 23 -293 236 -507 527 -529 269 -20
                           517 177 576 456 8 41 14 97 12 125 l-3 51 -553 3 c-498 2 -553 1 -559 -14z"/>
                    <path
                        d="M1740 5056 l-55 -23 3 -69 c9 -225 142 -471 333 -616 93 -71 189
                        -119 304 -154 79 -24 107 -27 230 -27 151 -1 214 10 335 60 302 125 513 407
                        545 730 l7 73 -48 21 c-27 11 -64 23 -81 26 l-33 6 0 -59 c0 -67 -29 -196 -59
                        -266 -89 -208 -286 -372 -508 -422 -156 -35 -315 -15 -473 61 -81 39 -108 59
                        -186 137 -78 78 -98 105 -137 186 -51 106 -77 209 -77 299 0 57 -2 61 -22 61
                        -13 -1 -48 -11 -78 -24z"/>
                    <path
                        d="M1139 4831 c-374 -141 -432 -167 -500 -228 -94 -85 -99 -99 -379
                        -939 -233 -698 -262 -791 -256 -830 12 -90 65 -158 148 -188 58 -20 697 -69
                        715 -54 10 8 13 90 13 365 l0 354 25 24 c32 33 78 33 110 0 l25 -24 0 -1500
                        c0 -1094 3 -1507 11 -1525 14 -30 63 -52 224 -101 806 -245 1810 -243 2594 7
                        142 45 187 66 200 94 8 18 11 431 11 1525 l0 1500 25 24 c32 33 78 33 110 0
                        l25 -24 0 -354 c0 -277 3 -357 13 -365 15 -13 634 31 703 49 82 22 148 100
                        160 193 6 38 -24 134 -256 830 -220 661 -268 795 -301 845 -45 68 -97 117
                        -164 157 -59 34 -778 305 -786 296 -4 -4 -16 -56 -28 -117 -78 -395 -366 -705
                        -756 -812 -90 -25 -116 -28 -265 -28 -148 0 -175 3 -262 27 -273 76 -482 234
                        -632 478 -61 99 -101 203 -127 336 -12 60 -24 112 -28 116 -3 3 -171 -55 -372
                        -131z"/>
                </g>
            </svg>
            <span style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: numberColor,
                fontSize: '48pt',
                pointerEvents: 'none',
            }}>
                {number}
            </span>
        </div>
    );
};

export default PlayerIcon;
